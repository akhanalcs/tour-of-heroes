# tour-of-heroes
Learning Angular 17 from [official docs](https://angular.io/tutorial/tour-of-heroes) and various other sources.

## Helpful links
1. Envato Tuts+'s [Angular tutorial](https://youtu.be/JWhRMyyF7nc?si=3mllCIMx1v5PTJZw)
2. [Nx, Angular and NestJS](https://thefullstack.engineer/full-stack-development-series-part-1-getting-started-with-nx-angular-and-nestjs/)
3. [Secure web app using Angular and AspNetCore server](https://damienbod.com/2023/09/11/implement-a-secure-web-application-using-nx-standalone-angular-and-an-asp-net-core-server/)
4. [MS Identity Samples](https://github.com/Azure-Samples/ms-identity-ciam-javascript-tutorial)
5. [Angular SSR with AspNetCore server](https://pieterjandeclippel.medium.com/server-side-rendering-in-asp-net-core-angular-2024-version-a617a83324a1)
6. [BFF with .NET and Angular](https://timdeschryver.dev/blog/lets-make-our-spa-more-secure-by-setting-up-a-net-bff-with-duende-and-auth0)
7. [GoCloudNative.Bff](https://github.com/thecloudnativewebapp/GoCloudNative.Bff)
8. https://medium.com/@monkov/angular-using-httpinterceptor-for-token-refreshing-3f04ea2ccb81
9. https://github.com/Azure-Samples/ms-identity-docs-code-javascript
10. https://github.com/Azure-Samples/ms-identity-docs-code-dotnet

## Local setup
Go through the notes [here](docs/local-setup.md).

## Learn JS Basics
Go through the notes [here](docs/learn-javascript.md).

## Learn Typescript
Go through the notes [here](docs/learn-typescript.md).

## Learn RxJS
Go through the notes [here](docs/learn-rxjs.md).

## Learn Signals
Go through the notes [here](docs/learn-signals.md).

## Learn Angular fundamentals
[Angular in 2 minutes](https://youtu.be/Y2i6U1L6oyM?si=ld3SFvAalG2-mHz5)  
[What is Angular (Great overview!)](https://angular.io/guide/what-is-angular)

### Standalone vs NgModule pattern
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
  - creates a new workspace, with a root directory named `tour-of-heroes`.
  - creates an initial skeleton application project in the `src/app` subdirectory.
  - creates related configuration files.

### Run the app
Go to the workspace directory and launch the app
```bash
cd tour-of-heroes
ng serve --open
```

The `--open` flag opens a browser to `http://localhost:4200`.

<img width="500" alt="image" src="https://github.com/akhanalcs/tour-of-heroes/assets/30603497/10f92cb1-8ce3-4122-802d-8265c6b4f33d">

### Push it to Git
- Go into `/Users/coolguy/RiderProjects/tour-of-heroes/tour-of-heroes`
    - Rename the `README.md` generated by angular CLI to be different from whatever is already created by your GitHub repo. For eg: I named it `NgCLI-README.md`.
    - Hit `Command + Shift + .` to view hidden files, copy all files.
- Move all the files you copied from previous step into `/Users/coolguy/RiderProjects/tour-of-heroes`.
- Delete `/Users/coolguy/RiderProjects/tour-of-heroes/tour-of-heroes` folder.
- Add the files to source control  
  <img width="500" alt="image" src="https://github.com/akhanalcs/tour-of-heroes/assets/30603497/2693b659-d2de-4dcd-bac8-757d2e0a80ff">
- Push it to Github with "Commit and Push".

### Show npm window
The npm tool window opens when you select a `package.json` file in the Project tool window or open it in the editor and select Show npm Scripts from the context menu.

<img width="500" alt="image" src="https://github.com/akhanalcs/tour-of-heroes/assets/30603497/36acc4cd-2400-4f23-81c0-812b403a31b8">

The scripts in your `package.json` now shows up in the npm window

<img width="650" alt="image" src="https://github.com/akhanalcs/tour-of-heroes/assets/30603497/feb2a10c-d70c-408e-a8a7-bb439b2c758d">

## Looking at the generated files
Reference: https://angular.io/guide/file-structure

## Debugging Angular apps
Take a look at [this post](https://stackoverflow.com/q/77740608/8644294) of mine.

### main.ts
The `main.ts` file is the [entry point into our app](https://youtu.be/zTLDv5YIpqc?si=VrhjVmK8ItwAb7ai&t=40), where we simply bootstrap the Angular application and mount the `AppComponent` to the [DOM](https://youtu.be/NO5kUNxGIu0?si=ESJxUXRzhbhDNd0D).

### tsconfig.json
More info [here](https://youtu.be/ahCwqrYpIuM?si=w_RZN7F2rsnA-ULk) and [here](https://angular.io/config/tsconfig).

The best one is at Typescript's [official web site](https://www.typescriptlang.org/tsconfig).

### tsconfig.spec.json
https://github.com/akhanalcs/tour-of-heroes/blob/e2baa5549986680fee6664c8921ee90b3356324c/tsconfig.spec.json#L2-L14

- The `extends` statement means that `tsconfig.spec.json` will inherit settings from the base `tsconfig.json` file.
- `outDir` tells TS where to emit the compiled JS files. The files in this directory will be used by test runners or development servers to execute your tests.
- `"types": ["jasmine"]` instructs the TS compiler to include Jasmine's type definitions in the **compilation**. They are in "node_modules/@types/**jasmine**/index.d.ts" file.  
  This makes the Jasmine's types globally available in your tests files (.spec.ts). It offers advantages like auto-completion, type checking and so on, when you are writing your tests.
- `include` property tells the compiler which files should be included in the compilation. `"src/**/*.spec.ts"` means include all the `.spec.ts` (your test files) in your src folder and its subfolders. `"src/**/*.d.ts"` does the same for TypeScript declaration files.  
  The type information from `.d.ts` files will be available when writing code in any TypeScript files "included" in your compiler configuration.

### tsconfig.app.json
https://github.com/akhanalcs/tour-of-heroes/blob/e2baa5549986680fee6664c8921ee90b3356324c/tsconfig.app.json#L2-L14

- `outDir` tells TS compiler where to output JS files transpiled from your TS source. The primary consumer of the outDir files is the Angular CLI when you run commands like `ng build`.
  
  It doesn't need to be checked in, so it's in `.gitignore`
  
  <img width="200" alt="image" src="https://github.com/akhanalcs/tour-of-heroes/assets/30603497/2cb7dd83-c207-4b4b-9cbb-6e60740fb105">

- `"types": []` is telling TypeScript to include no **global** type declarations from the "node_modules/@types" directory, which is where third-party library type definitions are typically located. By making this an empty array, it's excluding all global types from "node_modules/@types".
- `"include": ["src/**/*.d.ts"]` is specifying that TypeScript should include the type declaration files (.d.ts files) that exist within your src directory.
- `"files": [ "src/main.ts" ]` denotes that `main.ts` is the entry point of your Angular application. TypeScript compiles this file and any files it references directly or indirectly.

Note that it's more common to use "files" for entry points to your application like `src/main.ts` and "include" for additional files or glob patterns.

### angular.json (sounds somewhat like .csproj and .sln files in .NET world)
- This is a configuration file for all angular projects in the workspace. This file is used by the Angular CLI. 

  For eg: I have 1 project now

  <img width="300" alt="image" src="https://github.com/akhanalcs/tour-of-heroes/assets/30603497/14ace215-e6bb-41ba-88d7-67dde57af9d0">

- It includes information about project-wide configuration defaults for Angular build and test tools.
- Defines how different targets are processed. Targets are predefined tasks like build, test, and lint that are executed by the Angular CLI.
- Outlines project-specific configurations such as source code locations and file name conventions.
- Handles the configuration for different environments (dev, prod, etc.).

### package.json
- Includes some metadata about the application like name, version, and description at the workspace level and not at the project level (the project level config information would be specified within angular.json).
- The version field in package.json reflects the version of your entire workspace, which can include multiple projects.
- It specifies the npm packages being used by the application. There are two types of packages listed: dependencies (necessary for the app to run) and devDependencies (necessary for development).
- The scripts here can be executed with `npm run <script-name`. For eg: `npm run build`. The aforementioned command executes `ng build` which calls the Angular CLI's build command. The Angular CLI then reads the angular.json file to get build target configuration settings for the project.
  
  <img width="300" alt="image" src="https://github.com/akhanalcs/tour-of-heroes/assets/30603497/c1857b4e-b7c1-4de9-95ee-1397bb07e1d3">

### Check out other files on your own
They are pretty straightforward.

## [Make changes to the app and start tinkering](https://angular.io/tutorial/tour-of-heroes/toh-pt0#make-changes-to-the-application)
Make sure you have run this command which hot reloads your changes
```bash
ng serve
```

### Add a new component
To create a new component, you can run the generate command by being at the workspace level folder.

<img width="800" alt="image" src="https://github.com/akhanalcs/tour-of-heroes/assets/30603497/13b54e66-5853-4b21-9b9b-2b1a06caded2">

### Use the new component
To use the above component, put it in `app.component.html` like so
```html
<app-heroes></app-heroes>
```

Now you'll get this error

<img width="750" alt="image" src="https://github.com/akhanalcs/tour-of-heroes/assets/30603497/b5503899-9c56-475a-8b4b-36ebaee00ade">

To fix that, go to `app.component.ts` and add this component to the imports array.
```ts
  imports: [CommonModule, RouterOutlet, HeroesComponent],
```

### Pipe
Pipe is a function you can use in template expressions to accept an input value and return a transformed value.

For eg: `uppercase`

It's in `/tour-of-heroes/node_modules/@angular/common/index.d.ts` (you don't really have to know this, I just like digging into things)
```ts
export declare class UpperCasePipe implements PipeTransform {
    /**
     * @param value The string to transform to upper case.
     */
    transform(value: string): string;
    transform(value: null | undefined): null;
    transform(value: string | null | undefined): string | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<UpperCasePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<UpperCasePipe, "uppercase", true>;
}
```
Take a look at the static property `epipe` that has a type of `i0.ɵɵPipeDeclaration<UpperCasePipe, "uppercase", true>`
```ts
static ɵpipe: i0.ɵɵPipeDeclaration<UpperCasePipe, "uppercase", true>;
```

i0 just refers to Angular's internal API.  
`"uppercase"` refers to name of the pipe as a string.  
Boolean value of `true` denotes whether the pipe is "pure" (doesn't have side effects and won't re-evaluate if the inputs haven't changed).  
#### Using pipes
In your component, import it
```ts
import { UpperCasePipe } from "@angular/common";
```
and add it to imports array
```ts
  imports: [
    UpperCasePipe
  ],
```

Now use it in your html inside interpolation binding syntax
```html
<h2>{{ hero.name | uppercase }} Details</h2>
```

## [Provider and Injector in Dependency Injection](https://angular.io/tutorial/tour-of-heroes/toh-pt4#provide-the-heroservice)
```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeroService {

  constructor() { }

}
```

A provider ("manufacturer") is something that can create or deliver a service. In this case, it instantiates the HeroService class to provide the service.

The `@Injectable` decorator designates this class as a provider that can create a service. So here entire `HeroService` class is the "manufacturer".

To make sure that the `HeroService` can provide this service, register it with the injector ("delivery service"). The injector is the object that chooses and injects the provider where the application requires it. The injector is a part of Angular's internal system and mechanisms.

**Remember it using this analogy:**

Annotating a service with `@Injectable({ providedIn: 'root' })` is like giving that service to a 'root' delivery man (injector) and saying, "Keep this service in your bag. When a component or another service needs it, provide them with a single instance of it (singleton) from your bag." The 'root' man carries the service throughout your application and shares the same single instance of that service with anyone who asks for it.

## Routing
### [Add RouterOutlet](https://angular.io/tutorial/tour-of-heroes/toh-pt5#add-routeroutlet)
### [Add dashboard view](https://angular.io/tutorial/tour-of-heroes/toh-pt5#add-a-dashboard-view)
Don't follow about the module stuffs there. We do module import stuffs in `app.config.ts` in standalone apps.

Read [this](https://angular.dev/guide/routing/router-tutorial) and add some route definitions in `app.routes.ts`
```ts
export const routes: Routes = [
  // This route redirects a URL that fully matches the empty path to the route whose path is '/dashboard'
  { path: '', redirectTo:'/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'detail/:id', component: HeroDetailComponent }
];
```
| PROPERTIES | DETAILS                                                               |
|------------|-----------------------------------------------------------------------|
| path       | A string that matches the URL in the browser address bar.              |
| component  | The component that the router should create when navigating to this route. |

### [Navigating to Hero details](https://angular.io/tutorial/tour-of-heroes/toh-pt5#navigating-to-hero-details)

After this, just follow along in that tutorial.

## Error Handling with Observables
[Watch this first](https://youtu.be/L9kFTps_7Tk?si=Jr1mR5hTKOJSlZzh)

When an Observable generates an error, it stops and won't emit further.

Consider this code
https://github.com/akhanalcs/tour-of-heroes/blob/81b7f1ff889efcf98248b404a451e57f9e1b43eb/src/app/hero.service.ts#L69-L105

- If an error is encountered during an http call, the method `handleError` is immediately called within the `catchError` operator in the RxJS pipe.
- The `catchError` operator intercepts an Observable that fails. It then calls the function it has been provided, which in this case is `handleError`.
- Once the `handleError` method is called, it returns another function that accepts the error parameter. At this point, this returned function is not executed yet.
- The function returned from `handleError` is then executed by the `catchError` operator, and the caught error is passed to it.

So in summary, `handleError` returns a "callback" for `catchError` operator that processes the error, and returns a new, non-erroneous "replacement Observable" to prevent the stream from being completely terminated.

## Binding
- `[]` (square brackets) are used for property binding. They bind the **property** of a DOM element to a **field** in the component.
- `()` (parentheses) are used for event binding. They bind an **event** of a DOM element to a **method** in the component.
- `[()]` (banana-in-a-box) is used for **two-way** data binding. It combines property binding and event binding in one syntax.

Here is an example of each:
```html
<!-- Property binding -->
<img [src]="imageUrl">

<!-- Event binding -->
<!-- It binds the button's click event to the `onClick()` method in the component. -->
<button (click)="onClick()">Click me</button>

<!-- Two-way data binding -->
<!-- It binds the input field's value to the `hero.name` property and updates the property when the input value changes. -->
<input id="hero-name" [(ngModel)]="hero.name" placeholder="name">
```











