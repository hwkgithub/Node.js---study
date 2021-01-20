/*
 * @Description: 
 * @Autor: HWK
 * @Date: 2021-01-15 22:46:13
 * @LastEditors: HWK
 * @LastEditTime: 2021-01-19 17:52:12
 */
var http = require('http')
var https = require('https')
var cheerio = require('cheerio')
var url = 'https://www.zhipin.com/guangzhou/?sid=sem_pz_bdpc_dasou_title'

function filterMenu(html) {
    var $ = cheerio.load(html)
    var menu = $('.search-hot')
    var menuData = []
    menu.each(function (index, value) {
        var menuTitle = $(value).find('b').text()
        var menuLists = $(value).find('a')
        var menuList = []
        menuLists.each(function (index, value) {
            menuList.push($(value).text())
        })
        menuData.push({
            menuTitle: menuTitle,
            menuLists: menuList
        })
    })
    return menuData
}

function printMenu(menu) {
    menu.forEach(function (value) {
        console.log(value.menuTitle + '\n')
        value.menuList.forEach(function (value) {
            console.log(value)
        })
    })
}

https.get(url, function (res) {
    var html = ''
    res.on('data', function (data) {
        html += data
    })

    res.on('end', function () {
        var result = filterMenu(html)
        printMenu(result)
    })

    res.on('error', function (err) {
        console.log(err)
    })
})