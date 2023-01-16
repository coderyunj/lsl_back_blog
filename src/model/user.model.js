const { DataType, DataTypes} = require('sequelize')

const seq = require('../db/seq')

// 创建数据库模型
const User = seq.define('blog_user',{
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: '用户名'
    },
    password: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        comment: '密码'
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        comment: '是否为管理员，0：不是管理员（默认），1：是管理员'
    }
})

// force表示如果原来有存在表，会删除当前表重新创建，所以这行需要在第一次初始化之后注释
// User.sync({force: true})
module.exports = User