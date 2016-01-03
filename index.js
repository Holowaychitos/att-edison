'use strict'
const Bleacon = require('bleacon')
const five = require('johnny-five')
const Edison = require('galileo-io')
const _ = require('lodash')

const BEACONS = [12345, 22345, 61306, 28944, 21001]
const transport = require('./lib/transport')

const board = new five.Board({
  io: new Edison(),
  repl: false
})

var boardReady = () => {
  var led = new five.Led(8)
  Bleacon.startScanning()
  console.log('Board Start')
  Bleacon.on('discover', function discover (bleacons) {
    let res = _.filter([bleacons], {major: 21737})
    res = _.filter(res, {proximity: 'immediate'})

    if (res.length > 0) {
      let active = _.findIndex(BEACONS, res[0].minor)
      console.log(active)
    }

    //led.off()
    // const data = {
    //   busStopId: req.body.busStopId,
    //   busStopLoad: req.body.busStopLoad
    // }

    // transport.setLevel(data)
  })
}

board.on('ready', boardReady)
