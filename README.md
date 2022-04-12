---
theme: smartblue
---
> 从3月开始记录每天学习，不要把好牌打烂


`是什么：`

`为什么：`

`何时(使用场景)：`

`如何实现：`

### HTML
#### 说说js异步加载的方式？script中defer与async的区别？
`什么是：` js的异步加载是指页面html文件与js并行加载。

`为什么：`因为浏览器的js线程与ui渲染线程是互斥关系，所以js需要异步加载以提高用户的体验感。

`何时(应用场景)`：在script标签中，通过defer、async属性，可以使js异步加载。浏览器会开启一个新的加载线程去并行加载js脚本，defer属性，js的执行时机在html解析完毕后，在DOMContentLoaded事件触发前执行；而async属性的js会在脚本加载后直接执行。多个async属性的script脚本无法保证执行的顺序，defer执行脚本的顺序是有序的

`如何实现: `...

#### 浏览器页面的生命周期中的DOMContentLoaded与onLoad事件的区别？
`是什么：`DOMContentLoaded的执行时机在DOM树构建完毕后，外部资源并未加载完毕

onLoad是在DOM树构建完毕，外部资源也加载完毕后

`为什么：`

`何时(使用场景)：`DOMContentLoaded可以最早的时机操作DOM节点，可以做一些初始化操作，onLoad可以获取img标签元素的真实大小

`如何实现：`

#### 说说有哪些H5新特性？
- 新增了语义化标签，header、nav、footer
- 新增媒体标签，video、audio
- 新增浏览器存储方式 localStorage、sessionStorage
- canvas、SVG
- drag等API
- web worker

#### 说说href与src的区别？

`是什么：`src表示对资源的引用，使用的资源会内嵌到文件中，当浏览器解析到该元素时，会暂停其他资源的加载，需要等到src资源加载、编译、执行后才能执行，常用在script标签上，所以一般srcipt src会放到页面的底部去执行；

href表示对资源的链接，当解析到该元素时会并行下载该网络资源，不会影响当前文档的处理，常用在a、link标签上。

`为什么：`

`何时(使用场景)`

`如何实现`
#### 说说link与@import的区别？
`是什么：` link和@import可以用来加载css。link是一个html标签，@import是css的语法。

`为什么：`

`何时(使用场景)：`link的href属性在加载css的时，是并行加载，@import加载css的时机，在网页完全加载后在进行加载`DOMContentLoaded之后`。link是html标签，兼容性较好，@import是css2.1的提出的，低版本浏览器可能会不支持。

`如何实现：`
#### HTML语义化的理解？
`是什么：`HTML语义化标签是给标签赋予语义，例如header、nav、footer分别代表着文档结构中的头部、导航以及尾部。

`为什么：`HTML语义化标签，增强html文档的可读性，便于开发人员了解页面结构、方便维护；同时对机器友好，方便机器读取进行爬虫和无障碍阅读的发展。

`何时(使用场景)：`

`如何实现：`
#### 渐进增强与优雅降级的理解？
`是什么：`渐进增强是对低版本浏览器的兼容，在保证基本功能下，再针对高级浏览器的效果、交互进行优化以及追加功能，以达到更好的用户体验；

优雅降级：在高版本浏览器中先实现功能，再局部对低级浏览器发现的问题进行兼容优化。

`为什么：`渐进增强与优雅降级两者是站在不同的角度上看待问题，优雅降级是站在高版本浏览器角度，渐进增强是站在低版本浏览器角度，可以根据主要使用的用户群体来使用不同的方式，

`何时(使用场景)：`

`如何实现：`

### CSS
#### CSS选择器及其优先级？
CSS选择器权重越高则优先级越高。!important的权重是无穷大，优先级最高，其次是行内样式，权重为1000；再其次是id选择器，权重为100；其次是classname类名选择器、伪类选择器、属性选择器，权重为10；其次是元素选择器、伪元素选择器，权重为1；权重最小的是通配符选择器、子选择器、兄弟选择器，权重为0；

#### 说说你对BFC的理解？如何创建，有什么作用？
`是什么：`BFC是一个块级独立上下文，是一个单独的容器，在容器内有独立的渲染规则，并且不会影响到bfc外的文档布局。

`怎么实现：`bfc的实现有一定的规则：
- 根元素html
- overflow不为visible
- position的值为absolute、fixed
- float不为none
- display flex

`bfc的渲染规则(使用场景)：`
- bfc内元素在垂直方向上，从上到下排列，与文档流的排列方式一致
- bfc内高度计算，需要包含浮动元素的高度(解决浮动元素高度塌陷的问题)
- bfc区域不会与浮动元素重叠(左右两栏布局，左元素浮动，右元素overflow：hidden)
- bfc中`上下两个元素的margin`会重叠(解决margin重叠问题，一个bfc元素，一个非bfc元素)
- bfc是独立容器，里面的渲染不会影响外部元素

