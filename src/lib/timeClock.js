'use strict'

var timeclock = function (time) {
  var _time = time || 60000
  var _change_cbs = []
  var _complete_cbs = []
  var _during_time = 0

  var _interval = setInterval(() => {
    if (_time <= 0) {
      clearInterval(_interval)
      emitComplete()
    } else {
      _time -= 1000
      _during_time += 1000
      emitChange(_during_time)
    }
  }, 1000)

  var onComplete = function (cb) {
    if (typeof cb !== 'function') { throw new Error('NOT FUNCTION TYPE') }
    _complete_cbs.push(cb)
  }

  var onChange = function (cb) {
    if (typeof cb !== 'function') { throw new Error('NOT FUNCTION TYPE') }
    _change_cbs.push(cb)
  }

  var emitComplete = function () {
    _complete_cbs.map(e => e())
  }

  var emitChange = function (second) {
    _change_cbs.map(e => e(second))
  }

  return {
    onComplete,
    onChange
  }
}

module.exports = timeclock