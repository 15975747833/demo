/** @format */

const http = require('http');
const path = require('path');
const server = http.createServer();
// const fse = require('fs-extra');
// const multiparty = require('multiparty');

// __dirname 为当前文件在本地的目录  /Users/jiangjiayu/Documents/demo/big-file-upload/back
const UPLOAD_DIR = path.resolve(__dirname, '..', 'target');
console.log('__dirname: ', __dirname);
console.log('UPLOAD_DIR: ', UPLOAD_DIR);
server.on('request', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.status = 200;
    res.end();
    return;
  }

  const multipart = new multiparty.Form();

  multipart.parse(req, async (err, fields, files) => {
    console.log('err: ', err);
    console.log('req: ', fields, files);
    if (err) {
      return;
    }
    const [chunk] = files.chunk;
    const [hash] = fields.hash;
    const [filename] = fields.filename;
    const chunkDir = path.resolve(UPLOAD_DIR, filename);
    // 切片目录不存在，创建切片目录
    if (!fse.existsSync(chunkDir)) {
      await fse.mkdirs(chunkDir);
    }
    // fs-extra 专用方法，类似 fs.rename 并且跨平台
    // fs-extra 的 rename 方法 windows 平台会有权限问题
    // https://github.com/meteor/meteor/issues/7852#issuecomment-255767835
    await fse.move(chunk.path, `${chunkDir}/${hash}`);
    res.end('received file chunk');
  });

  // if (req.url === '/merge') {
  //   // const data = await resolvePost(req);
  //   // const { filename,size } = data;
  //   // const filePath = path.resolve(UPLOAD_DIR, `${filename}`);
  //   // await mergeFileChunk(filePath, filename);
  //   console.log('res: ', res);
  //   res.end(
  //     JSON.stringify({
  //       code: 0,
  //       message: 'file merged success',
  //     })
  //   );
  //   // res.send('success');
  // }
});

server.listen(3001, () => console.log('正在监听 3000 端口'));
