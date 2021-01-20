/*
 * @Description: 事件监听器
 * @Autor: HWK
 * @Date: 2021-01-15 22:46:13
 * @LastEditors: HWK
 * @LastEditTime: 2021-01-20 22:20:25
 */
const EventEmitter = require('events');

class Player extends EventEmitter {}

var player = new Player()

player.on('play', () => {
    console.log('正在播放')
})

player.emit('play')