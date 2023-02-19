const Router = require('koa-router')

const router = new Router({prefix: '/test'})

router.get('/',(ctx) => {
    ctx.body = {
        code: 200,
        message: '接口返回成功',
        result: '1111'
    }
})

module.exports = router