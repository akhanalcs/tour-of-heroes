# Learn RxJS

## Helpful links
1. [RxJS crash course](https://youtu.be/tGWBy6Vqq9w?si=dJXYCxNn9M7X1Jya)
2. [RxJS in Angular](https://youtu.be/vtCDRiG__D4?si=vNNOK_Fu5T9NFt0T)(Excellent!)
3. [Promise vs Observables vs Subjects](https://youtu.be/GSI7iyK_ju4?si=VPVLNnYZ5G0niFVd) (Excellent!)
4. [Official docs](https://rxjs.dev/guide/overview)(Excellent!)

## Basics
- **Observable:** represents the idea of an invokable collection of future values or events.
  
  As a rule, an Observable does _nothing_ until something subscribes.
- **Observer:** is a collection of callbacks that knows how to listen to values delivered by the Observable.

[Reference](https://rxjs.dev/guide/overview)

### Example using `of`
`of` converts the arguments to an observable sequence.

For example: Emit the values `10`, `20`, `30`.
```ts
import { of } from 'rxjs';

of(10, 20, 30)                                  // <--- Observable
  .subscribe({                                  // <--- Observer
    next: value => console.log('next:', value),
    error: err => console.log('error:', err),
    complete: () => console.log('the end'),
  });

// Outputs
// next: 10
// next: 20
// next: 30
// the end
```

[Reference](https://rxjs.dev/api/index/function/of)

## The big picture
<img width="650" alt="image" src="https://github.com/akhanalcs/tour-of-heroes/assets/30603497/cf35a3e0-3479-4050-9379-5beef102bba5">

Pipe

<img width="650" alt="image" src="https://github.com/akhanalcs/tour-of-heroes/assets/30603497/c68ddf95-a4c9-4aeb-a8ab-f9d44179ba29">

### Terminology
- Observable is something that emits data
- Operators operate on data that Observable emits
- Assembly line of operators is known as the pipe
- Observer deals with conclusion of the pipeline, like the data or error received at the end of the pipe

## Example
### Create Observable
Create a new project folder named, for eg: `rxjs-learn`, start a new node project and install rxjs on it
```bash
// This will create a package.json file
npm init -y
npm install rxjs
```

Create a new file called `index.js`
```js
// Import Observable class from rxjs
const { Observable } = require("rxjs");

const observable = new Observable((subscriber) => {
  subscriber.next(10); // This observable just emits 10 as data
});
```

### Create Observer
```js
const observer = {
  // Case when observer gets the data and everything goes well and we want to process it in some way
  next: (x) => console.log("Observer got a next value: " + x),
  // Case when error happens
  error: (err) => console.error("Observer got an error: " + err),
  // Case when observable notifies completion
  // For example if observable has this: "subscriber.complete()", then you'll end up here
  // "subscriber.complete()" kinda says "hey we are completely done emitting data from our observable" 
  complete: () => console.log("Observer got a completion notification")
};
```

Connect the observer with observable 
```js
observable.subscribe(observer)
```

Let's run the program now and see the output
```bash
node index // <-- OUTPUTS: "Observer got a next value: 10"
```

### Create Pipe and Operators
Create some test data
```js
const users = {
  data: [
    {
      id: 1,
      status: "active",
      age: 14,
    },
    {
      id: 2,
      status: "inactive",
      age: 12,
    },
    {
      id: 3,
      status: "active",
      age: 42,
    }
  ]
};
```

Create pipe
```js
const observable = new Observable((subscriber) => {
  subscriber.next(users);
}).pipe(...put operators here)
```
Now instead of the data flowing directly to the observer, the observable is going to send data to the pipe where the operators are going to operate on it, and the last operator will send the data to the observer.

Get operators
```js
const { pluck, map, filter } = require("rxjs/operators");
```

Use the operators
```js
const observable = new Observable((subscriber) => {
  subscriber.next(users);
}).pipe(
  // Grab/ pluck the object property "data" from users.data
  pluck("data"),
  // If the data array has length less than 10, the whole data is filtered out
  // So to proceed further in the pipeline, the length of the data array must be greater than or equal to 2
  filter((users) => users.length >= 2),
  // Only pass users with status as active to the next operator
  map((users) => {
    return users.filter((user) => user.status === "active");
  }),
  // Find the average age of users
  // The callback of reduce function: (sum, user) => sum + user.age, 0
  // Reduce the array to "sum"
  // "user" is the current element of the array
  // 0 is the initial value of "sum"
  map((users) => {
    return users.reduce((sum, user) => sum + user.age, 0) / users.length;
  }),
  map((average) => {
    if (average < 18) throw new Error(`Average age is too small (${average})`);
    else return average;
  }),
  map((average) => `The average age is ${average}`)
);
```
