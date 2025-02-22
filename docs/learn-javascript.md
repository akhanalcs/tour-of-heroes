# Learn JavaScript Basics

## Helpful links
1. [Javascript Info](https://javascript.info/)(Read it when you get time!)

## Function declaration vs Function expression
[Reference](https://javascript.info/function-expressions)

Function declaration
```js
function sayHi() {
  alert( "Hello" );
}
```

Function expression
```js
let sayHi = function() {
  alert( "Hello" );
};

// Or
let sayHi = () => { alert("Hello") }; // Arrow function
```
No matter how the function is created, a function is a value. Both examples above store a function in the `sayHi` variable.

## Implicit vs Explicit return in Arrow functions
```js
// An arrow function with {}, no automatic return
const addOneA = (num) => { num + 1 }; 
console.log(addOneA(1)); // undefined

// An arrow function without {}, will automatically return
// When you omit the curly braces {}, it creates an **implicit** return of the expression that follows the arrow =>. 
// This is also known as a "concise body" syntax.
const addOneB = (num) => num + 1; 
console.log(addOneB(1)); // 2
```

`addOneA` is equivalent to
```js
function addOneA(num){
  num + 1;
}
```

`addOneB` is equivalent to
```js
function addOneB(num){
  return num + 1;
}
// Or
const addOneB = function(num){
  return num + 1;
}
// Or
const addOneB = (num) => {
  return num + 1;
}
```

## Export and Import
[Read this](https://javascript.info/import-export) as this is an important concept.

### import vs require
<table>
<thead>
  <tr>
    <th></th>
    <th><code>import</code> (ES Modules syntax)</th>
    <th><code>require</code> (CommonJS Modules syntax)</th>
  </tr>
</thead>
<tbody>
  <tr>
  <td><b>Summary</b></td>
  <td valign="top">
  <p>It is the latest standard for working with modules in JavaScript and is supported in modern browsers and environments that transpile or support ES6, like TypeScript or Babel.</p>
  </td>
  <td valign="top">
  <p>It was not originally part of JavaScript, but was adopted as the standard for Node.js, which has been routinely used in JavaScript server-side development.</p>
  <p>While Node.js historically used CommonJS, it now also supports ES6 modules.</p>
  </td>
  </tr>
  <tr>
  <td><b>Exports</b></td>
  <td valign="top">
  <p>Static (pre-defined). The structure of the module's exports is determined when the code is parsed, not while running.</p>
  <p>This static nature allows tooling such as bundlers and linters to analyze the code without executing it, enabling features like better tree-shaking and faster load times in browsers.</p>
  For example:

  ```js
  // myModule.js
  export function myFunc() { /*...*/ }
  export const MY_CONST = 123;
  ```

  </td>
  <td valign="top">
  <p>Computed during runtime. The exports in a module are determined during the execution of the code.</p> 
  For example:
  
  ```js
  // myModule.js
  if (process.env.NODE_ENV === 'development') {
    module.exports.debug = function debug() {
      console.log('Debugging...');
    }
  } else {
    module.exports.log = function log() {
      console.log('Logging...');
    }
  }
  ```

  </td>
  </tr>
  <tr>
  <td><b>Loading Modules</b></td>
  <td valign="top">
  <p>Can be asynchronous, allowing efficient, selective loading of module parts.<br>This can result in faster load times and better performance.
  </p>
  
  For example:

  ```js
  import { myFunc } from './myModule.js';
  myFunc();
  ```

  </td>
  <td valign="top">
  <p>Synchronous (loads modules one by one).<br>Always loads entire module, which could affect performance if the module is large.</p>
  For example:

  ```js
  const { debug, log } = require('./myModule.js');
  if(debug) debug();
  if(log) log();
  ```
  
  </td>
  </tr>
  <tr>
  <td><b>Full Example</b></td>
  <td valign="top">
  Make sure to export the function first.
  
  ```js
  // somefile.js
  export function sayHello() {
    console.log("Hello, world!");
  }
  
  console.log("somefile has been loaded!");
  ```

  Then import it

  ```js
  // main.js
  import { sayHello } from './somefile.js';
  sayHello();

  // 👇 Outputs 👇
  // "somefile has been loaded!"
  // "Hello, world!"
  ```
  
  </td>
  <td valign="top">
  Make sure to add the function to <code>module.exports</code>.
  
  ```js
  // somefile.js
  function sayHello() {
    console.log("Hello, world!");
  }
  
  module.exports = { sayHello };
  
  console.log("somefile has been loaded!");
  ```

  Then import it

  ```js
  // main.js
  const { sayHello } = require('./somefile.js');
  sayHello();

  // 👇 Outputs 👇
  // "somefile has been loaded!"
  // "Hello, world!"
  ```
  
  </td>
  </tr>
  <tr>
  <td><b>Scope</b></td>
  <td valign="top">
  <p>If an exported value changes in the module it was defined in, that change is visible in all modules that import this value.</p>
  For example:
  
  ```js
  // somefile.js
  let count = 1;
  export { count };
  
  setTimeout(() => count = 2, 1000);
  ```

  Now use it somewhere

  ```js
  // main.js
  import { count } from './somefile.js';
  
  console.log(count); // 1
  setTimeout(() => console.log(count), 1000); // 2
  ```
  
  </td>
  <td valign="top">
  <p>The exports are <i>copied</i> at the time of requiring the module.<br>So even if an exported value changes in the module it was defined in, that change is <b>not</b> visible in the module where it's required.</p>
  For example:
  
  ```js
  // somefile.js
  let count = 1;
  module.exports.count = count;
  
  setTimeout(() => count = 2, 1000);
  ```

  Now use it somewhere

  ```js
  // main.js
  const mod = require('./somefile.js');
  
  console.log(mod.count); // 1
  setTimeout(() => console.log(mod.count), 1000); // 1
  ```
  
  </td>
  </tr>
</tbody>
</table>

**More examples**

```js
// somefile.js
function sayHello() {
  console.log("Hello, world!");
}

console.log("somefile has been loaded!");
```

Now if we just wanted to execute this file, we could do either of the following
```js
// main.js
import './somefile.js';
// or
require('./somefile.js');
```

This will print `"somefile has been loaded!"`.

## Array Destructuring and Object Destructuring
### Array Destructuring
```js
let colors = ["red", "green", "blue"];

let [firstColor, secondColor] = colors;

console.log(firstColor); // "red"
console.log(secondColor); // "green"
```

### Object Destructuring
```js
let person = {
    name: "John Doe",
    age: 17
};

let {name, age} = person;

console.log(name); // "John Doe"
console.log(age); // 17
```

## map and filter
`map` creates a new array by transforming every element of the original array.
```js
let numbers = [1, 2, 3, 4];
let squares = numbers.map(x => x * x);
console.log(squares); // Output: [1, 4, 9, 16]
```

`filter` creates a new array by including only those elements that meet a certain condition
```js
let numbers = [1, 2, 3, 4];
let evenNumbers = numbers.filter(x => x % 2 === 0);
console.log(evenNumbers); // Output: [2, 4]
```

### Comparing to LINQ in C# world

`map` ---> `select`  
`filter` ---> `where`

## reduce
`reduce` function in JS is used to apply a function to each element in an array to reduce the array to a single output value.
```js
let numbers = [1, 2, 3, 4, 5];
let sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

console.log(sum); // Output: 15
```
- `accumulator`, accumulates the return values
- `currentValue`, is each value in the array
- The value '0' after the callback function is the initial value given to the accumulator

### Comparing to LINQ in C# world
```c#
var numbers = new List<int> { 1, 2, 3, 4, 5 };
int sum = numbers.Aggregate(0, (accumulator, currentValue) => accumulator + currentValue);

Console.WriteLine(sum); // Output: 15
```
