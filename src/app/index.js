const path = require('path')

const Koa = require('koa')
const { koaBody } = require('koa-body')

const KoaStatic = require('koa-static')
const errHandler = require('./errHandler')
const router = require('../router')
const parameter = require('koa-parameter')


const app = new Koa()
app.use(koaBody({
    multipart: true,
    formidable: {
        uploadDir: path.join(__dirname, '../upload'),
        keepExtensions: true,
    },
    parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE']
}))
app.use(parameter(app))
app.use(KoaStatic(path.join(__dirname, '../upload')))
app.use(router.routes()).use(router.allowedMethods())

// 统一错误处理
app.on('error', errHandler)
module.exports = app