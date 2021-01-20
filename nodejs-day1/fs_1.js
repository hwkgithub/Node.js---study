/*
 * @Description: 文件系统--文件创建时间
 * @Autor: HWK
 * @Date: 2021-01-15 22:46:13
 * @LastEditors: HWK
 * @LastEditTime: 2021-01-20 22:29:19
 */
const fs = require('fs')

fs.stat('hello.js', (error, stats) => {
    if (error) {
        console.log(error)
    } else {
        console.log(stats)
        console.log(`文件：${stats.isFile()}`)
        console.log(`目录：${stats.isDirectory()}`)
    }
})