
function _unitConvert(times, num) {
  if (num / 1024 < 1) {
    return { num: num.toFixed(2), times }
  } else {
    return _unitConvert(times + 1, num / 1024)
  }
}

module.exports = {
  unitConvert(num) {
    const s = _unitConvert(0, num)
    if (s.times === 0) {
      return s.num + 'B'
    } else if (s.times === 1) {
      return s.num + 'K'
    } else if (s.times === 2) {
      return s.num + 'M'
    } else if (s.times === 3) {
      return s.num + 'G'
    } else if (s.times === 4) {
      return s.num + 'T'
    } else {
      return (s.num * Math.pow(1024, s.times - 4)) + 'T'
    }
  }
}
