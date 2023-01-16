// 导入kaa-router
const Router = require('koa-router')
const {auth} = require("../middleware/auth.middleware");
const {validatorParams} = require("../middleware/cart.middleware");
const {add, findAll, update, remove,selectAll, unselectAll} = require("../controller/cart.controller");

const router = new Router({prefix: '/carts'})

router.post('/', auth, validatorParams({goods_id: 'number'}), add)

// 获取购物车列表
router.get('/', auth, findAll)

router.patch('/:id', auth, validatorParams({
        number: {type: 'number', required: false},
        selected: {type: 'bool', required: false}
    }),
    update)

router.delete('/', auth, validatorParams({ ids: 'array'}), remove)

router.post('/selectAll', auth, selectAll)
router.post('/unselectAll', auth, unselectAll)

module.exports = router