const {goodsParamsError} = require("../constant/err.type");
const validatorParams = async(ctx, next) => {

    try {
        ctx.verifyParams({
            goods_name: { type: 'string', required: true },
            goods_price: { type: 'number', required: true },
            goods_num: { type: 'number', required: true },
            goods_img: { type: 'string', required: true }
        })
    } catch (err) {
        goodsParamsError.result = err
        return ctx.app.emit('error', goodsParamsError,ctx)
    }
    await next()
}

module.exports = { validatorParams }