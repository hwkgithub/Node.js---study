/*
 * @Description: 文件系统---删除目录
 * @Autor: HWK
 * @Date: 2021-01-15 22:46:13
 * @LastEditors: HWK
 * @LastEditTime: 2021-01-20 22:53:10
 */
const fs = require('fs')

fs.readdirSync('logs').map((file) => {
    fs.unlink(`logs/${file}`, (error) => {
        if (error) {
            console.log(error)
        } else {
            console.log(`成功的删除了文件: ${file}`)
        }
    })
})

fs.rmdir('logs', (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log('成功的删除了目录：logs')
    }
})