# Learn RxJS

## Helpful links
1. [RxJS crash course](https://youtu.be/tGWBy6Vqq9w?si=dJXYCxNn9M7X1Jya)
2. [RxJS in Angular](https://youtu.be/vtCDRiG__D4?si=vNNOK_Fu5T9NFt0T)(Excellent!)
3. [Promise vs Observables vs Subjects](https://youtu.be/GSI7iyK_ju4?si=VPVLNnYZ5G0niFVd) (Excellent!)
4. [Official docs](https://rxjs.dev/guide/overview)(Excellent!)

## Basics
### Terms
- **Observable:** represents the idea of an invokable collection of future values or events.
  
  As a rule, an Observable does _nothing_ until something subscribes.
- **Observer:** is a collection of callbacks that knows how to listen to values delivered by the Observable.

<img width="650" alt="image" src="https://github.com/akhanalcs/tour-of-heroes/assets/30603497/09ca9eaa-d2dc-4599-85e8-781896ec394b">

Example:

<img width="550" alt="image" src="https://github.com/akhanalcs/tour-of-heroes/assets/30603497/cec013b0-b774-4205-8f1b-28d87a6436e4">

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

## RxJS operators
### [switchMap](https://rxjs.dev/api/operators/switchMap)
`switched` below sets up a blueprint of how data will flow when that Observable is subscribed to.
So, at the time of the `const switched = ...` line itself, no data has been produced yet. The actual data production and emitting starts only when `.subscribe()` is called on switched.

`switched` holds instructions that says: "When I am subscribed to, take each number from the source Observable, create a new Observable using of(x, x**2, x**3), and emit its values one by one. And when the next number arrives from the source, switch to a new Observable, and repeat the process".

As values are emitted from the source Observable, each value is mapped to a new "inner" Observable using the expression `of(x, x**2, x**3)`. `switchMap` then immediately subscribes to this new inner Observable.

The inner Observable starts emitting its values `(x, x**2, and x**3)`. As it does, switchMap captures those emissions and forwards them directly to the output, which is the switched Observable that we initially subscribed to. This is the "flattening" process.

When the next value arrives from the source Observable, switchMap will repeat this process: it creates and subscribes to a new inner Observable, and begins forwarding its emissions to the output.

`switchMap` is constantly "switching" its focus to the most recent inner Observable.

Think of `switchMap` like a combination of `map`, `switch` and `flat`: for each input, it applies a function (`map`), switches to a new Observable (`switch`), and merges its values into the output stream (`flat`).

```ts
import { of, switchMap } from 'rxjs';

// 👇 The type of 'const switched' is 'Observable<number>'
// 'switchMap' generates a new observable using source observable values: of(1, 2, 3)
const switched = of(1, 2, 3) // Need source observable to pipe it through
  .pipe(
    // switchMap automatically subscribes to the inner observable, flatten the resulting observable and unsubscribe
    // The "flattening" process takes values emitted by inner observable and sends them directly to the output Observable.
    switchMap(x =>
      // This is inner observable
      of(x, x ** 2, x ** 3))
  );
switched.subscribe(x => console.log(x));
// outputs
// 1
// 1
// 1
// 2
// 4
// 8
// 3
// 9
// 27
```

If the source Observable emits values at a faster pace than an inner Observable completes, switchMap will cause those in-progress inner Observables to be unsubscribed, effectively ignoring their not-yet-emitted values.

- `of(1, 1, 1)` starts emitting, but before it can finish...
- 2 arrives from the source Observable and switchMap immediately switches to `of(2, 4, 8)`, ignoring any remaining values from `of(1, 1, 1)`
- If `of(2, 4, 8)` takes too long and 3 arrives from the source Observable, `switchMap` will again switch immediately to `of(3, 9, 27)`, ignoring any remaining values from `of(2, 4, 8)`

That's why `switchMap` is often used in situations where new values should "cancel" old values, like HTTP requests in an autocomplete input where you always want results from the latest input, not older ones.

