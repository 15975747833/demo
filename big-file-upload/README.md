# 大文件上传

## 什么是大文件上传？为什么要进行大文件上传？
在某些业务场景中，例如需要上传一个大excel、影音文件，需要上传一个几百兆大文件，在网络不好时，需要上传较长的时间(传输大量的报文，丢包重传的几率会增大)，同时用户不能刷新页面，只能在页面中进行等待上传完毕，这大大影响了用户的体验。使用blob.slice将大文件进行分割，将需要上传的文件分割成多个小文件，这些小文件能并发上传，提高上传效率。

## 主要的实现思路
需要实现的功能 大文件上传 断点续传(生成hash、暂停上传、恢复上传、秒传)  进度条

基础版的大文件上传功能中，前端只需要实现将文件进行拆分，然后发送切片。由于这个切片是并发发送给服务端的，所以需要给切片加上序号。然后发送给服务端，具体对文件的合并细节，什么时候合并、如何合并、怎么合并这个问题需要服务端去处理。

### 基础版的大文件上传
```js
// 文件拆分
function createChunkFile(file, size = 1024 * 1024 * 10) {
  let cur = 0;
  let chunk = [];
  while(cur > file) {
    chunk.push( { file: file.slice(cur, cur + size)});
    cur = += size
  }
  return chunk;
}
// 上传切片
function uploadChunks() {
  // 生成promise数组
  const requestList = this.data.map(({chunk, hash}) => {
    const formData = new FormData();
    formData.append("chunk", chunk);
    formData.append("hash", hash);
    formData.append("filename", this.container.file.name);
    return { formData };
  })
  .map(async ({ formData }) =>
    this.request({
      url: "http://localhost:3000",
      data: formData
    })
  );
  // 并发上传
  Promise.all(requestList)
}
```

> 插播一个小知识，使用formData格式上传的内容，header默认采用multiply/formData， 所以上传的流文件不需要重新设置header

### 断点续传
断点续传的原理是客户端/服务端记住当前上传过的hash，下次重新上传的时候就能过滤掉之前已上传的部分

方案：

前端将已上传的文件切片保存到本地localStorage中

服务端记住已经上传的切片，在每次上传前把已上传切片列表返回

比较: 前端方案的缺陷，更换浏览器后，之前的本地缓存就会丢失。

每个文件都会有一个单独的文件标识，读取每个文件切片的内容，生成文件唯一的hash，通过spark-md5库，可以根据文件内容生成hash。考虑到上传一个超大文件时，读取文件内容计算hash会非常耗时，并且会阻塞UI渲染(JS线程与UI渲染线程互斥)，所以使用worker线程在worker线程进行计算，这样用户还能在主界面进行交互。

`实现：`

在worker线程中接收fileChunk列表，利用FileReader读取每个切片的ArrayBuffer并不断传入md5中，每计算完一个切片，通过postMessage给主线程发送事件进度，最后将读取的结果发送给主线程。

`文件秒传`
在上传文件前，已经根据文件内容生成了hash值，在文件上传前将文件hash传给后台校验，如果已经上传完毕，则判断为不需要重新上传，返回上传成功；如果部分已经上传，则返回一个已上传文件hash列表，在重新上传切片前，把已上传的切片进行过滤

```js
// uploadList 后台返回已上传的切片
requestList.filter(({hash}) => !uploadList.include(hash)).map(({chunk, hash, index}) => {
  const formData = new FormData();
  formData.append("chunk", chunk);
  formData.append("hash", hash);
  formData.append("filename", this.container.file.name);
  formData.append("fileHash", this.container.hash);
  return { formData, index };
}).map(({formData, index}) => {
  request({url:'xxx'})
})
```
`恢复上传`
恢复上传的实现与文件秒传类似，上传前调用后台检验接口，判断文件的上传状态(完全上传、部分上传)，然后找出未上传的切片进行重新上传。

