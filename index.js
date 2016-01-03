'use strict'
const Bleacon = require('bleacon')
const five = require('johnny-five')
const Edison = require('galileo-io')
const _ = require('lodash')

const BEACONS = [12345, 22345, 61306, 28944, 21001]
const BUS_ROUTES = {
  12345: '5504',
  22345: '5506',
  61306: '5507',
  28944: '5508',
  21001: '1217'
}

var temp;

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
      let active = _.indexOf(BEACONS, res[0].minor)
      if (active !== -1 && temp !== active) {
        temp = active
        console.log(active)
        const data = {
          currentBusStopId: BUS_ROUTES[res[0].minor]
        }

        transport.setLevel(data)
      }
    }

    //led.off()

  })
}

board.on('ready', boardReady)