`如何实现：`
#### 弹性布局flex是什么？怎么用？
`是什么：` flex是CSS3新增的布局方式，通过设置display:flex，将盒子设置为弹性盒，所有的子元素会变成他的项目。在弹性盒中有两个方向：主轴和交叉轴。通过justify-content可以设置在主轴的对齐方式，设置align-items来设置在交叉轴的排列方式。当项目中还有剩余空间时，使用flex-grow 来放大或不放大项目；当项目的空间不足，使用flex-shrink 来缩小或不缩小项目。

> 重要的属性： flex 首先需要明确 flex: flex-grow flex-shrink flex-basis

flex-basis属性用来标识元素的具体大小，auto为元素自身大小； 具体大小(100px)元素大小为100px， 0 表示元素大小为0，即使后续设置了该元素的拉伸比例为1，该元素也不会拉伸，因为该元素宽度为0

在单值语法中flex的取值有两种情况，一种是英文关键字(initial, auto, none),另一种是非负数字

initial(默认值): 0 1 auto
auto: 1 1 auto
none: 0 0 auto 
1: 1 1 一个具体的值，所以flex:1 !== flex: auto

`为什么：`

`何时(使用场景)：`

`如何实现：`
#### 如何实现水平居中、垂直居中？
#### 如何实现一个宽度自适应的正方形？
#### CSS的盒模型有什么？
`是什么：`在CSS中，所有的元素都是被一个盒子所包围，盒模型由这几个部分组成，content、padding、border、margin 。CSS的盒模型有两种形式，标准盒模型与怪异盒模型。标准盒模型中，盒子的宽度就是width属性，在怪异盒模型中，盒子的宽度是盒子的width+padding+border

#### px、em、rem是什么单位，有什么使用场景？

px: 是一个固定像素单位，一旦确定就不能更改 

rem: 是一个相对单位，相对于根元素html字体大小

em: 是一个相对单位，相对于父元素的字体大小，使用em时，需要知道每个父元素的字体大小，使用起来没rem方便。

vh、vw：是一个相对单位，相对于视口的高度、宽度，视口宽度为100vw、高度为100vh

vmin、vmax: vmin:vw、vh中较小值，vmax: vw、vh中的较大值

`场景：`
- px适用于分辨率差异较小的页面
- rem使用于分辨率较大的页面，例如一个页面需要适配iphone和ipad

#### 如何根据设计稿进行移动端的适配？

移动端布局一般采用响应式布局的方式，就是一个网站能兼容多个终端。

rem的实现方式：
1. 整理设计稿的信息，我们常用的设计稿尺寸一般是750*1334，这是个在iphone6上开发设计稿，设备像素比是2
2. 设置视口的缩放比，获取`设备像素比`window.devicePixelRatio=2，设置缩放比例为1/2
3. 设置根元素字体大小，获取屏幕大小并分成10份，得到根元素字体大小，window.clientWidth / 10 = 750 / 10 = 75 px
4. 最后，我们在设计稿中需要画一个宽300px的元素时，300/75 = 4.267rem,切换到分辨率高的设备上，根元素大小也会变大，映射到页面上的元素尺寸也会越大。(切换到@3x像素比的设备上，根元素大小变成1242/10 = 124.2px,映射到设备的像素为124.2px*4.267rem = 529.9614px)

rem+vw的实现方式：
与rem实现方式差不多，将根元素的大小设置成以vh作为单位。例如设备分辨率为375px，那么 375px = 100vw，1px = 0.2666vw,100px = 26.66vh,此时将根元素大小设置为26.66vh,相当于100px = 1rem，在后续换算中会更加方便。例如需要画一个300px的元素，就是3rem，让单位计算更加简单。

#### CSS常用布局实现？

两栏布局：
- 左元素float:left，右元素float：right
- 左元素float:left, 右元素overflow：hidden bfc区域内，不于浮动块重叠
- 设置为display:flex， 右元素flex:1
- 绝对定位



### JavaScript
#### 说说你对原型链的理解？什么是构造函数？什么是实例？什么是原型？
当我们去访问对象的一个属性时，先会从对象本身去查找，如果对象本身没有则往对象的原型上找，如果对象的原型找不到的话，从对象原型的原型上找，最终找到`Object.prototype === null`为止，这个查找的过程的链条我们称为原型链。
对象的原型主要用来继承对象上的公共方法及属性。
constructor是new后面跟着的函数，称为构造函数，在实例化构造函数的时候会调用

#### 谈谈你对闭包的理解？
闭包就是一个`有权访问其他函数作用域的函数`。通常是在一个函数中返回一个函数，内层函数可以访问到外层函数的作用域。

用途：
- 函数外部可以使用到函数内部的变量
- 将函数执行后的结果缓存到内存中

使用场景：
- 节流函数(在一个时间间隔内只触发一次，如果里面有定时器，则不执行)
- 单例模式 缓存一个局部变量用于判断构造函数是否被实例过
    ```js
    // 给构造函数增加一个静态属性
    class People {
        static getInstance(){
           if(!People.getInstance) {
                People.instance = new People()
           }
            return People.instance
        }
    }
    // 通过闭包方式实现单例模式
    SingleDog.getInstance = (function() {
    // 定义自由变量instance，模拟私有变量
    let instance = null
    return function() {
        // 判断自由变量是否为null
        if(!instance) {
            // 如果为null则new出唯一实例
            instance = new SingleDog()
        }
        return instance
    }
    })()
    ```
