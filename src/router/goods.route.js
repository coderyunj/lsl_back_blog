const Router = require('koa-router')

const { upload, create, update, remove, restore, findAll } = require('../controller/goods.controller')
const {auth, hasAdminPermission} = require("../middleware/auth.middleware");
const { validatorParams } = require("../middleware/goods.middleware");
const router = new Router({prefix: '/goods'})

router.post('/upload',auth ,hasAdminPermission, upload)

// 发布商品接口
router.post('/create',auth ,hasAdminPermission, validatorParams, create)

// 修改商品接口
router.put('/:id',auth ,hasAdminPermission, validatorParams, update)

// 删除商品接口
// 硬删除接口
router.post('/:id/off',auth ,hasAdminPermission, remove)
router.post('/:id/on',auth ,hasAdminPermission, restore)

// 获取商品列表
router.get('/list', findAll)

module.exports = router
