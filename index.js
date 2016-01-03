'use strict'
const Bleacon = require('bleacon')
const five = require('johnny-five')
const Edison = require('galileo-io')
const _ = require('lodash')

const board = new five.Board({
  io: new Edison(),
  repl: false
})

var boardReady = () => {
  var led = new five.Led(8)
  Bleacon.startScanning()
  Bleacon.on('discover', function discover (bleacons) {
    let res = _.filter([bleacons], {major: 21737})
    res = _.filter(res, {proximity: 'immediate'})
    led.off()
  })
}

board.on('ready', boardReady)