#### 谈谈闭包与即时函数的应用


#### 什么是js的事件循环？
JS的代码是按顺序一步一步执行的，执行过程中，遇到异步代码会推到异步队列中，等到当前执行栈清空后，从异步队列中取出一个任务到执行栈中执行。从异步队列中取事件到当前执行栈中执行的过程称为事件循环。

事件循环(微任务)是优于渲染的  微任务 -> 渲染 -> 宏任务

#### 谈谈你对this的理解？
this是执行上下文的属性，是指调用这个方法的对象。一般情况下，this的值是在调用时才能确定，在定义时无法确定。

改变this执行的方式:
1. 显示绑定 bind/call/apply
2. 隐式绑定 通过对象去调用，this指向该对象；通过普通函数调用，this指向为window；箭头函数去调用，指向外层函数的this; 通过实例化构造函数，this指向实例



#### 谈谈你对bind、call、apply的理解？以及实现？
call、apply、bind函数都能显式的改变this执行，其中call/apply会执行绑定this的函数，bind会返回一个绑定this的函数。

call参数是一个参数列表，apply的参数是传入一个数组。bind返回函数再次执行时，参数会拼接到bind的参数后面，实现一个函数科柯里化的效果。bind返回的函数多次bind时，this指向为第一次bind的结果

`实现: `

bind:

```js
// a.bind(b, c, d)
Function.prototype.myBind = () => {
    const [context, ...args] = arguments;
    const self = this;
    return function () {
        // 如果bind后返回的函数被用作构造函数，该构造函数实例的this执行为构造函数的实例，而不应该是传入的context
        self.apply(this intanceof self ? self :context, arg.concat(...arguments))
    }
    
}

```
call/apply:

```js
// a.call(b, c, d)
Function.prototype.myCall = () => {
    const [context, ...args] = arguments;
    const fn = Symbol();
    context[fn](args);
    // 原理，谁执行，this指向为谁，这里是context执行，this指向为context
    delete context[fn]
}


```

#### new的实现原理？
new是用来实例化构造函数的关键字。new Foo() 实现步骤为：
1. 创建一个空对象，并把这个空对象的原型指向构造函数的原型；
2. 把this指向这个空对象，并执行这个函数；
3. 判断这个函数返回的结果，如果函数的结果是个对象，则返回这个对象，否则返回这个空对象

```js
// 用代码能简单的表述，方便记忆
function new() {
    const obj = Object.create(Foo.prototype);
    const res = Foo.call(obj);
    return typeof res === 'object' ? res : obj;
}


```

#### Object.create的实现原理？
创建一个空函数，将函数的原型指向函数的参数，然后实例化这个函数，返回实例化后的结果

```js
function create(prototype) {
    function Fn(){};
    Fn.prototype = prototype;
    return new Fn()
}

```

#### 什么是js的执行上下文？
#### js的基本数据类型？
#### 判断js数据类型的方式？
#### ES6新特性？
- let、const  不能变量提升、暂时性死区
- ...拓展运算符
- 箭头函数
- 模板字符串
- proxy
- 新增的数据类型Set、Map  Set类似数组，里面不能重复；Map类似对象，里面的key可以是引用类型
- promise 
- ESModule

#### let const var之前的区别？
#### 谈谈你对promise的理解？

`是什么：`promise是一个异步编程解决方案。Promise是一个构造函数，传入一个函数，返回一个promise对象。

`为什么：`promise解决了回调地狱，比传统的回调函数方式处理异步问题更加清晰和合理。

`何时(使用场景)：`promise有fullfilled、rejected、pending三个状态，状态只能从pending到fullfiled或者pending到reject，状态一旦发生变化就不能再变化了。状态的改变是通过resolve、reject的方法去改变，最后通过调用promise.then方法，注册一个微任务回调，获取promise返回的值。

`静态方法：`

promise.all:等到所有promise都返回，如果有一个返回reject，则返回reject的结果

promise.race: 返回最快响应的promise

promise.allSettled: 将所有的promise结果都返回，即使返回有部分失败，优化了promise.all中，有一个promise返回失败则忽略其他结果，返回reject的问题

缺点： 
- promise无法取消，一旦新建就会立即执行，不能中途取消
- 如果不设置回调函数，无法知道promise里面抛出的错误
- promise处于pending状态时，不能判断promise的结果

`如何实现：`
- 创建构造函数。promise是一个构造函数，传入一个函数(执行器)作为参数，在promise实例化时，给执行器传入resolve、reject方法并执行这个执行器
- 状态与结果的管理。在promise内部初始化三个状态：pending、fuilfilled、rejected，在resolve、reject方法更改成功或失败的状态

    ```js

    // 改变成功的状态并保存成功结果
    resolve = (value) => {
        if (status === 'PENDING') {
            this.status = 'FULLFILED';
            this.value = value
        }
    }
    // 改变失败的状态并保存失败原因
    reject = (value) => {
        if (status === 'PENDING') {
            this.status = 'REJECTED';
            this.reason = value
        }
    }

    ```
