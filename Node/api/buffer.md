# Buffer


* a global within Node.js  
* raw memory allocations outside the V8 heap  
* similar to array of integers  
* can't be resized

```
const buf = Buffer.alloc(10)
```

### The --zero-fill-buffers command line option
> force all newly allocated.

---

### Buffer.allocUnsafe()
>### Buffer.allocUnsafeSlow()

* can allow this old data to be leaked when the **Buffer** memory isread

---

### and Character Encodings
>**Buffer** instances are used to represent sequences of encoded characters such as UTF-8, UCS3, Base64, or even Hex-encoded data.
[WHATWG Encoding Standard](https://encoding.spec.whatwg.org/)

### and TypedArray 
* Memory is copied to the TypedArray
* as an array of distinct elements

---

### and ES6 iteration
* be iterated over

```
const buf = Buffer.form([1,2,3]);
for(const b of buf){
	console.log(b);
}
```
___

### Buffer.alloc(size[,fill[,encoding]])
>### Buffer.allocUnsafe(size)
>### Buffer.allocUnsafeSlow(size)

```
const buf = Buffer.alloc(5);
console.log(buf)
```

----------------

### Buffer.byteLength(string[,encoding])
* returns the actual byte length of a string

----------------

### Buffer.compare(buf1,buf2)
* sorting arrays of **Buffer** instance.

```
const buf1 = Buffer.from('1234');
const buf2 = Buffer.from('0123');

const arr = [buf1,buf2];
console.log(arr.sort(Buffer.compare));
```
----

### Buffer.concat(list[,totalLength])
* return a new **Buffer**

-----

### Buffer.from()
> Buffer.from(array)   
> Buffer.from(buffer)  
> Buffer.from(string[,encoding])
>> * Returns a new **Buffer**
> 
> Buffer.from(arrayBuffer[,byteOffset[,length]])  
>> * Returns a view of **arrayBuffer**
>
> Buffer.from(object[,offsetOrEncoding[,length]])
>> * Object that support **Symbol.toPrimitive**

---

### Buffer.isBuffer(obj)
### Buffer.isEncoding(encoding)
### Buffer.poolSize





