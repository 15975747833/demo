# 生成海报
今天接到一个需求，在pc端的竞价页面，需要生成一张海报，里面的二维码需要跳转到小程序端的明细页面，由于项目时间太紧，采用了html2canvas插件的方式来实现，通过原生canvas的实现方案就没时间实现，但是在闲暇的时候，我实现了原生canvas的方案。

## 生成海报有两种方式
  1. 通过canvas直接绘画出来，将canvas对象转成url，通过canvas.toDataURL转化，最后通过img.src属性将海报加载出来。
  2. 通过html2canvas插件，传入需要转化成canvas的dom节点，该方法会返回一个canvas对象，将canvas转化成url，通过img.src属性将海报加载出来。

## 前置知识
在生成海报前，需要了解这几个前置知识，DataURL、File对象、Blob对象、base64对象
  DataURL: 是data类型的url，可以将数据直接嵌入到网页中

  Blob对象：是文件对象 他的数据可以用base64、流的形式进行读取
  
  File对象：是文件对象，是File对象是继承与Blob对象，一般来说，通过input标签读取的文件是File类型。

  base64：一种编码方式

  URL.createObjectURL

dataURL  file对象 blob对象  toDataURL生成file对象 base64格式

### JS里DataURL、File、Blob及canvas对象间互相转换的方法函数 

1. canvas 转换为 DataURL
```js
var canvas = document.createElement("canvas");
var imgSrc = canvas.toDataURL('image/jpeg',0.8);//第二个参数指图片质量
```
2. File/Blob 转换成 DataURL 
创建一个FileReader，调用 FileReader.readAsDataURL 方法
```js
// File本质也是Blob对象，所以他们的转换方式是一样的

function readBlobAsDataURL(file, cb) {
  const fileReader = new FileReader();
  fileReader.onload = function (e) {cb(e.target.result)};
  fileReader.readAsDataURL(file)
}

//example:
readBlobAsDataURL(blob, function (dataUrl){
    console.log(dataUrl);
});
readBlobAsDataURL(file, function (dataUrl){
    console.log(dataUrl);
});

```
3. DataURL 转换成 File Blob对象

```js
function dataURLtoBlob(dataUrl) {
    var arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}
function dataURLtoFile(dataUrl, filename) {
    var arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}
//test:
var blob = dataURLtoBlob('data:text/plain;base64,YWFhYWFhYQ==');
var file = dataURLtoFile('data:text/plain;base64,YWFhYWFhYQ==', 'test.txt');
```

4. dataURL 绘制到 canvas

调用 canvas 的 drawImage 方法
```js

const img = new Image();
img.onload = function () {
  canvas.drawImage(img)
}
img.src = dataUrl;

```
5. File/Blob 绘制到 canvas

将File/Blob先转换为DataURL再绘制到 canvas上

```js
readAsDataURL(blob, (dataUrl) => {
  const img = new Image();
  img.onload = function () {
    canvas.drawImage(img);
  }
  img.src = dataUrl;
})
// 与上面的方法一样
function readAsDataURL (file, cb) {
  const fileReader = new FileReader();
  // 等到fileReader把blob/file解析完成后调用
  fileReader.onload = function (e) {cb(e.target.value)}
  fileReader.readAsFileReader(file)
}

```