- then方法的实现。then方法传入成功onFulfilled和失败onRejected的回调。当promise结果是成功时，调用成功的回调；失败时调用失败的回调；pending时，需要将成功和失败的回调缓存起来。
    ```js
    then = (onFulfilled, onRejected) => {
        // 判断状态 
        if (this.status === FULFILLED) { 
        // 调用成功回调，并且把值返回 
            onFulfilled(this.value); 
        } else if (this.status === REJECTED) { 
        // 调用失败回调，并且把原因返回
            onRejected(this.reason); 
        } else if (this.status === PENDING) { 
        // ==== 新增 ==== // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来 // 等到执行成功失败函数的时候再传递
            this.onFulfilledCallback = onFulfilled; 
            this.onRejectedCallback = onRejected; 
    }
    ```
- 再次修改resolve、reject的回调

    ```js

    // 改变成功的状态并保存成功结果
    resolve = (value) => {
        if (status === 'PENDING') {
            this.status = 'FULLFILED';
            this.value = value
            this.onFulfilledCallback && this.onFulfilledCallback(value)
        }
    }
    // 改变失败的状态并保存失败原因
    reject = (value) => {
        if (status === 'PENDING') {
            this.status = 'REJECTED';
            this.reason = value
            this.onRejectedCallback && this.onRejectedCallback(value)
        }
    }

    ```

#### 箭头函数与普通函数的区别？
#### ES6中新增的数据类型有什么？
#### for ..of 与for .. in的区别？
#### 什么是事件冒泡、事件捕获？
#### requestAnimationFrame、requestIdelCallback是什么？
#### 防抖和节流的原理及实现？
#### onmouseover与onmouseenter的区别？
#### e.target与e.currentTarget的区别？
#### 说说有什么常用的设计模式？观察者模式与发布订阅模式有什么不同？
#### 纯函数、HOC、函数式组件
纯函数：1.始终返回相同的值，不管调用多少次，返回的内容不变；2.不会产生副作用

高阶函数：高阶函数是对函数进行操作，往函数中传入一个函数，对其进行包装拓展，没有对原函数进行修改，最终返回一个包装后的函数

函数式组件：基于纯函数的一种组件形式，组件无状态、数据不可变


### 跨域
#### 同源策略
同源策略是一个浏览器的安全策略，限制一个源的文档/脚本 和 其他源的文档/脚本进行交互的方式。同源意味着协议、域名、端口必须一致。

限制：不是同源的文档，没有权限去操作另一个源的文档。例如 DOM、cookie、Ajax等
#### 常见的跨域解决方式？
`jsonp:` 通过script标签的异步加载来实现、script标签不受同源策略的限制，只支持GET请求
```js
// 通过动态生成script标签，插入文档中，待script标签加载完毕后，执行回调函数获取结果
const script = document.createElement('script');
script.src = 'http:xxx.com?callback=jsonp';
document.appendChild(script);

function jsonp (res) {
    // 调用回调函数获取结果
    console.log('res', res);
}
```

`hash:` url上#后的内容发生变化，页面是不会跳转的，可以监听hash变化来进行跨域

```js
var B = document.getElementsByTagName('iframe');
B.src = B.src + '#' + 'data';

// 在B中的伪代码如下
window.onhashchange = function () {
  var data = window.location.hash;
};
```

`postMessage:` H5新增的方法，可以支持跨域通讯

用法：postMessage(data, origin) data为传输的数据，origin为传输的目标地址

```js
// 在A.html中
var iframeA = document.getElementsByTagName('iframe');
iframeA.contentWindow.postMessage(data, 'http://www.domain2.com')

// 在B.html中
window.addEventListener('message', function (data) {
    // 传输过来的data
})
```

`nginx代理跨域:` 同源策略的限制只是针对浏览器，对于服务端来说，只是调用http协议，并不存在跨域，使用ng配置一个代理服务器，
域名和需要请求的域名一致，端口不同，作为跳板机，然后配置反向代理，实现跨域访问

```js
// nginx.config.js
server {
    listen 81;
    server_name domain1.com;
    location / {
        proxy_pass domain1.com; // 反向代理
    }
}
```

`CORS:` 跨域资源共享。通过在header上设置Access-Allow-Control-Origin头字段，告诉浏览器允许被跨域请求的资源。跨域资源请求有两种情况，简单请求和非简单请求。对于简答请求，直接发送HTTP请求，在响应时，返回access-allow-control-origin:origin(请求的源的域名)有值，则表示跨域成功。对于非简单请求，在发送HTTP请求前，需要进行预检请求，获取服务端支持的请求类型，在响应时，返回的access-allow-control-origin有值，则表示跨域成功。
> 有个注意的点，跨域资源默认是不会自动带上cookie，需要在请求时设置withCredentials为true
```js
// 请求时
axios.defaults.withCredentials = true;
// 服务端
Access-Control-Allow-Credentials : true
Access-Control-Allow-origin: xxx; 允许跨域的源

```

