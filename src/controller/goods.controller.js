const {fileUploadError, unSupportedFileType, publishGoodsError, invalidGoodsId} = require("../constant/err.type");
const path = require("path");
const { createGoods, updateGoods, removeGoods, restoreGoods, findGoods } = require('../service/goods.service')
class GoodsController {
    async upload(ctx, next) {

        const { file } = ctx.request.files
        console.log(file)
        const fileType = ['image/jpeg', 'image/png']
        if(file) {
            if(!fileType.includes(file.type)) {
                return ctx.app.emit('error',unSupportedFileType, ctx)
            }
            ctx.body = {
                code: 0,
                message: '商品图片上传成功',
                result: {
                    goods_img: path.basename(file.path)
                }
            }
        }else {

            return ctx.app.emit('error', fileUploadError, ctx)
        }
        ctx.body = '商品图片上传成功'
    }

    async create(ctx) {
        try {
            const res = await createGoods(ctx.request.body)
            ctx.body = {
                code: 0,
                message: '发布商品成功',
                result: res
            }
        } catch (err) {
            console.error(err)
            return ctx.app.emit('error', publishGoodsError, ctx)
        }
    }

    async update(ctx) {
        try {
            const res = await updateGoods(ctx.params.id, ctx.request.body)
            if (res) {
                ctx.body = {
                    code: 0,
                    message: '修改商品成功',
                    result: ''
                }
            } else {
                return ctx.app.emit('error', invalidGoodsId, ctx)
            }
        } catch (err) {
            console.error(err)
        }
    }

    async remove(ctx) {
        const res = await removeGoods(ctx.params.id)
        if(res) {
            ctx.body = {
                code: 0,
                message: '下架商品成功',
                result: ''
            }
        } else {
            return ctx.app.emit('error', invalidGoodsId, ctx)
        }

    }

    async restore(ctx) {
        const res = await restoreGoods(ctx.params.id)
        if(res) {
            ctx.body = {
                code: 0,
                message: '上架商品成功',
                result: ''
            }
        } else {
            return ctx.app.emit('error', invalidGoodsId, ctx)
        }
    }

    async findAll(ctx) {
        // 解析pagenum 和pageSize
        const { pageNum = 1, pageSize = 10 } = ctx.request.query
        const res = await findGoods(pageNum, pageSize)
        ctx.body = {
            code: 0,
            message: '获取商品列表成功',
            result: res
        }
    }
}

module.exports = new GoodsController()