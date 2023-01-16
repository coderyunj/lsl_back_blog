const bcrypt = require('bcryptjs')
const { getUserInfo } = require("../service/user.service");
const { userFormateError, userAlreadyExited, userRegisterError, userDoesNotExist, userLoginError, invalidPassword} = require('../constant/err.type')
const userValidator = async (ctx, next) => {
    const { user_name, password} = ctx.request.body
    if(!user_name || !password)  {
        console.error('用户名或密码为空',ctx.request.body)
        ctx.app.emit('error', userFormateError, ctx)
        // ctx.status = 400
        // ctx.body = {
        //     code: '10001',
        //     message: '用户名或密码为空',
        //     result: ''
        // }
        return
    }
    await next()
}
const userVerify = async (ctx, next) => {
    const { user_name } = ctx.request.body
    // if(getUserInfo({ user_name })) {
    //     ctx.app.emit('error', userAlreadyExited, ctx)
    //     // ctx.status = 409
    //     // ctx.body = {
    //     //     code: '10002',
    //     //     message: '用户已经存在',
    //     //     result: ''
    //     // }
    //     return
    // }
    try {
        const res = await getUserInfo({user_name})
        if(res) {
            console.error('用户名已经存在', {user_name})
            ctx.app.emit('error', userAlreadyExited, ctx)
            return
        }
    }catch (err){
        ctx.app.emit('error',userRegisterError, ctx)
        return
    }
    await next()
}
const crpytPassword = async (ctx, next) => {
    const { password } = ctx.request.body
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    ctx.request.body.password = hash

    await next()
}

const verifyLogin = async (ctx, next) => {
    // 根据用户名查找数据库用户是否存在
    // 不存在报错
    const { user_name, password } = ctx.request.body
    try {
        const res = await getUserInfo({ user_name })

        if(!res) {
            console.error('用户名不存在',{ user_name})
            ctx.app.emit('error',userDoesNotExist,ctx)
            return
        }
        // 校验密码是否匹配，不匹配报错
        if(!bcrypt.compareSync(password, res.password)){
            ctx.app.emit('error',invalidPassword, ctx)
            return
        }
    }catch (err) {
        console.error(err)
        return ctx.app.emit('error',userLoginError,ctx)
    }

    await next()
}
module.exports = {
    userValidator,
    userVerify,
    crpytPassword,
    verifyLogin
}