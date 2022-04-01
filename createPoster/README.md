# 生成海报
今天接到一个需求，在pc端的竞价页面，需要生成一张海报，扫描里面的二维码需要跳转到小程序端的明细页面，由于项目时间太紧，采用了html2canvas插件的方式来实现，通过原生canvas的实现方案就没时间实现，在实现的时候记录了一些需要注意的地方。

## 生成海报有两种方式
  1. 通过canvas直接把结构画出来，然后调用canvas.toDataURL方法，将canvas对象转化成DataURL，然后输出到image中显示。
  2. 通过html2canvas插件，传入需要转化成canvas的dom节点，该方法会返回一个promise包裹的canvas对象，将canvas转化成DataURL，通过img.src属性将海报加载出来。

方案比较：

方案1：需要将页面结构用canvas绘制出来，使用canvas绘制页面难度较大且后期不方便维护

方案2：使用html2canvas开源库，在github上有进行维护，并且只需要简单的配置，即可返回promise包裹的canvas

综上：方案2是较优的方案。
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

  html2canvas实现：
  1. 在 protal 中画出需要渲染的页面
  2. 调用html2canvas插件并传入配置，返回一个promise包裹的canvas，使用canvas.toDataURL将海报变成dataURL，需要保存，将dataURL转化成blob/File传给服务器保存；否则直接将dataURL直接放到image.src中显示

  canvas原生实现

  1. 生成canvas元素，获取canvas上下文
  2. 设置canvas的大小，画出矩形用来放置海报的背景图片
  3. 加载背景图片并渲染在canvas中(ctx.drawImage)，生成文字(ctx.fillText)
  4. 使用qrcodejs2库来生成二维码，将二维码插入到海报中(ctx.drawImage)
  5. 如果还需要对海报进行保存，最后将canvas转化成dataUR或objectURL，提交给后端

### 注意点(坑点)
1. canvas生成图片清晰度优化方案
  > 绘制过程：canvas在绘制缓存区按照绘制缓存区比例将图片进行放大。例如绘制缓存区比例为1，canvas原大小为100*100，则在缓存区中的大小为100*100

  > 渲染过程：渲染时，根据设备像素比(假如是2)，将缓存区中的图片尺寸乘以设备摄像比再渲染到页面上，所以在设备上的大小为200*200，原因是，将原来的图片放大了2倍再渲染到浏览器上是导致模糊的原因

  > 解决方案：将canvas的大小(画布大小以及canvas元素的大小)放大设备像素比倍(dpr),然后等绘制完成后，将canvas的大小(canvas元素css尺寸)缩小为1/drp倍

2. canvas关闭默认抗锯齿设置(ImageSmoothingEnabled)
3. 含有跨域图片的配置 开启html2canvas配置 {useCORS: true}，允许跨域
3. canvas合成的性能问题？？

## 生成海报的性能问题
<!-- todo -->


参考地址：https://segmentfault.com/a/1190000011478657