const fs = require('fs')

const txt = fs.readFileSync('./a.txt').toString()

const regex = /ip_stat\[\d+\]=(\[.*?\]);/g
// console.log(regex.exec(txt).index)
let result
const as = []
while((result = regex.exec(txt)) != null) {
  as.push(eval(result[1]))
}
const as2 = ['10.2.53.116','6.40947M','35.0956G',0,     1.560,0,     0.674,0,     0.886,23,167916916,'0000000000000000000000000000000000000000000000000000000006409478','0000000000000000000000000000000000000000000000000000035095679384',0,     0.886,12,11,0]
console.log(as2[0], as2[2], as2[4], as2[6], as2[8], as2[9], as2[14], as2[15], as2[16], as2[17])
