const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/config.default')
const {tokenExpiredError, hasNotAdminPermission, invalidToken} = require("../constant/err.type");
const auth = async (ctx, next) => {
    // 解析token
    const {authorization = ''} = ctx.request.header
    const token = authorization.replace('Bearer ', '')
    try {
        // user中包含了payload的信息
        const user = jwt.verify(token, JWT_SECRET)
        ctx.state.user = user
    } catch (err) {
        switch (err.name) {
            case 'TokenExpiredError':
                console.error('token已过期', err)
                return ctx.app.emit('error', tokenExpiredError, ctx)
            case 'JsonWebTokenError':
                console.error('无效token', err)
                return ctx.app.emit('error', invalidToken, ctx)
        }
    }
    // ctx.body = '修改密码成功'
    await next()
}

const hasAdminPermission = async (ctx, next) => {
    const {is_admin} = ctx.state.user
    if (!is_admin) {
        console.error('该用户没有管理员的权限', ctx.state.user)
        return ctx.app.emit('error', hasNotAdminPermission, ctx)
    }
    await next()
}
module.exports = {
    auth,
    hasAdminPermission
}