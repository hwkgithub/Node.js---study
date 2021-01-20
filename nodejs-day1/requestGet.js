/*
 * @Description: 获取接口数据
 * @Autor: HWK
 * @Date: 2021-01-15 22:46:13
 * @LastEditors: HWK
 * @LastEditTime: 2021-01-20 14:41:22
 */
const https = require('https')

var options = {
    hostname: 'api.douban.com',
    port: 443,
    method: 'GET',
    path: '/v2/movie/top250'
}

var responseData = ''

var request = https.request(options, (response) => {
    // console.log(response)
    // console.log(response.statusCode)
    // console.log(response.headers)
    response.setEncoding('utf8')
    response.on('data', (chunk) => {
        responseData += chunk
    })
    response.on('end', () => {
        JSON.parse(responseData).subjects.map((item) => {
            console.log(item.title)
        })
    })
})

request.on('error', (error) => {
    console.log(error)
})

request.end()