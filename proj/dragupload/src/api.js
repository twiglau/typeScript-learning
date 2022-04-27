let Koa = require('koa');
let koaStatic = require('koa-static');
let koaBody = require('koa-body');
let path = require('path');
let fs = require('fs');
let app = new Koa();

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type,Accept');
    ctx.set('Access-Control-Allow-Methods', 'PUT,POST,DELETE,GET,OPTIONS');
    if(ctx.method === 'OPTIONS'){
        ctx.body = 200;
    }else{
        await next();
    }
});
app.use(koaBody({
    formidable: {uploadDir: path.resolve(__dirname, 'uploads')},
    multipart: true
}));
// 把上传的目录当成静态文件中间件所有目录
app.use(koaStatic(path.resolve(__dirname, 'uploads')));

/**
 * path:'',
 * name:'',
 * type: 'image/jpeg'
 */
app.use(async (ctx, next) => {
    if(ctx.url === '/upload'){
        let file = ctx.request.files.file;
        let filename = path.basename(file.path) + path.extname(file.name);
        fs.renameSync(file.path, path.join(path.dirname(file.path), filename));
        console.log(file);
        ctx.body = {
            url: `http://localhost:8080/${filename}`
        }
    }else{
        await next();
    }
})
app.listen(8080, ()=> {
    console.log('服务器8080启动了');
})