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








