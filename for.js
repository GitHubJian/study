var colors = ['red', 'green', 'blue'];
// 将数组长度变为10
colors.length = 10;
// 再添加一个元素的数组末尾
colors.push('yellow');

//生成器
for (var i in colors) {
    console.log(typeof i); // string
    console.log(i); // 0 1 2 10 string
}
console.log('-'.repeat(20));
//遍历器
for (var j = 0; j < colors.length; j++) {
    console.log(typeof j); // number
    console.log(j); // 0 1 2 3 4 5 6 7 8 9 10
}

console.log('-'.repeat(20));
colors.forEach((v, i) => {
    console.log(typeof i); //number
    console.log(i); //0 1 2 10
});

colors.map((v, i) => {
    console.log(typeof i); //number
    console.log(i); //0 1 2 10
});
