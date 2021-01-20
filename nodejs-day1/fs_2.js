/*
 * @Description: 文件系统--创建目录
 * @Autor: HWK
 * @Date: 2021-01-15 22:46:13
 * @LastEditors: HWK
 * @LastEditTime: 2021-01-20 22:29:52
 */
const fs = require('fs')

fs.mkdir('logs', (error) => {
    if(error){
        console.log(error)
    }else{
        console.log('成功创建目录：logs')
    }
})