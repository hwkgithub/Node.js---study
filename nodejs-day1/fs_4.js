/*
 * @Description: 文件系统--读文件
 * @Autor: HWK
 * @Date: 2021-01-15 22:46:13
 * @LastEditors: HWK
 * @LastEditTime: 2021-01-20 22:48:32
 */
const fs = require('fs')

fs.readFile('logs/hello.log', 'utf8', (error, data) => {
    if (error) {
        console.log(error)
    } else {
        console.log(data)
    }
})