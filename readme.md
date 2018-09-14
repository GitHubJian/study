 Classes

<dl>
<dt><a href="#B">B</a></dt>
<dd></dd>
<dt><a href="#A">A</a></dt>
<dd></dd>
<dt><a href="#B">B</a> ⇐ <code><a href="#A">A</a></code></dt>
<dd><p>Class B</p>
</dd>
</dl>

 Objects

<dl>
<dt><a href="#命名空间">命名空间</a> : <code>object</code></dt>
<dd></dd>
</dl>

 Constants

<dl>
<dt><a href="#path">path</a></dt>
<dd></dd>
<dt><a href="#RED">RED</a> : <code>number</code></dt>
<dd><p>常量定义</p>
</dd>
<dt><a href="#a222">a222</a></dt>
<dd></dd>
</dl>

 Functions

<dl>
<dt><a href="#name 函数别名">name 函数别名()</a></dt>
<dd></dd>
<dt><a href="#toString">toString(str)</a></dt>
<dd><p>返回字符串</p>
</dd>
<dt><a href="#getCookie">getCookie(key, convert)</a></dt>
<dd></dd>
<dt><del><a href="#a1">a1()</a></del></dt>
<dd></dd>
<dt><a href="#b">b()</a></dt>
<dd></dd>
</dl>

 Interfaces

<dl>
<dt><a href="#A">A</a></dt>
<dd></dd>
</dl>

<a name="A"></a>

 A
**Kind**: global interface  

* [A](#A)
    * [new A(x)](#new_A_new)
    * [.name()](#A+name) ⇒ <code>string</code>
    * *[.getName()](#A+getName) ⇒ <code>string</code>*

<a name="new_A_new"></a>

 new A(x)
Create A


| Param | Type | Description |
| --- | --- | --- |
| x | <code>string</code> | The x Value |

<a name="A+name"></a>

 a.name() ⇒ <code>string</code>
**Kind**: instance method of [<code>A</code>](#A)  
<a name="A+getName"></a>

 *a.getName() ⇒ <code>string</code>*
子类需要实现方法

**Kind**: instance abstract method of [<code>A</code>](#A)  
**Returns**: <code>string</code> - Return name  
<a name="B"></a>

 B
**Kind**: global class  
**Implements**: [<code>A</code>](#A)  

* [B](#B)
    * [.name()](#B+name) ⇒ <code>string</code>
    * *[.getName()](#A+getName) ⇒ <code>string</code>*

<a name="B+name"></a>

 b.name() ⇒ <code>string</code>
**Kind**: instance method of [<code>B</code>](#B)  
**Implements**: [<code>name</code>](#A+name)  
**Overrides**: [<code>name</code>](#A+name)  
<a name="A+getName"></a>

 *b.getName() ⇒ <code>string</code>*
子类需要实现方法

**Kind**: instance abstract method of [<code>B</code>](#B)  
**Implements**: [<code>getName</code>](#A+getName)  
**Returns**: <code>string</code> - Return name  
<a name="A"></a>

 A
**Kind**: global class  

* [A](#A)
    * [new A(x)](#new_A_new)
    * [.name()](#A+name) ⇒ <code>string</code>
    * *[.getName()](#A+getName) ⇒ <code>string</code>*

<a name="new_A_new"></a>

 new A(x)
Create A


| Param | Type | Description |
| --- | --- | --- |
| x | <code>string</code> | The x Value |

<a name="A+name"></a>

 a.name() ⇒ <code>string</code>
**Kind**: instance method of [<code>A</code>](#A)  
<a name="A+getName"></a>

 *a.getName() ⇒ <code>string</code>*
子类需要实现方法

**Kind**: instance abstract method of [<code>A</code>](#A)  
**Returns**: <code>string</code> - Return name  
<a name="B"></a>

 B ⇐ [<code>A</code>](#A)
Class B

**Kind**: global class  
**Extends**: [<code>A</code>](#A)  

* [B](#B) ⇐ [<code>A</code>](#A)
    * [.name()](#B+name) ⇒ <code>string</code>
    * *[.getName()](#A+getName) ⇒ <code>string</code>*

<a name="B+name"></a>

 b.name() ⇒ <code>string</code>
**Kind**: instance method of [<code>B</code>](#B)  
**Implements**: [<code>name</code>](#A+name)  
**Overrides**: [<code>name</code>](#A+name)  
<a name="A+getName"></a>

 *b.getName() ⇒ <code>string</code>*
子类需要实现方法

**Kind**: instance abstract method of [<code>B</code>](#B)  
**Implements**: [<code>getName</code>](#A+getName)  
**Returns**: <code>string</code> - Return name  
<a name="命名空间"></a>

 命名空间 : <code>object</code>
**Kind**: global namespace  
<a name="命名空间.toStr 允许您将另一个标识符的描述添加到你的当前描述"></a>

 命名空间.toStr 允许您将另一个标识符的描述添加到你的当前描述(str)
返回字符串

**Kind**: static method of [<code>命名空间</code>](#命名空间)  

| Param | Type |
| --- | --- |
| str | <code>\*</code> | 

<a name="COLOR"></a>

 COLOR
Enum for color value

**Kind**: global enum  
**Properties**

| Name | Default |
| --- | --- |
| red | <code>red</code> | 
| blue | <code>blue</code> | 

<a name="path"></a>

 path
**Kind**: global constant  
<a name="RED"></a>

 RED : <code>number</code>
常量定义

**Kind**: global constant  
**Default**: <code>0</code>  
<a name="a222"></a>

 a222
**Kind**: global constant  
**Export**:   
<a name="name 函数别名"></a>

 name 函数别名()
**Kind**: global function  
<a name="toString"></a>

 toString(str)
返回字符串

**Kind**: global function  

| Param | Type |
| --- | --- |
| str | <code>\*</code> | 

<a name="getCookie"></a>

 getCookie(key, convert)
**Kind**: global function  

| Param | Type |
| --- | --- |
| key | <code>string</code> | 
| convert | <code>getCookieCovert</code> | 

<a name="getCookie..getCookieCovert"></a>

 getCookie~getCookieCovert : <code>function</code>
回调函数的描述

**Kind**: inner typedef of [<code>getCookie</code>](#getCookie)  

| Param | Type |
| --- | --- |
| value | <code>\*</code> | 

<a name="a1"></a>

 ~~a1()~~
***Deprecated***

**Kind**: global function  
**Example**  
```js
// return 1
a(1)
```
<a name="b"></a>

 b()
**Kind**: global function  
