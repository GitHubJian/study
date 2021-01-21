// 正则表达式没有实现 Symbol.iterator

var a = /123/g
for (const i in a) {
  console.log(i) // 不执行
}

var b = { a }
for (const i in b) {
  console.log(i) // 执行
}
