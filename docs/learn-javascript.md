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

**Comparing to LINQ in C# world**

`map` ---> `select`  
`filter` ---> `where`
