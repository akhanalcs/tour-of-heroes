# Learn JavaScript Basics

## Helpful links
1. [Javascript Info](https://javascript.info/)(Excellent!)

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
```
No matter how the function is created, a function is a value. Both examples above store a function in the `sayHi` variable.

## Export and Import
[Read this](https://javascript.info/import-export) as this is an important concept.

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
