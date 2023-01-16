
const Router = require('koa-router')
const {auth} = require("../middleware/auth.middleware");
const {validator} = require('../middleware/addr.middleware')
const router = new Router({ prefix: '/address'})

router.post('/', auth,validator({
    consignee: 'string',
    phone: {type: 'string', format: /^1\d{11}$/}}),(ctx) => {
    console.log(ctx.state.user.id)
    ctx.body = '11'
})

module.exports = router