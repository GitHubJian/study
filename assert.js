const a = [1, 2, 3];
const buf = Buffer.from(a);
console.log(buf);

a[1] = 4;

console.log(buf);