### Vue与React的比较
#### Vue与React框架有什么相同和不同的地方吗？
相同：
1. vue和react使用的都是MVVM的设计模式，使开发者更加关注业务逻辑而不是在复杂的页面交互上。再扯一扯什么是MVC、MVVM
2. 都通过props进行数据的传递
3. 提倡组件化，提高组件的复用率
4. 使用vnode来优化性能
不同：
1. vue是双向数据流，react是单向数据流
2. vue推荐使用template来书写结构，react使用jsx
3. 数据监测 vue使用数据劫持+观察者模式，react通过比较属性引用地址
4. 更新 vue使用了数据劫持+观察者，在初始化时，属性通过dep收集了他所依赖的watcher 在数据变化时，会通知观察者(watcher)进行更新，react会更新整棵树及下面所有的子树，通过diff算法进行优化
5. react本质是一个纯函数，容易对组件进行拓展，vue组件拓展的话，需要使用mixin
#### 在Vue/React框架发展中，mixin、hoc最后到hook中间经历了什么，分别解决了什么痛点？

`是什么：`

`为什么：`

`何时(使用场景)：`

`如何实现：`

在组件化进程中，实现组件状态逻辑的复用，可以大大的提升组件的开发及维护的效率。在主流框架中，也出现了3种状态复用的方式，分别是mixin、hoc、hook。

mixin混入，他的本质是通过将一个对象的属性拷贝到另一个对象上，可以解决代码复用的问题。
缺点： mixin的缺点也很明显，就是不利于代码的维护，mixin间可以相互耦合，mixin间也会出现属性的冲突。

hoc高阶组件,高阶组件就是把组件作为参数传入，经过外层包装对组件进行增强再返回这个组件，对于react来说，所有的组件都是函数，所以更容易实现hoc，对于vue写hoc还是较为复杂。
缺点：hoc可以解决组件间mixin的耦合，因为hoc是在原组件的基础上进行包裹，但是多个hoc嵌套会导致难以调试。

hook,可以使函数式组件拥有自己的状态，可以将含有state的逻辑从组件中抽出来，实现状态的复用。每一个hook都是一个纯函数，无论调用多少次还是返回一样的结果，同时因为hook是一个函数，因为闭包的原因，可以缓存上次函数执行的变量不被销毁。对于hook与mixin在使用上是有些相似，但mixin的引入会导致状态或逻辑的覆盖，而hook引入的逻辑必须显式的声明出来。hook与hoc的比较，hook可以避免地狱式嵌套，使用扁平的方式来复用逻辑。同时hook也可以提高代码的内聚性，不需要跟随组件的生命周期的变化去做不同的操作。
> https://juejin.cn/post/6844903815762673671#heading-33

## Vue
### Vue基础使用
#### vue的自定义钩子及其生命周期
#### vue生命周期？
#### Vue的指令及生命周期？有没有写过自定义指令？


### Vue框架原理
#### Vue初始化状态的顺序
initProps、initMethods、initData、initComputed、initWatch

#### vue的响应式原理
vue的响应式原理是利用数据劫持+观察者模式进行实现的。对对象使用`Object.defineProperty`的方式劫持get、set方法。在get方法里进行依赖收集dep.depend()，每个属性上都有一个dep实例来收集依赖的watcher;在set方法里进行派发更新dep.notify(),通知属性上的watcher进行更新。对数组则重写了数组的7个变异方法(push/pop/shift/unshift/splice/reserve/sort),对数组内部的对象进行劫持。采用了AOP切片的思想，先将push、splice、unshift新增对象的进行响应式数据处理，最后在调用数组原生的api进行修改。数组的响应式处理是通过__ob__属性，拿到Observe实例
。

#### computed的理解？
computed是vue的计算属性，只有依赖的响应式数据变化，计算属性才会重新计算。

`原理:`创建计算watcher，将`lazy:true`传入watcher，然后劫持计算属性，重写计算属性的getter方法，根据watcher.dirty来判断是否需要重新计算，并在计算完成后，调用watcher.depend收集外层渲染watcher。

watcher构造函数改造：
- 计算属性实例化时，不去调用get方法，默认不会计算值
- update方法，将dirty标识为true，当下次访问计算属性时重新计算。
- evaluate方法，重新计算
- depend方法，收集计算watcher外层的渲染watcher

#### watcher的原理？
watcher是vue的观测方法，当被观测属性发生变化，会触发回调，拿到新值和旧值。

`原理：`兼容watcher的写法，字符串、函数、对象，调用了原型上的$watcher方法，本质还是调用watcher，将`{user:true}`传入watcher，标识为用户自定义watcher，数据变化时，触发watcher.update，执行用户传入的回调函数。

#### $set的实现原理
 
#### nextTick的实现原理
 
#### vue2与vue3的更新点，Vue3.0 是如何变得更快的？

#### Virtual DOM 真的比操作原生 DOM 快吗？谈谈你的 想法

#### Vue.extend mergeOption原理

`是什么：`Vue.extend是vue的一个全局API，可以拓展组件返回一个构造器，通常搭配$mount使用

