<template>
  <div>
    <el-button @click="handleUpload">上传</el-button>
    <input type="file" @change="handleFileChange" />
  </div>
</template>
<script setup>
const  SIZE = 1024;
import { reactive, ref } from '@vue/reactivity';
import { request } from '../utils'
/**
 * 大文件上传
 * 1. 点击文件上传，将文件以一定的大小进行分割，形成一个文件list
 * 2. 并发的发送文件列表(promise.allSettled 里面的promise是并发请求的)
 * 3. 当文件发送完毕后通知服务端进行合并
 *    怎么通知服务端进行合并呢？
 *      - 从前端通知，发送完切片后调用接口通知   
 * 4. 服务端 --- 搭建http服务器
 * 5. 接收切片
 */
const container = reactive({file: null})
const data = ref([])
console.log('container: ', container);

/** 文件上传 */
const handleFileChange = (e) => {
  console.log('e: ', e);
  const [file] = e.target.files;
  console.log('file: ', file);
  if (!file) return;
  // Object.assign(this.$data, this.$options.data());
  container.file = file;
}

/** 将文件进行切片 */
const createFileChunk = (file, size = SIZE) =>{
  
  const fileChunkList = []
  let cur = 0;
  while(cur < file.size) {
    // splice 改变元素组，返回被裁切的内容  slice 不改变原数组，返回裁剪的内容
    fileChunkList.push({file: file.slice(cur, cur+size)})
    cur = cur+size
  }
  return fileChunkList
}

/** 上传 */
const handleUpload = () => {
  // 将文件进行切片
  if (!container.file) return;
  const fileChunkList = createFileChunk(container.file)
  console.log('fileChunkList: ', fileChunkList);
  data.value = fileChunkList.map(({ file }, index) => ({
    chunk: file,
    hash: `${container.file.name}-${index}`
  }))
  // console.log('data: ', data);
  uploadChunks() 
}

/** 上传切片 */
const uploadChunks = async () => {
  const requestList = data.value.map(({chunk, hash}) => {
    const formData = new FormData();
    formData.append('chunk', chunk);
    formData.append('hash', hash)
    formData.append('filename', container.file.name);
    return formData
  }).map(({formData}) => 
    request({url: 'http://localhost:3000', data: formData})
  )
  await Promise.all(requestList) // 并发切片
  // await mergeRequest()
}

/** 发送合并请求 */
const mergeRequest = async () => {
  const res = await request({
    url: "http://localhost:3000/merge",
    headers: {
      "content-type": "application/json"
    },
    data: JSON.stringify({
      filename: container.file.name
    })
  });
      console.log('res: ', res);


}


// watch(() => container.file, (newVal, oldVal) => {
//   console.log('newVal, oldVal: ', newVal, oldVal);

// })

</script>

<style>

</style>