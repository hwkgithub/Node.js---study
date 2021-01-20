/*
 * @Description: 文件系统--写入内容
 * @Autor: HWK
 * @Date: 2021-01-15 22:46:13
 * @LastEditors: HWK
 * @LastEditTime: 2021-01-20 22:33:19
 */
const fs = require('fs')
//写入内容
fs.writeFile('logs/okk.log', 'hwk,hello \n', (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log('成功写入文件！')
    }
})

//追加内容
fs.appendFile('logs/okk.log', 'hwk2,hello \n', (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log('成功写入文件！')
    }
})