`暂停上传`
点击暂停，找出未完成当前切片上传的xhr，调用xhr.abort方法进行暂停。

```js
// 方法一 对所有xhr都执行abort，因为重新上传时，后台会返回已上传的切片
requestList.forEach(v => v.abort())

// 方法二 找出已上传完成的xhr，并将它从requestList中删除,然后调用xhr.abort
xhr.onload = e => {
    // 将请求成功的 xhr 从列表中删除
  if (requestList) {
    const xhrIndex = requestList.findIndex(item => item === xhr);
    requestList.splice(xhrIndex, 1);
  }
  resolve({
    data: e.target.response
  });
};
// 暴露当前 xhr 给外部
requestList?.push(xhr);

```

`spark-md5的基本使用`
常用的方式 
1. 直接把整个文件传入，通过SparkMD5.hashBinary()方法对整个文件生成hash，对于体积较小的文件，效率会更高
2. 对于超大文件来说，将整个文件直接生成hash需要消耗较多的资源，将大文件通过File.prototype.slice的方法对文件进行切片，将分片的文件逐个传入spark.appendBinary()方法来计算，最后调用spark.end()来获取计算结果

`web-worker的基本使用`
web-worker可以为js创建多线程环境，常用于计算量大的场景，避免阻塞js线程而阻塞页面渲染，不会影响主线程的运行。在实例化worker时，参数是一个js路径并且不能跨域，所以单独创建了一个hash.js文件放在public目录下，此外在worker中也不允许访问访问dom节点，使用importScript函数来导入外部脚本。通讯方式有 postMessage、onmessage，在主线程和子线程都有这两个方法，所以在子线程(worker)中通过self来标识为子线程

```js
// 实例化worker 并监听子线程返回内容
calculateHash(fileChunkList) {
  return new Promise(resolve => {
    // 添加 worker 属性
    this.container.worker = new Worker("/hash.js");
    this.container.worker.postMessage({ fileChunkList });
    this.container.worker.onmessage = e => {
      const { percentage, hash } = e.data;
      this.hashPercentage = percentage;
      if (hash) {
        resolve(hash);
      }
    };
  })



// 子线程 /public/hash.js
self.importScripts("/spark-md5.min.js"); // 导入脚本

// 生成文件 hash
self.onmessage = e => {
  const { fileChunkList } = e.data;
  const spark = new self.SparkMD5.ArrayBuffer();
  let percentage = 0;
  let count = 0;
  const loadNext = index => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(fileChunkList[index].file);
    reader.onload = e => {
      count++;
      spark.append(e.target.result);
      if (count === fileChunkList.length) {
        self.postMessage({
          percentage: 100,
          hash: spark.end()
        });
        self.close();
      } else {
        percentage += 100 / fileChunkList.length;
        self.postMessage({
          percentage
        });
        // 递归计算下一个切片
        loadNext(count);
      }
    };
  };
  loadNext(0);
};

```
### 上传进度条
大文件上传的进度条计算用已上传文件大小/待上传文件大小 得出上传进度，在大文件上传时，给每个xhr增加 onProgress 监听函数，给 xhr注册监听函数， 拿到的是每个切片的上传进度，最后根据每个切片的上传进度，计算出总文件的上传进度(单个切片上传进度*切片大小/待上传文件大小)。

`问题：`
在上传中状态点击“暂停” 到恢复上传的状态，由于重新创建xhr，导致切片进度清零，会导致总进度条会倒退。基于这个，创建一个假进度条，当前计算的进度小于目前上传进度，则去目前上传进度，那个大取哪个，这样就不会发生进度条倒退的问题

## 优化/遇到的问题
在不断上传图片的过程中，浏览器会内存溢出  --在没有死循环的情况下，一般内存不会爆掉

同一个域名下 tcp上最多只允许6个连接，当上传的请求连接把6个连接占满，其他请求如何发起


## 参考
https://juejin.cn/post/6844904046436843527#heading-0