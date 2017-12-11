const fs = require('fs')

const text = fs.readFileSync('./a.html').toString()

const ipHostRegx = /'(.*?);(.*?);(.*?);/g
let result

while((result = ipHostRegx.exec(text)) != null) {
  console.log(result[1], result[2], result[3])
}