`为什么：`提供了灵活挂载组件的方式。

`何时(使用场景)：` 例如element上this.$message的方法，调用这个改造函数并传入参数，可以在全局上挂载了一个message组件。

`如何实现：`vue.extend内通过原型继承`Sub.prototype = Object.create(Super);Sub.xxx = Super.xxx`，将传入的对象形成子类，继承vue父类的属性及方法，最后返回子类的构造函数

#### Vue.mixin mergeOption原理

`是什么：`vue.mixin是全局混入，会影响到每个组件实例，通常是配置一些初始化的属性。mixins是拓展组件的方式，在组件间有相同的业务逻辑，可以使用mixins把逻辑剥离出来。

`为什么：`

`何时(使用场景)：`

`如何实现：`将传入的options混入到全局的option中，有默认的合并策略，如果父子都有并且是对象，则合并到一起，父有子没有则采用父亲，子有父没有则采用儿子

#### vue的各种watcher的实现过程
渲染watcher

渲染watcher是observe与视图之间连接的桥梁，实现了数据驱动视图更新。
1. 初始化vue，初始化组件状态，构建render函数，准备挂载，实例化渲染watcher，往渲染watcher中传入updateComponent方法
2. 调用watcher.get方法，将当前的渲染watcher推入栈中，执行updateComponent，解析模板时，触发属性的getter进入拦截，调用dep.depend收集属性上依赖的watcher，先在watcher中收集dep，然后将dep中收集渲染watcher，实现watcher与dep之间的互记。
3. 属性变化时，触发拦截器的setter，调用dep.notify进行更新，对dep中的watcher进行遍历，执行watcher.update,更新时做了优化，将更新的内容放到nextTick中执行，nextTick是在dom更新前的回调，本质是使用了微任务优于ui渲染。

监听watcher

监听watcher就是用户自己定义的watch，用户对一个属性进行监听，当数据变化，会执行用户传入的回调函数。
1. 首先遍历传入的watch，对watch进行初始化，然后调用原型上的$watch方法，他的本质就是watcher构造函数。
2. 实例化watcher时，传入回调函数和{user: true}用来标识是用户自定的watcher，实例化watcher后对watcher进行取值，得到上次watcher的值
3. 监听属性变化后，调用watcher.update，执行传入watcher的回调函数

计算watcher

计算watcher就是我们常用的computed，computed具有缓存性，只有computed依赖的属性变化时才重新进行计算。就是通过拦截computed的get来实现。
1. 遍历computed，给每个computed都实例化一个计算watcher，并传入getter为回调函数和lazy:true,默认不计算。
2. 使用object.defineProperty来拦截computed的getter，在里面进行判断，如果watcher.dirty为true，则进行重新计算，否则返回上次计算的值，
3. 给当前计算watcher中的dep收集渲染watcher

为了实现2,3给watcher进行改造，
增加evalute的方法来进行重新计算，
改造update方法，将dirty的值设为true，下次取值时就能进行重新计算
增加watcher.depend方法，给计算watcher的依赖收集渲染watcher。因为计算属性是没有收集渲染watcher的，在依赖值变化时，计算属性的值会更新，但由于没有收集渲染watcher，所以无法更新视图


## React
### React基础使用
### React框架原理
#### 请简述你对 react 的理解
#### useState/useEffect
useState:
在初次渲染时，useState会定义多个状态，调用useState时，会返回一个状态及修改状态的setter函数，并将他们存在链表中，当数据变化重新渲染时，会从链表中取出当前的值进行渲染
useEffect:
useEffect在初次调用时，也会将effect存入链表中，同时还有一个effect的调用队列，等effect执行时，会把队列中的effect依次调用。useEffect不能放在循环、嵌套语句中，因为不能保证effect的调用顺序。

### 前端安全
#### 什么是XSS攻击？以及如何防范？

`是什么：` XSS攻击是跨站脚本攻击。攻击者在浏览器中注入恶意脚本，被浏览器所执行，从而导致攻击。

`为什么：`浏览器没有对恶意脚本进行过滤。浏览器在执行时，无法判断脚本是否可靠，从而导致执行恶意脚本。

`攻击内容：`获取用户个人敏感信息cookie、Dos攻击，导致服务器不能正常访问、流量劫持，攻击类型：存储型、反射性、DOM型

`分类：`
反射型：XSS代码出现在请求的URL中，经过服务器响应和解析，在响应结果中包含XSS代码，然后被浏览器执行

存储型：攻击者在博客评论区留言了恶意脚本，提交评论是被服务器所存储，当其他用户访问评论区时，恶意脚本被浏览器加载和执行，导致攻击

`防范：`
1. 不使用服务端直接渲染，对服务端返回的内容需要经过充分转义才能进行渲染；
2. 建立白名单CSP(内容安全策略)，不允许浏览器从白名单外加载脚本；
3. 使用http-only头，禁止在客户端进行cookie的获取；(浏览器禁止页面JavaScript访问访问带有httpOnly的cookie)

