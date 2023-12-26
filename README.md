# tour-of-heroes
Learning Angular with Tour of Heroes tutorial from Angular docs.

I'll be following along this tutorial: https://angular.io/tutorial/tour-of-heroes

Agenda for today:
angular ssr with aspnet core backend - https://pieterjandeclippel.medium.com/server-side-rendering-in-asp-net-core-angular-2024-version-a617a83324a1
https://github.com/thecloudnativewebapp/GoCloudNative.Bff
https://timdeschryver.dev/blog/lets-make-our-spa-more-secure-by-setting-up-a-net-bff-with-duende-and-auth0#resources


TS handbook
tour of heroes
node tutorial

cook rice at 2

Go to asian market to get pearl river bridge mushroom dark soy sauce

https://damienbod.com/2023/09/11/implement-a-secure-web-application-using-nx-standalone-angular-and-an-asp-net-core-server/
https://damienbod.com/2023/09/11/implement-a-secure-web-application-using-nx-standalone-angular-and-an-asp-net-core-server/

## Helpful links
1. [Full stack web dev in Rider](https://www.jetbrains.com/guide/dotnet/tips/full-stack-web-development-with-rider/)
2. Envato Tuts+'s [Angular tutorial](https://youtu.be/JWhRMyyF7nc?si=3mllCIMx1v5PTJZw)

## Learn Typescript
https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-oop.html  
https://www.typescriptlang.org/docs/handbook/intro.html

The above links are EXCELLENT! Read them!

### Prototype chain
When you create an object using the new keyword and a constructor function, a link is established between the new object (for eg: `john` shown below) and the prototype object of the constructor function (`Person.prototype`). This link forms part of what we call the prototype chain.

```js
function Person(name) {
  this.name = name;
}

let john = new Person("John");

console.log(john.__proto__ === Person.prototype); // Outputs: true
console.log(Object.getPrototypeOf(john) === Person.prototype); // Outputs: true
console.log(john.__proto__.constructor === Person); // Outputs: true
```
`john.__proto__` is the same as `Person.prototype`, which means `Person.prototype` is indeed in `john`'s prototype chain.
JavaScript sets up a link in the prototype chain from `john` all the way up to `Object.prototype`, through `Person.prototype`.

### type predicate
```ts
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```
`pet is Fish` is our type predicate in this example. A predicate takes the form `parameterName is Type`, where `parameterName` must be the name of a parameter from the current function signature.

`pet is Fish` is a special syntax in TypeScript that lets the type checker in TS compiler know that `isFish`, when called, will perform a runtime check that narrows `pet` to `Fish` type if the function returns `true`, and excludes `Fish` from the possible types of `pet` when `false` is returned.

The real runtime return type of `isFish` function is boolean.

```ts
// Both calls to 'swim' and 'fly' are now okay.
let pet = getSmallPet(); // Type of pet here is: let pet: Fish | Bird
 
if (isFish(pet)) {
  pet.swim(); // Type of pet here is: let pet: Fish
} else {
  pet.fly(); // Type of pet here is: let pet: Bird
}
```
### Discriminated Unions
A discriminated union in TypeScript is a pattern where each type in a union type has a common property (each with a literal type) that can uniquely identify each type possible in the union.

```ts
interface Circle {
  kind: "circle";
  radius: number;
}
 
interface Square {
  kind: "square";
  sideLength: number;
}
 
type Shape = Circle | Square;
```

In above example, `kind` is known as the discriminant, and the specific strings "circle" and "square" are the literal types.

It can be used in a function that looks like
```ts
function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape; // The type of shape is "never" here because we've already checked all the possible types
      return _exhaustiveCheck;
  }
}
```

### Function overloads (just use [Generic functions](https://www.typescriptlang.org/docs/handbook/2/functions.html#generic-functions) instead)
```ts
function fn(x: string): void; // <---- OVERLOAD SIGNATURE
function fn() {               // <---- IMPLEMENTATION SIGNATURE
  // ...
}
// Expected to be able to call with zero arguments
fn();                         // <---- ERROR: Expected 1 arguments, but got 0.
```
The signature used to write the function body can’t be “seen” from the outside.

The signature of the implementation is not visible from the outside. When writing an overloaded function, you should always have two or more signatures above the implementation of the function.
The implementation signature must also be compatible with the overload signatures.

This is better
```ts
function len(x: any[] | string) {
  return x.length;
}
len(""); // OK
len([0]); // OK
len(Math.random() > 0.5 ? "hello" : [0]); // OK
```
than
```ts
function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
  return x.length;
}
len(""); // OK
len([0]); // OK
len(Math.random() > 0.5 ? "hello" : [0]); // NOT OK
```

Always prefer parameters with union types instead of overloads when possible.

### Rest parameters
The rest parameter syntax allows a function to accept an indefinite number of arguments as an array, providing a way to represent variadic functions in JavaScript.

A rest parameter appears after all other parameters, and uses the ... (spread) syntax.
```ts
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
// 'a' gets value [10, 20, 30, 40]
const a = multiply(10, 1, 2, 3, 4);
```

### Destructuring assignment
The destructuring assignment syntax is a JavaScript expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variables.
```js
let a, b, rest;
[a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(a);
// Expected output: 10
console.log(rest);
// Expected output: Array [30, 40, 50]
```

Example in TS
```ts
type ABC = { a: number; b: number; c: number };
function sum({ a, b, c }: ABC) {
  console.log(a + b + c);
}
sum({ a: 1, b: 2, c: 3});  // Outputs: 6
```

### Function Type Declaration vs Literal Function Definition
**Declaration:** Just declare something. Tell compiler about the existence of a variable or a function, its type and its name but don't allocate or assign anything to it. 
```ts
function sayHello(): void;
```
**Definition:** Declare + Provide Implementation.
```ts
function sayHello(): void {
  console.log("Hello");
}
```
#### Function Type Declaration aka Function Type Expression
Declaration and Implementation separate

Eg:
```ts
let greet: (a: string) => void; // Declare a variable with a specific function type.
```
Assign a function to `greet`, it becomes a function definition because now `greet` refers to a specific function implementation:
```ts
greet = (name) => {
  console.log(`Hello, ${name}!`);
};
```
#### Literal Function Definition aka Named Function Definition
Declaration + Implementation

Function is given a name directly up front.
```ts
function greet(name: string): void {
  console.log(`Hello, ${name}!`);
}
```

### Index signatures
Here, `[index: number]: string;` means that the StringArray interface represents an object which can be indexed by a number, and that will return a string.

This index signature states that when a `StringArray` is indexed with a `number`, it will return a `string`.

```ts
interface StringArray {
  [index: number]: string;
}
 
const myArray: StringArray = ["Bob", "Fred"];
const secondItem = myArray[0]; // outputs: Bob
```

It is possible to support both types of indexers, but the type returned from a numeric indexer must be a subtype of the type returned from the string indexer.

For eg:
```ts
interface Animal {
  name: string;
}
 
interface Dog extends Animal {
  breed: string;
}
```

But this is not Ok
```ts
// Error: indexing with a numeric string might get you a completely separate type of Animal!
interface NotOkay {
  [x: number]: Animal;
  // 'number' index type 'Animal' is not assignable to 'string' index type 'Dog'.
  [x: string]: Dog;
}
```
Because
```ts
// It expects that indexing with a number should give you an Animal, but indexing with a "number" gives you a Dog, which aren't the same thing.
let animal = obj[0]; // Same as obj["0"]
let dog = obj["0"];
```

This is Ok though
```ts
interface Okay {
  [x: number]: Dog; // Type returned from Numeric indexer must be a subtype of the type returned from the string indexer
  [x: string]: Animal; // Remembering Tip: The string index "wins" 👑 and since Dog is assignable to animal, this is fine.
}
```

Because
```ts
// It expects that indexing with a number should give you a Dog, but indexing with a "number" gives you an Animal, which are the same things. 
let dog = obj[0]; // Expect Dog // Same as obj["0"]
let animal = obj["0"]; // Expect animal
```

In conclusion, Type returned from a numeric indexer must be assignable to type returned from the string indexer.

### Tuple Types
A tuple type is another sort of `Array` type that knows exactly how many elements it contains, and exactly which types it contains at specific positions.
```ts
type StringNumberPair = [string, number];
```
`StringNumberPair` describes arrays whose `0` index contains a `string` and whose `1` index contains a `number`.

We can use it something like this
```ts
function doSomething(pair: [string, number]) {
  const a = pair[0]; // const a: string
  const b = pair[1]; // const b: number
  // ...
}
 
doSomething(["hello", 42]);
```

### [Using Class Types in Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html#using-class-types-in-generics)
When creating factories in TypeScript using generics, it is necessary to refer to class types by their constructor functions. For example
```ts
// Takes constructor function as a parameter and use it to create and return a new instance of Type
function create<Type>(c: { new (): Type }): Type {
  return new c();
}
```
`c: { new (): Type }` means that `c` is a constructor function that, when called with `new` will return an instance of `Type`.  
And `new c()` is where the constructor of c is invoked to create an instance of type `Type`.

```ts
// Same as above
function create<Type>(c: new() => Type): Type {
  return new c();
}
```

You can use that like
```ts
class Dog {
    bark() {
        return 'Woof!';
    }
}

let myDog = create(Dog); // <---------------------- CALLING THE CREATE FUNCTION HERE
console.log(myDog.bark()); // Outputs: 'Woof!'
```

### `keyof` type operator
```ts
type Mapish = { [k: string]: boolean };
type M = keyof Mapish;
```
Here type of M is `string | number` even when we specified index signature of type string. 

Why this happens?  
When we define a type like `{ [k: string]: boolean }`, we tell TypeScript that an object of this type can be indexed with any string. Because number indexes are implicitly converted to strings in JavaScript, TypeScript accepts that these objects can also be indexed with numbers.

Use it like this
```ts
let map: Mapish = {};

map["test"] = true;
map[1] = true; // This becomes map["1"] because JS coerces number keys to strings

// OR
let strKey: M = "test";
let numKey: M = 1;

map[strKey] = true;
map[numKey] = true;
```

### Indexed Access Type
We can use indexed access type to lookup a specific property on another type.

For eg:
```ts
type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"]; // Age is now of type number

let john: Person = { age: 21, name: 'John', alive: true };
let johnAge: Age = john.age; // johnAge is a number

console.log(johnAge); // Outputs: 21
```

Another example
```ts
const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];
 
type Person = typeof MyArray[number];
/*
// Type of Person is this:
type Person = {
    name: string;
    age: number;
}
*/
```
`MyArray[number]` is essentially saying "If I have an array (like MyArray), and I access an item in that array at some arbitrary index (which is a number), what will be the type of item I get?"

Essentially, `type Person = typeof MyArray[number];` is a nice shorthand to extract the type of a single item in an array literal.

### Inferring with Conditional Types
Consider below example that's defining a generic type alias that extracts the return type from a function type.
```ts
// "infer Return" is asking TS to figure out the return type of the function.
type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
  ? Return
  : never;
 
type Num = GetReturnType<() => number>; // type Num = number
type Str = GetReturnType<(x: string) => string>; // type Str = string
type Bools = GetReturnType<(a: boolean, b: boolean) => boolean[]>; // type Bools = boolean[]
```
In TS, `never` represents a value that never occurs.
`...args: never[]` means it's an array of something that could never occur, essentially leaving function arguments as a non-factor in the type-checking process. It treats the function parameters as if they're irrelevant to the type manipulation at hand, which is getting the return type of function.

- `Type extends (...args: never[]) => infer Return` is an assertion that `Type` represents a function. It asks "can `Type` be assigned to a function type?".
- `(...args: never[]) => infer Return` represents a function with any number and types of arguments and any return type.

### Distributive Conditional Types
Type of `StrArrOrNumArr` below is (`string | number)[]`.

```ts
type ToArray<Type> = Type[];
type StrArrOrNumArr = ToArray<string | number>; // type of StrArrOrNumArr is "string | number)[]"
```

But let's say we want `(string[] | number[])` (typical behavior).
```ts
type ToArray<Type> = Type extends any ? Type[] : never;
type StrArrOrNumArr = ToArray<string | number>; // type of StrArrOrNumArr is "string[] | number[]"
```

Conditional types are distributive over union types, which essentially means if a generic Type is a union type, the conditional type will be applied to each member of that union.

So, the construct `Type extends any ? Type[] : never` is a particular pattern used to "distribute" across union types and apply some type transformation to each member of the union, rather than treating the union as a single type.

### Mapped Types
Mapped Type is a generic type which uses a union of `PropertyKey`s to iterate through keys to create a type.

Consider an application where you have a set of features that can be either enabled or disabled. Each feature is linked to a function (like `darkMode`, `newUserProfile` etc.), and you need an easy way to track whether each feature is currently turned on or off.
```ts
type Features = {
  darkMode: () => void;
  newUserProfile: () => void;
};
```
Instead of manually creating a new type like:
```ts
type FeatureOptions = { darkMode: boolean; newUserProfile: boolean; }; 
```
which you'd need to update every time a feature is added, you could use a mapped type to automatically create this type for you based on the `Features` type.

Create a mapped type
```ts
// "keyof Type" generates a union of the keys of "Type"
// For eg below: "keyof Features" would be a union: "darkMode" | "newUserProfile"
// "Property" is a placeholder for each key in the given "Type".
// "[Property in keyof Type]: boolean" generates new properties based on "Type" where each property is a boolean.
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};
```
and use it to create a new type that has every property from `Features` mapped to a boolean
```ts
type FeatureOptions = OptionsFlags<Features>; // type of FeatureOptions is { darkMode: boolean; newUserProfile: boolean; }
```

### Mapping Modifiers
```ts
// Removes 'readonly' attributes from a type's properties
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};
 
type LockedAccount = {
  readonly id: string;
  readonly name: string;
};
 
type UnlockedAccount = CreateMutable<LockedAccount>; // type of "UnlockedAccount" is { id: string; name: string; }
```

- `[Property in keyof Type]` is the syntax for a mapped type. It means "for each property in Type".
- `Type[Property]` is an indexed access, or lookup type. It means the type of the property `Property` in `Type`.

### Union Types vs Intersection Types
#### Intersection Types (&)
Intersection types are used to combine multiple types into one. The resulting type has all the properties of the combined types.
```ts
type Name = {
  name: string;
};

type Age = {
  age: number;
};

type Person = Name & Age; 
// Equivalent to: 
// type Person = {
//   name: string;
//   age: number;
// }
```

Another example
```ts
let value: string & number;   // Error: Type 'string & number' is reduced to 'never'.
```

`string & number` is an intersection type which would require a value to be both a string and a number at the same time which is impossible.

#### Union Types (|)
Union types are used when a value can be one of several types. A union type declaration has the form Type1 | Type2 | ... | TypeN.
```ts
type StringOrNumber = string | number;

let variable: StringOrNumber;

variable = 'Hello'; // OK
variable = 123;     // OK
variable = true;    // Error: Type 'boolean' is not assignable to type 'string | number'
```

In a nutshell, union types (|) are about _adding_ different types together, saying "the value is either this type or that type", whereas intersection types (&) are about _melding_ types together into one combined type.

### Key remapping via `as`
```ts
type Getters<Type> = {
    [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]
};
 
interface Person {
    name: string;
    age: number;
}
 
type LazyPerson = Getters<Person>; // type of "LazyPerson" is "{ getName: () => string; getAge: () => number; }"
```
`&` is the intersection operator and is used to combine multiple types into one.

`Capitalize<string & Property>` is saying "ensure Property is considered a string and capitalize it". In actuality, `keyof` always produces a string or number or symbol, so the intersection with string isn't strictly necessary here.

If in some imaginary scenario `Property` wasn't a string, `string & Property` wouldn't fall back to string or some default, it would resolve to never, which would make `Capitalize<never>` also `never` and `get${Capitalize<never>}` converts to `getNever`.

The Capitalize utility type is a built-in TypeScript type that transforms the first letter of a string literal type to a capital letter.

### Map over arbitrary unions
You can map over arbitrary unions, not just unions of `string | number | symbol`, but unions of any type:

For eg:  
Different event types that the program can respond to might be defined as below. These types often have a `kind` property to distinguish between different kinds of events.
```ts
type SquareEvent = { kind: "square", x: number, y: number };
type CircleEvent = { kind: "circle", radius: number };
```

Now, using the `EventConfig` type (explanation of this is [below](#explanation-of-eventconfig)),
```ts
type EventConfig<Events extends { kind: string }> = {
    [E in Events as E["kind"]]: (event: E) => void;
}
```
a `Config` type specific to these events can be generated
```ts
type Config = EventConfig<SquareEvent | CircleEvent>
```

The above line will generate a type that looks like
```ts
type Config = {
  square: (event: SquareEvent) => void;
  circle: (event: CircleEvent) => void;
};
```

Now we can use the `Config` type to implement an event handlers map
```ts
let eventHandlers: Config = {
    square: (event: SquareEvent) => {
        console.log(`A square was drawn at (${event.x}, ${event.y})`);
    },
    circle: (event: CircleEvent) => {
        console.log(`A circle was drawn with radius ${event.radius}`);
    }
};
```

So if your application triggers a SquareEvent:
```ts
let newSquareEvent: SquareEvent = { kind: "square", x: 10, y: 20 };

// Trigger the event handler for "square".
eventHandlers[newSquareEvent.kind](newSquareEvent);
```

After running this code, you would see _"A square was drawn at (10, 20)"_ printed to the console, because the corresponding event handler for the square kind is called.

#### Explanation of EventConfig
```ts
type EventConfig<Events extends { kind: string }> = {
    [E in Events as E["kind"]]: (event: E) => void;
}
```

Here `Events` is used like "**types** of thing that can happen to which the program might need to respond".
For eg: It refers to types of `SquareEvent` and `CircleEvent`.

- `Events`(plural) is used to suggest that this type parameter can represent multiple "event" types, typically in a union.
- `Events extends { kind: string }` is a constraint on the `Events` type variable. It means whatever type is provided must have a property named kind that is of type string.
- `E in Events` is part of mapped types (a way to create new types based on old ones). It's like mapping over a list except it's mapping over the properties in a type. It's iterating over each member of the `Events` union.
- `[E in Events as E["kind"]]` maps over `Events`, and for each type in the union (for eg: `SquareEvent`, `CircleEvent`), it uses the value of the kind property as the key. So each key in the new `EventConfig` type will be a string representing the kind of the event.
- `(event: E) => void` means that for each E in Events, the corresponding property is a function that takes an argument of type E and doesn't return anything.

### [Mapped Type using conditional type](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#further-exploration)
[Read this](https://stackoverflow.com/q/77688517/8644294) for a great example.

### [Template literal types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#string-unions-in-types)
Consider this code where a function (`makeWatchedObject`) adds a new function called `on()` to a passed object.
```ts
type PropEventSource<Type> = {
    on(eventName: `${string & keyof Type}Changed`, callback: (newValue: any) => void): void;
};

/// IMPORTANT NOTE: Create a "watched object" with an `on` method
/// so that you can watch for changes to properties.
declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;

const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26
});

// Just calling the on method created by makeWatchedObject function definition
person.on("firstNameChanged", () => {});
 
// Prevent easy human error (using the key instead of the event name)
person.on("firstName", () => {});
```

When you view the emitted JS from this, it looks like this

<img width="900" alt="image" src="https://github.com/akhanalcs/tour-of-heroes/assets/30603497/96383584-80f8-45bf-bb6a-89a5ef53585e">

Notice that the type and function declaration don't exist in the transpiled code (shown on the right hand side).  
TypeScript's static types are only used at design type for type checking and don't have real values at runtime.

And when you try to run it, you get errors

<img width="300" alt="image" src="https://github.com/akhanalcs/tour-of-heroes/assets/30603497/c315cdee-4012-41a6-aac8-c70d2def13b0">

This means that the function declaration is just describing how `makeWatchedObject` looks like. We need to have an actual definition of `makeWatchedObject` function that applies the described behavior.

#### Code explanation
```ts
type PropEventSource<Type> = {
    on(eventName: `${string & keyof Type}Changed`, callback: (newValue: any) => void): void;
};
```
`PropEventSource<Type>` is a type that declares a method called `on`. The method takes 2 parameters: `eventName`, which is a string composed of the name of a property from Type with "Changed" appended on it, and `callback`, which is a function that accepts any value. The `on` method returns nothing(`void`).

```ts
declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;
```
This is a function declaration. It is declared to accept an object of any type `T`. It return an object that as the complete set of properties from `T` as well as methods declared in `PropEventSource<Type>` which is denoted by the intersection type `Type & PropEventSource<Type>`.

This is how `&` looks like

<img width="300" alt="image" src="https://github.com/akhanalcs/tour-of-heroes/assets/30603497/368819e4-39a5-46e6-a861-7cd2a3728fff">

#### How the code works (see below section for a simpler example)
When this runs
```ts
const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26
});
```

It'll transform `person` into below (essentially adding `on` method)
```ts
const person = {
  firstName: "Saoirse", 
  lastName: "Ronan", 
  age: 26,
  on(eventName: "firstNameChanged" | "lastNameChanged" | "ageChanged", callback: (newValue: any) => void): void {
    // This is executed when you do person.on(...)
    // Here is where "makeWatchedObject" function will add logic to bind the eventName to the callback
  }
};
```

And to specify the event name and callback, you do this
```ts
person.on("firstNameChanged", (newValue) => {
  console.log(`firstName was changed to ${newValue}!`);
});
```

#### Simpler example based on above code
Given this type
```ts
type PropEventSource<Type> = {
    on(eventName: `${string & keyof Type}Changed`, callback: (newValue: any) => void): void;
};
```

Let's consider this object
```ts
const myObj = {
  name: "something"
}
```

Create an event map
```ts
// Create an event map to store the event callback
const eventMap = {};
```

Let's create an object of type `PropEventSource<typeof myObj>`
```ts
// Define an object that matches the PropEventSource pattern for 'myObj'.
const myProppedObj: PropEventSource<typeof myObj> = {
  on(eventName: "nameChanged", callback: (newValue: any) => void) {
    eventMap[eventName] = callback; // bind the callback to the event name.
  }
};
```

Use the `on` method
```ts
myProppedObj.on('nameChanged', (newValue) => {console.log(newValue)});
```

Now this event can be triggered somewhere in the code, for example like when `myObj.name` is changed at which point you can do this
```ts
if(eventMap['nameChanged']) {
  eventMap['nameChanged'](myObj.name);
}
```

### Initialization Order in JS vs CS
| JS Initialization Order                  	| C# Initialization Order                  	|
|------------------------------------------	|------------------------------------------	|
| The base class fields are initialized    	| The derived class fields are initialized 	|
| The base class constructor runs          	| The base class fields are initialized    	|
| The derived class fields are initialized 	| The base class constructor runs          	|
| The derived class constructor runs       	| The derived class constructor runs       	|
| Reference](https://www.typescriptlang.org/docs/handbook/2/classes.html#initialization-order) | [Reference](https://stackoverflow.com/a/140541/8644294) |

### [`protected` access modifier](https://www.typescriptlang.org/docs/handbook/2/classes.html#protected)
`protected` members are only visible within the class and its subclasses.

For eg:
```ts
class Greeter {
  public greet() {
    console.log("Hello, " + this.getName());
  }
  protected getName() {
    return "hi";
  }
}

class SpecialGreeter extends Greeter {
  public howdy() {
    // OK to access protected member here
    console.log("Howdy, " + this.getName());
  }
}
const g = new SpecialGreeter();
g.greet(); // OK
g.getName(); // NOT OK
// ^^^ This will throw this error: Property 'getName' is protected and only accessible within class 'Greeter' and its subclasses.
```

### [Static blocks in classes](https://www.typescriptlang.org/docs/handbook/2/classes.html#static-blocks-in-classes)
A static block serves a specific purpose in a class. It is used to execute a block of code when the class is first initialized.

- Static blocks have their independent **scope**. Variables declared within them are not visible to the rest of the class.
- Static blocks are executed only once when the class is initialized (compare that to constructors which gets called every time we create an instance of a class).
- Static blocks can access and modify private static fields within the class, allowing for complex initialization logic for these fields without exposing this logic elsewhere in the class.

```ts
class Foo {
    static #count = 0;
 
    get count() {
        return Foo.#count;
    }
 
    static {
        try {
            const lastInstances = loadLastInstances();
            Foo.#count += lastInstances.length;
        }
        catch {}
    }
}
```

### Type parameters in Static members
```ts
class Box<Type> {
  static defaultValue: Type; // ERR: Static members cannot reference class type parameters.
}
```

Remember that types are always fully erased! At runtime, there’s only one `Box.defaultValue` property slot (no matter how many instances of `Box<Type>` you have).

This means that setting `Box<string>.defaultValue` (if that were possible) would also change `Box<number>.defaultValue` - not good. The `static` members of a generic class can never refer to the class’s type parameters.

### `this` at Runtime in Classes
```ts
class MyClass {
  name = "MyClass";
  getName() {
    return this.name;
  }
}
const c = new MyClass();
const obj = {
  name: "obj",
  getName: c.getName,
};
 
// Prints "obj", not "MyClass"
console.log(obj.getName());
```

**Why that happened?**

The value of `this` inside a function depends on how the function was called. In this example, because the function was called through the `obj` reference, its value of this was `obj` rather than the class instance.

Consider another example
```ts
class MyClass {
  name = "MyClass";
  getName(this: MyClass) {
    return this.name;
  }
}
const c = new MyClass();
// OK
c.getName();
 
// Error, would crash
const g = c.getName;
console.log(g()); // ERR: The 'this' context of type 'void' is not assignable to method's 'this' of type 'MyClass'.
```

In a method or function definition, an initial parameter named `this` has special meaning in TypeScript. These parameters are erased during compilation. TypeScript checks that calling a function with a `this` parameter is done so with a correct context.

**Why the error?**

In JS and TS when you assign a method like `c.getName` to a variable `g` and then try to invoke it as `g()`, the context of `this` is lost.
When `g()` is called, `this` no longer points to the `MyClass` instance. Instead, it refers to the undefined global object (in strict mode) or the window object (in non-strict mode).

`void` is the type of this when calling `g()`. The type `void` is not assignable to type `MyClass` (as expected by `getName`), hence the error.

### [Parameter Properties](https://www.typescriptlang.org/docs/handbook/2/classes.html#parameter-properties)
Shorthand for Property declaration and initialization in TS classes.

This is exactly the same
```ts
class FileRep {
  constructor(path: string, public content: string) {
  }
}
```

as this
```ts
class FileRep{
  content: string
  constructor(path: string, content: string) {
    this.content = content;
  }
}
```

TypeScript offers special syntax for turning a constructor parameter into a class property with the same name and value. These are called parameter properties and are created by prefixing a constructor argument with one of the visibility modifiers `public`, `private`, `protected`, or `readonly`.

### [`this` based type guards](https://www.typescriptlang.org/docs/handbook/2/classes.html#this-based-type-guards)
```ts
class FileSystemObject {
  isFile(): this is FileRep {
    return this instanceof FileRep;
  }
  //... other code here
  constructor(public path: string, private networked: boolean) {}
}
```
`this is FileRep` is a type guard that is used in _return position_ for methods. It tells TypeScript that, within the scope where `isFile()` returns true, `this` should be treated as `FileRep`.

`isFile()` checks if the object it's called on (`this`) is an instance of `FileRep` with `this instanceof FileRep`. If it returns true, TypeScript will then consider `this` as `FileRep` for the rest of the current scope.

`this instanceof FileRep` is a runtime check that returns true if the `this` object is an instance of the `FileRep` class.

#### Use case: Lazy validation of a particular field
This case removes an `undefined` from the value held inside box when `hasValue` has been verified to be true.
```ts
class Box<T> {
  value?: T;
 
  hasValue(): this is { value: T } {
    return this.value !== undefined;
  }
}

const box = new Box();
box.value = "Gameboy";

// Here the type of value property is:
// (property) Box<unknown>.value?: unknown
box.value;

if (box.hasValue()) {
  // Here the type of box is:
  // Box<unknown> & {
       value: unknown;
  // }
  // The type of value is:
  // value: unknown
  // Here the value is not "undefined"
  box.value;
}
```

`Box<unknown>` represents the box object as an instance of `Box` class, but we don't know what type `T` is (hence `unknown`).
```ts
  Box<unknown> & {
    value: unknown;
  }
```
This type means: "`Box<unknown>` (where value can possibly be undefined) INTERSECTED WITH (&) an object where the property value is known to be defined (non-undefined)."

Due to the intersection (&), TypeScript merges these two definitions, essentially telling it "treat this as a `Box<unknown>`, but also consider that value is definitely defined within this scope."

### Passing Constructor as Parameters to Methods
There are 2 ways to do this
1. Using `ctor: typeof ClassName`
2. Using `ctor: new () => ClassName`

Example:
```ts
class MyTest{
  myMethod() {
    return 'Hello!';
  }
}

// First way
function func1(ctor: typeof MyTest) {
  const instance = new ctor();
  console.log(instance.myMethod());
}

// Second way
function func2(ctor: new () => MyTest) {
  const instance = new ctor();
  console.log(instance.myMethod());
}

// Test it
func1(MyTest); // Logs: "Hello!"
func2(MyTest); // Logs: "Hello!"
```









## Learn Angular fundamentals
[Angular in 2 minutes](https://youtu.be/Y2i6U1L6oyM?si=ld3SFvAalG2-mHz5)  
[What is Angular (Great overview!)](https://angular.io/guide/what-is-angular)

## Standalone vs NgModule pattern
[Great overview video](https://youtu.be/x5PZwb4XurU?si=Fuv2gWyfMMqh_f1S)  
[Standalone vs NgModule pattern](https://angular.io/guide/what-is-angular#organization)  
[Standalone components](https://angular.io/guide/standalone-components)

Angular apps are composed of components. Until now, devs have had to create or update an existing ngmodule in order to use a freshly created component.

Ng modules (feature modules) have been used to specify which components, directives, and pipes are available to use in templates.
```ts
@Component({
  selector: 'name-card',
  template: `
    <mat-card *ngIf="name">
      <h2>Hello, {{ name | titlecase }}!</h2>
    </mat-card>
  `
})
export class NameCardComponent {
  @Input() name = 'non standalone angular'
}

@NgModule({
  declarations: [NameCardComponent],
  imports: [CommonModule, MatCardModule],
  exports: [NameCardComponent]
})
class NameCardModule {}
```

The new standalone API makes it possible to write angular components, directives, and pipes without creating an associated ng module.
Standalone components are self contained and directly manage their template dependencies.

The focus shifts from ng modules to components.

```ts
@Component({
  selector: 'name-card',
  template: `
    <mat-card *ngIf="name">
      <h2>Hello, {{ name | titlecase }}!</h2>
    </mat-card>
  `
  imports: [CommonModule, MatCardModule],
  standalone: true
})
export class NameCardComponent {
  @Input() name = 'standalone angular'
}
```

## Local setup
Reference: https://angular.io/guide/setup-local

### Setup Node
Node.js is a JavaScript-based runtime environment that executes JS code outside of a web browser. You can use it to create web-servers and networked applications. You can also use it to perform helpful tasks on your computer such as concatenating and minifying JavaScript files and compiling Sass files into CSS.

NPM is a “package manager” that makes installing Node “packages” fast and easy. A package, also called a module, is just a code library that extends Node by adding useful features. For example, the “request” module simplifies the process of making HTTP requests so you can easily get web resources from other sites.

NPM is installed when you install Node.js.

### Uninstall old node
Find the node (below command shows you the location of the file for a given command)
```bash
which node
```
<img width="450" alt="image" src="https://github.com/akhanalcs/angular-dotnet-realworld/assets/30603497/d91e2ed4-40ca-4459-b9a2-bb14911856ae">

Now remove that
```
sudo rm -rf /usr/local/bin/node
```

Also remove these files and folders
```bash
sudo rm -rf ~/.npm ~/.npm-global ~/.node-gyp ~/.npmrc ~/.node_repl_history

sudo rm -rf /usr/local/bin/npm /usr/local/bin/npx

sudo rm -rf /usr/local/share/man/man1/node*
sudo rm -rf /usr/local/share/doc/node
sudo rm -rf /usr/local/share/systemtap/tapset/node.stp

sudo rm -rf /usr/local/include/node
sudo rm -rf /usr/local/lib/node_modules /usr/local/lib/dtrace/node.d
```

[Reference](https://stackoverflow.com/a/62356228/8644294)

### Install nvm
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.6/install.sh | bash
```

Make your terminal pick up the nvm command that was set by the installation in your `~/.bash_profile` file
```bash
. ~/.bash_profile
```
This is called sourcing and it executes commands from the file (`.bash_profile` here) in the current shell environment. This will pick up the changes to your profile without having to close and reopen the terminal.

Now check your `nvm` version

<img width="400" alt="image" src="https://github.com/akhanalcs/angular-dotnet-realworld/assets/30603497/8ab6cd22-8492-49f0-95b5-8d355ff2aa8d">

Later when you want to **uninstall** `nvm` do the following
```bash
$ rm -rf "$NVM_DIR"
```

Edit `~/.bash_profile` and remove the lines below
```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
[[ -r $NVM_DIR/bash_completion ]] && \. $NVM_DIR/bash_completion
```

[Reference](https://github.com/nvm-sh/nvm#installing-and-updating)

### Install node
Install the latest lts version.
```bash
nvm install --lts
```

<img width="650" alt="image" src="https://github.com/akhanalcs/angular-dotnet-realworld/assets/30603497/56703672-6285-4a8e-b984-bb17299ae7e7">

Now check it  
<img width="450" alt="image" src="https://github.com/akhanalcs/angular-dotnet-realworld/assets/30603497/3fd706e0-16c8-4954-a49c-9a1b52ffb9be">

[Reference](https://heynode.com/tutorial/install-nodejs-locally-nvm/)

## npm vs npx
### npm
It is used to install, update, and manage packages from the npm registry in your projects or globally on your machine.  
For eg:
```bash
npm install --save-dev --save-exact prettier
```
### npx
`npx` is typically thought of as 'npm execute'. It allows you to run packages.

For eg:
```bash
npx prettier --write somefile.js
```
or
```bash
npx tsc -v // To view the Typescript version that's installed as your dev dependency
```

It first looks into your local project's dependencies for a command. If it can't find it locally, then it searches in globally installed packages. And if it can't find it there either, npx will temporarily download, use, and remove the package - helping ensure you use the latest version all the time without needing to permanently install it.

## Setting up your IDE
I'm using Jetbrains Rider. It already comes with the features present in WebStorm so I don't have to use a separate IDE for doing full stack work.

<img width="600" alt="image" src="https://github.com/akhanalcs/angular-dotnet-realworld/assets/30603497/f99a9814-0ef9-4f9e-aa39-68be1aeebb7a">

[Reference](https://www.jetbrains.com/rider/features/)

### Settings in your Jetbrains IDE Rider
1. Show memory
   
   <img width="650" alt="image" src="https://github.com/akhanalcs/angular-dotnet-realworld/assets/30603497/a3d99d4b-542c-4860-a460-f30b81fd3c9f">

   The memory shows up in the bottom right corner. You can force GC to kick in when your IDE starts getting slow.

   <img width="200" alt="image" src="https://github.com/akhanalcs/angular-dotnet-realworld/assets/30603497/cb655f07-317e-441a-88c1-8c2f820ee019">

2. I'll add more when I find more cool settings to turn on...

### Plugins in your Jetbrains IDE Rider
#### Preetier
Standard for working with JS TS projects. Rider already comes bundled with it

<img width="550" alt="image" src="https://github.com/akhanalcs/angular-dotnet-realworld/assets/30603497/7fe063f4-734c-4b65-a15d-b8ab81f2da3e">

The IDE already uses Prettier but to make the settings consistent across teams, you might want to install it as a dev dependency of the project so that everyone who works on this project use the same preetier version and preetier settings. This will appear in `package.json`.
```bash
npm install --save-dev --save-exact prettier
```

`--save-dev` means to install that package as a dev dependency which is a dependency that is only required for dev and testing.  
By installing it as a development dependency, you can ensure that it is not included in the production build of your application, which can help reduce the size of the final bundle.

`--save-exact` is used to lock the version of the package you're installing. This is useful when you want to ensure that your application always uses a specific version of a package, even if newer versions are released. 

For eg:
```
  "prettier": "^2.6.2", // This isn't exact because package manager can update the Minor version (^)
  "prettier": "2.6.2", // This is exact
```

[How to setup Prettier](https://youtu.be/DqfQ4DPnRqI?si=xpbwGE0UXo17_SPW)  
[Setting up Prettier in Jetbrains IDEs](https://prettier.io/docs/en/webstorm)

#### AceJump
https://plugins.jetbrains.com/plugin/7086-acejump
#### String Manipulation
https://plugins.jetbrains.com/plugin/2162-string-manipulation

## Setup Angular CLI
[Reference](https://angular.io/guide/setup-local#install-the-angular-cli)

Choose either way (1 or 2) shown below.

1. Installs the Angular CLI package locally in the current directory.
   ```bash
   npx --package @angular/cli
   ```

2. Installs the Angular CLI package globally on the computer.
   ```bash
   npm install -g @angular/cli
   ```

Now check the Angular version
```bash
ng version
```

<img width="500" alt="image" src="https://github.com/akhanalcs/angular-dotnet-realworld/assets/30603497/df24558b-477d-4146-933d-ef7e9ce20dfc">

If it asks you to allow angular cli to autocomplete commands, choose Y which will write this to your `.bash_profile`:

<img width="400" alt="image" src="https://github.com/akhanalcs/angular-dotnet-realworld/assets/30603497/70f6a3d1-79fb-4cf8-a529-780421099368">

Later when you want to **uninstall** Angular CLI, you can simply do this
```bash
npm uninstall -g @angular/cli
```

## Create a new app and run it
[Reference](https://angular.io/tutorial/tour-of-heroes/toh-pt0#create-a-new-workspace-and-an-initial-application)

### Create the app
- Create a new GitHub repo (i'm using this current one)
- Clone it down to your local and open it in your IDE   
  <img width="450" alt="image" src="https://github.com/akhanalcs/tour-of-heroes/assets/30603497/0c544d9c-2292-4c76-8af5-9bee53fe2c09">
- Open terminal
- Run the below command
  ```bash
  Ashishs-MacBook-Pro:tour-of-heroes ashishkhanal$ ng new tour-of-heroes --skip-git
  ? Which stylesheet format would you like to use? CSS
  ? Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? No
  ```

  `ng new`
  - installs the necessary npm packages and other dependencies that Angular requires.
  - creates a new workspace, with a root directory named `angular-tour-of-heroes`.
  - creates an initial skeleton application project in the src/app subdirectory.
  - creates related configuration files.

### Push it to Git
- Go into `/Users/coolguy/RiderProjects/tour-of-heroes/tour-of-heroes`
    - Rename the `README.md` generated by angular CLI to be different from whatever is already created by GitHub repo. For eg: I named it `NgCLI-README.md`.
    - Hit `Command + Shift + .` to view hidden files, copy all files.
- Move all the files you copied from previous step into `/Users/coolguy/RiderProjects/tour-of-heroes`.
- Delete `/Users/coolguy/RiderProjects/tour-of-heroes/tour-of-heroes` folder.
- Add the files to source control  
  <img width="500" alt="image" src="https://github.com/akhanalcs/tour-of-heroes/assets/30603497/2693b659-d2de-4dcd-bac8-757d2e0a80ff">
- Push it to Github with "Commit and Push".

### Run the app
Go to the workspace directory and launch the app
```bash
cd angular-tour-of-heroes
ng serve --open
```

The `--open` flag opens a browser to `http://localhost:4200`.

<img width="500" alt="image" src="https://github.com/akhanalcs/tour-of-heroes/assets/30603497/10f92cb1-8ce3-4122-802d-8265c6b4f33d">

## Looking at the generated files
Reference: https://angular.io/guide/file-structure

### main.ts
The `main.ts` file is the [entry point into our app](https://youtu.be/zTLDv5YIpqc?si=VrhjVmK8ItwAb7ai&t=40), where we simply bootstrap the Angular application and mount the `AppComponent` to the [DOM](https://youtu.be/NO5kUNxGIu0?si=ESJxUXRzhbhDNd0D).

### tsconfig.json
More info [here](https://youtu.be/ahCwqrYpIuM?si=w_RZN7F2rsnA-ULk) and [here](https://angular.io/config/tsconfig).

The best one is at Typescript's [official web site](https://www.typescriptlang.org/tsconfig).

### Check out other files on your own
They are pretty straightforward.








