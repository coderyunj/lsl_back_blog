const { createUser, getUserInfo, updateById } = require('../service/user.service')
const {userRegisterError} = require("../constant/err.type");
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config.default')
class UserController {
    async register(ctx,next) {
        console.log(ctx.request.body)
        const { user_name,password } = ctx.request.body
        // 判断用户名和密码是否为空

        // 判断用户是否存在

        // 操作数据库有service层接管
        try {
            const res = await createUser(user_name,password)
            ctx.body = {
                code: 0,
                message: '注册成功',
                result: {
                    id: res.id,
                    user_name: res.user_name
                }
            }
        }catch (err) {
            console.log(err)
            ctx.app.emit('error', userRegisterError, ctx)
        }

    }

    async login(ctx,next) {
        const { user_name } = ctx.request.body

        // 1.获取用户信息（在token的payload中，记录id，user_name, is_admin
        try {
            // 从返回对象中剔除password属性，将剩下的属性放到res对象中
            const { password, ...res} = await getUserInfo({ user_name})
            ctx.body = {
                code: 0,
                message: '用户登录成功',
                result: {
                    token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d'})
                }
            }
        }catch (err) {
            console.error('用户登录失败',err)
        }
        await next()
    }

    async changePassword(ctx, next) {
        console.log('到这里')
        // 获取数据
        const id = ctx.state.user.id
        const password = ctx.request.body.password

        if(await updateById({id, password})) {
            ctx.body = {
                code: 0,
                message: '修改密码成功',
                result: ''
            }
        } else {
            ctx.body = {
                code: '10007',
                message: '修改密码失败',
                result: ''
            }
        }
    }
}

module.exports = new UserController()