#### 什么是CSRF攻击？以及如何防范？
`是什么：`CSRF是跨站请求攻击。攻击者通过诱导用户打开一个第三方网站，从而对目标网站进行攻击。如果用户在目标网站上已登录，则会绕过后台验证，冒充用户进行一些操作。

`为什么：`本质：在同域下cookie会自动携带。

攻击类型：GET型、POST型、链接型。

`防范：`
1. CSRF token验证；
2. cookie双重验证，利用了CSRF只能利用cookie而不能获取cookie，将cookie作为参数提交给后台校验；
3. cookie sameSite 在严格模式下，cookie不能被第三方网站获取；
4. 同源检测 通过origin refer字段(记录了来源地址)判断是否是同源

#### 什么是MITM攻击？以及如何防范？
MITM中间人攻击是攻击者分别与通讯双方保持独立的连接，中间人劫持通讯双方的信息，使通讯双方认为自己以加密的方式在进行通讯，但整个过程都被中间人所控制，中间人可以监听整个通讯过程和篡改通讯内容

#### 前端安全有什么方面？
前端安全主要注意这几个：
1. XSS 跨站脚本攻击
2. CSRF 跨站请求攻击
3. iframe滥用 iframe加载是不受控的
4. 恶意第三方库，第三方库被注入恶意脚本




### 浏览器原理



#### 浏览器渲染的过程？

`渲染过程：`
1. 解析HTML，生成DOM树；
2. 解析CSS，生成CSSOM树；
3. 将DOM树与CSS树合并，生成渲染树Render-Tree
4. 计算渲染树的布局Layout
5. 将渲染树绘制到屏幕上Paint

`CSS阻塞渲染：`
由于CSSOM负责存储渲染信息，浏览器必须保证在生成渲染树前，css是完备的(外联[@import href.src]、行内),所有css都已经下载并解析完毕，只有DOM树和CSSOM树解析结束，浏览器的渲染才能进入下一个阶段。CSS阻塞意味着，在CSS完毕之前，浏览器页面会处于白屏状态，所以将css放在head中执行，是为了更快的解析css，保证首次渲染。

`JS阻塞渲染：`
JS可以操作DOM来修改DOM结构，也可以操作CSS来修改样式，这就导致了浏览器在解析html时，遇到js会停止html的解析，同时也会阻塞css的解析，整个解析进行需要等到js执行完毕后才能继续执行。从性能角度上讲，把js脚本的加载放在页面的底部是合理的

`重排(reFlow)：`
DOM结构中的各个元素都是一个个盒子，浏览器根据元素的大小、结构 计算出元素出现在浏览器中的位置

触发重排条件：
1. 增加、删除、移动DOM节点会发生重排、重绘
2. 窗口resize或者滚动的时候
3. 修改网页默认字体

`重绘(rePaint)：`
<!-- 重排和重绘的定义需要重新斟酌 -->
当元素已经计算好在浏览器中的位置，根据计算的结果在页面进行渲染的过程叫做重绘。

触发重绘条件：
1. 不影响布局变化的CSS样式修改(背景颜色)

减少重排和重绘的方法：
1. 一次性修改样式 减少内联样式的使用
2. 批量修改DOM (使用文档片段生成子树，在子树中进行布局，最后再插入文档中)
3. 缓存布局信息 current = div.offsetLeft; 将值缓存起来
#### 进程、线程？

### 计算机网络
#### http0.9/1.0/1.1/1.2之间有什么不同？
#### 垃圾回收机制
##### 什么是垃圾回收机制？为什么要进行垃圾回收？
程序的运行需要分配内存，在代码执行后，将分配的内存进行回收，这个过程叫垃圾回收机制。垃圾是指在系统中不会被使用到的内存。如果在系统中分配的内存不会被回收，轻则会导致程序卡顿，重则导致进程崩溃。
##### 怎样进行垃圾回收？有什么方式？
简单来说，就是遍历内存中的节点，找出活动对象，把不再使用的内存进行标记，然后定期回收。
垃圾回收的重点是如何找出不可访问的对象。一般有以下两种方式，标记清除与引用标记。
- 标记清除算法分为两个阶段，标记阶段与清除阶段。
在标记时，从根节点出发，遍历所有的子节点，把活动对象标记为1，把非活动对象标记成0。待清除阶段时把标记位0的节点进行清除。优点是简单，只有0和1两个状态。
在清除后，剩余内存的位置是不变的，会产生大量的内存碎片，对内存进行重新分配时，需要遍历内存碎片，找到合适的内存。后续可以使用标记整理算法对内存碎片进行整理，把内存碎片向一侧移动，整理出连续的内存空间。

- 引用计数。对于一个对象是否可用简化成这个对象是否被引用。对象被引用时计数加1，不被引用时，计算减1。`当引用数为0时，进行垃圾回收，不会阻塞js执行；而标记清除算法会暂停js的执行。`

