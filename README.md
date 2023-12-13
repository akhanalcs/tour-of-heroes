# tour-of-heroes
Learning Angular with Tour of Heroes tutorial from Angular docs.

I'll be following along this tutorial: https://angular.io/tutorial/tour-of-heroes

## Helpful links
1. [Full stack web dev in Rider](https://www.jetbrains.com/guide/dotnet/tips/full-stack-web-development-with-rider/)
2. Envato Tuts+'s [Angular tutorial](https://youtu.be/JWhRMyyF7nc?si=3mllCIMx1v5PTJZw)

## Learn Typescript
https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-oop.html  
https://www.typescriptlang.org/docs/handbook/intro.html

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

### Check out other files on your own
They are pretty straightforward.








