const Router = require('koa-router')

const { userValidator, userVerify, crpytPassword, verifyLogin} = require('../middleware/user.middleware')
const {register, login, changePassword} = require('../controller/user.controller')
const {auth} = require("../middleware/auth.middleware");

const router = new Router({prefix: '/users'})

router.post('/register',userValidator,userVerify,crpytPassword, register)

router.post('/login',userValidator, verifyLogin, login)

// 修改密码接口
router.patch('/', auth, crpytPassword, changePassword)
module.exports = router