##### V8引擎对垃圾回收做了什么优化？
- 分代式垃圾回收
  对于老、大、存活时间长的变量与小、存活时间短的变量相比，他们垃圾回收的频率是不一致的。而且老、大、存活时间长的变量在回收时占用更多的资源。在内存中划分了新生代与老生代垃圾回收器，在新生代垃圾回收器中，将内存一分为二，分为使用区和空闲区，当使用区内存快占满时，执行垃圾回收，把使用区的活动对象标记、整理并复制一份到空闲区，然后对使用区进行垃圾回收。垃圾回收后，把使用区和空闲区的空间互换。
- 并行回收
 垃圾回收会占用js线程，垃圾回收时使用多进程进行回收可以加快垃圾回收的效率
- 增量标记和惰性清除
 采用三色标记法，把父节点和子节点都被引用的标记为黑色，父节点被引用，子节点未被引用标记为灰色，都没有没引用的标记成白色，在标记阶段，会分成多次进行标记，在清除阶段也会分段进行清除，这样就不会阻塞js太长时间
-  并发回收
使垃圾回收与js线程并发执行

> 并发与并行 并发是两件事情可以同时执行，并行是两件事情顺序执行
#### 输入google.com这个url，浏览器发生了什么事情？
- `解析地址，`解析出使用的协议和请求资源路径，如果输入的url或主机名不合法，调用浏览器默认的搜索引擎进行查询
- `判断缓存，`判断url下是否有缓存以及缓存是否有效，有效则从缓存中获取数据，否则进入下一步
- `解析ip。`检查host文件中是否有该地址对应的ip，如果没有，则调用各级域名服务器来解析ip地址
- `获取mac地址`。双方进行通讯前，还需要知道双方的mac地址，应用层下发数据给传输层，传输层下发ip给网络层，网络层获取ip地址并下发给数据链路层，数据链路层加入双方的mac地址，判断源ip的子网掩码判断是否在同一个子网中，调用CPR协议获取mac地址，如果不在同一个子网，通过网关转发获取mac地址
- `TCP的三次握手`。客户端向服务端发送SYN请求报文段和随机数。服务端接收**返回**SYN ACK报文段和随机数，并确认连接请求。客户端收到服务端的连接响应，建立连接，发送ACK确认报文段，服务端接收后，建立连接状态，此时双方已连接 
- `TLS的四次握手。`客户端向服务端发送SYN请求报文段和随机数。服务端接收**返回**SYN ACK报文段和随机数，并确认连接请求。客户端收到服务端的连接响应，建立连接，发送ACK确认报文段，服务端接收后，建立连接状态，此时双方已连接 
- `返回数据。`服务端响应后会返回一个html文件给浏览器进行解析，开始渲染页面
- `页面渲染`。根据html生成dom树，css生成CSS树，遇到script，判断有无defer/async属性，有多开线程异步加载，否则script的加载和执行会阻塞页面渲染 。当DOM树和CSSOM树加载完成后，会进行构建渲染树。根据渲染树的内容进行布局，绘制
- `TCP的四次挥手`。客户端认为连接结束，向服务端发送连接释放请求服务端接收后 告诉应用层释放TCP连接，此时服务端不能接收客户端的数据包。TCP的连接是双向的，如果服务端有未发送的数据包，可以继续发送。当服务端的数据包发送完毕，服务端向客户端发送释放请求，客户端接收后，会等待2MSL时间，如果中间服务端没有重新发送请求，服务端和客户端就成功关闭、断开连接。2MSL 报文段在网络请求的最长存活时间，减少丢包。

### 工程化
#### 什么是正向代理 什么是反向代理？
正向代理：在我们访问一个国外网站的时候，例如google.com时，国内的服务器不能直接访问国外的网站，这时候通过一个中间服务器去访问google，然后将数据通过中间服务器去返回。简单来说，正向代理是知道目标服务器的ip及端口，但是不能直接访问，只能通过代理服务器进行访问，需要用户进行配置的
反向代理：访问一个路径时，服务器向目标服务器发起请求，但用户不知道具体访问的是哪个服务器，通过中间服务器进行分配，这个过程用户是无感知的。
#### lerna npm的比较

### Webpack
#### webpack的构建流程？
webpack是一个自动化的打包工具。首先合并配置文件(webpack.config.js)与shell脚本的参数,将参数传入webpack并实例化compile，compile上注册插件及监听webpack的各个生命周期，调用compile.run 方法进行编译。从入口文件出发，递归遍历入口文件所依赖的文件，调用对应的loader对文件进行转换，直到所有文件都已经被转换。最后以entry为单位，把entry及所依赖的文件打包成同一个bundle进行输出。
#### 热更新原理？
浏览器更新的方式有重载和热更新。重载就是最简单粗暴的使用window.location.reload对浏览器进行重新刷新。热更新是只更新变化了的模块，同时可以保留浏览器上的状态。
webpack的热更新原理本质上是webpack用过express启动一个后台服务，通过webpack-dev-middleware对本地文件进行监听、重新编译，使用socket与客户端进行连接，当文件被修改时，给客户端推送最新hash值，使用ajax请求获取需要热更新的模块名，再通过jsonp获取热更新模块的代码，最后使用hotApply进行模块的更新替换。
#### 项目优化首页白屏？

### 项目实战















