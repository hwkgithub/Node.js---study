/*
 * @Description: 文件系统--读文件夹
 * @Autor: HWK
 * @Date: 2021-01-15 22:46:13
 * @LastEditors: HWK
 * @LastEditTime: 2021-01-20 22:51:35
 */
const fs = require('fs')

fs.readdir('logs', (error, files) => {
    if (error) {
        console.log(error)
    } else {
        console.log(files)
    }
})