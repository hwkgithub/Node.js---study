/*
 * @Description: 文件系统--对文件进行重命名
 * @Autor: HWK
 * @Date: 2021-01-15 22:46:13
 * @LastEditors: HWK
 * @LastEditTime: 2021-01-20 22:52:09
 */
const fs = require('fs')

fs.rename('logs/hello.log', 'logs/greeting.log', (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log('重命名成功')
    }
})