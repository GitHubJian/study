// 之前是做成原子权限，拿或运算的结果值和这个原子权限做与运算，结果>0就表示运算结果中包含有这个数

var arr = [1, 2, 4, 8, 16, 32, 64]
var sum = 1 | 2 | 8 // 这个是后端返回给你的数值
console.log(sum) // print 11

var res = (sum & 64) > 0 // 用这个判断是否存在 64

const a2 = arr.filter(v => {
    return (sum & v) > 0
})

console.log(a2) // print false
