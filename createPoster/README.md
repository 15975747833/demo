# 生成海报
今天接到一个需求，在pc端的竞价页面，需要生成一张海报，扫描里面的二维码需要跳转到小程序端的明细页面，由于项目时间太紧，采用了html2canvas插件的方式来实现，通过原生canvas的实现方案就没时间实现，但是在闲暇的时候，我实现了原生canvas的方案。

## 生成海报有两种方式
  1. 通过canvas直接绘画出来，将canvas对象转成url，通过canvas.toDataURL转化，最后通过img.src属性将海报加载出来。
  2. 通过html2canvas插件，传入需要转化成canvas的dom节点，该方法会返回一个canvas对象，将canvas转化成url，通过img.src属性将海报加载出来。

## 前置知识
在生成海报前，需要了解这几个前置知识，DataURL、File对象、Blob对象、base64对象
  DataURL: 是data类型的url，可以将数据直接嵌入到网页中(base64)

  Blob对象：是文件对象 他的数据可以用base64、流的形式进行读取
  
  File对象：是文件对象，File对象是继承于Blob对象，一般来说，通过input标签读取的文件是File类型。

  base64：一种编码方式

  ObjectURL：URL.createObjectURL,传入blob/file对象，用于创建对象类型URL(blobURL/fileURL) 

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

4. dataURL/objectURL 绘制到 canvas

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

## 实现
  根据业务需求，生成的还要是在一个列表中生成的，点击对应的按钮会弹出弹框 展示对应的海报。弹框的实现使用react-dom的 protal 来生成，然后在弹框中绘制海报。
  1. 生成canvas元素，获取canvas上下文
  2. 设置canvas的大小，画出矩形用来放置海报的背景图片
  3. 加载背景图片并渲染在canvas中(ctx.drawImage)，生成文字(ctx.fillText)
  4. 使用qrcodejs库来生成二维码，将二维码插入到海报中(ctx.drawImage)
  5. 如果还需要对海报进行保存，最后将canvas转化成dataUR或objectURL，提交给后端

## 生成海报的性能问题
<!-- todo -->