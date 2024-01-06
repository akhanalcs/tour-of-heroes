# Learn JavaScript Basics

## Helpful links

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
