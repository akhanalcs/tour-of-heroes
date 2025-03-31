# Local Setup

## Helpful links
1. [Full stack web dev in Rider](https://www.jetbrains.com/guide/dotnet/tips/full-stack-web-development-with-rider/)
2. [Local setup for angular development](https://angular.io/guide/setup-local)

## Setup Node
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

Check your changes
```bash
cat .bash_profile
```

Reference: [Working with bash_profile](https://stackoverflow.com/a/77428269/8644294).

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

## Editor
I'm using Jetbrains Rider. It already comes with the features present in WebStorm so I don't have to use a separate IDE for doing full stack work.

<img width="600" alt="image" src="https://github.com/akhanalcs/angular-dotnet-realworld/assets/30603497/f99a9814-0ef9-4f9e-aa39-68be1aeebb7a">

[Reference](https://www.jetbrains.com/rider/features/)

## Editor Settings
1. Show memory
   
   <img width="650" alt="image" src="https://github.com/akhanalcs/angular-dotnet-realworld/assets/30603497/a3d99d4b-542c-4860-a460-f30b81fd3c9f">

   The memory shows up in the bottom right corner. You can force GC to kick in when your IDE starts getting slow.

   <img width="200" alt="image" src="https://github.com/akhanalcs/angular-dotnet-realworld/assets/30603497/cb655f07-317e-441a-88c1-8c2f820ee019">

2. I'll add more when I find more cool settings to turn on...

## Editor Plugins
### ESLint
[Reference](https://www.jetbrains.com/help/webstorm/eslint.html#ws_js_linters_eslint_install)

```bash
npm install --save-dev eslint
```

Create a file named `.eslintrc.json` at the `package.json` level to store lint configs.

Activate and configure ESLint in Rider﻿ by following [this guide](https://www.jetbrains.com/help/webstorm/eslint.html#ws_js_eslint_automatic_configuration).

To see an example in a React project, take a look at [this](https://github.com/akhanalcs/reactjs/blob/main/README.md#linting).

### Preetier
[Prettier in WebStorm](https://www.jetbrains.com/help/webstorm/prettier.html)  
[How to setup Prettier](https://youtu.be/DqfQ4DPnRqI?si=xpbwGE0UXo17_SPW)  

Standard for working with JS TS projects. Rider already comes bundled with it

<img width="550" alt="image" src="https://github.com/akhanalcs/angular-dotnet-realworld/assets/30603497/7fe063f4-734c-4b65-a15d-b8ab81f2da3e">

```bash
npm install --save-dev --save-exact prettier
```

Create a file named `.prettierignore` at the `package.json` level to specify files you want to ignore. For example:
```
node_modules
```

Configure Prettier in Rider

<img width="500" alt="image" src="https://github.com/akhanalcs/reactjs/assets/30603497/671519b5-c8bc-4708-848a-bde74887f6f8">

[Turn off all rules that are unnecessary or might conflict with Prettier](https://github.com/prettier/eslint-config-prettier)
```bash
npm install --save-dev eslint-config-prettier
```

And add this to your ESLint configuration. Now your `.eslintrc.json` file should look like this
```json
{
  // eslint-config-prettier
  "extends": ["prettier"]
}
```

**Note about --save-dev and --save-exact:**
- `--save-dev` means to install that package as a dev dependency which is a dependency that is only required for dev and testing.
- `--save-exact` is used to lock the version of the package you're installing. This is useful when you want to ensure that your application always uses a specific version of a package, even if newer versions are released. 

For eg:
```json
  "prettier": "^2.6.2", // This isn't exact because package manager can update the Minor version (^)
  "prettier": "2.6.2", // This is exact
```

**Note about `^` and `~` in version numbers:**
- The caret (`^`) allows changes that do not include the next major version.<br>
  For example, `^2.3.0` allows changes from `2.3.0` up to but not including `3.0.0`.
- The tilde (`~`) allows changes that do not include the next minor version and major version, thereby only allowing patch-level changes for a given minor version.<br>
  For example, `~2.3.0` allows changes from `2.3.0` up to but not including `2.4.0`.

### AceJump
https://plugins.jetbrains.com/plugin/7086-acejump
### String Manipulation
https://plugins.jetbrains.com/plugin/2162-string-manipulation

## Setup Angular CLI
[Reference](https://angular.io/guide/setup-local#install-the-angular-cli)

Choose either way (1 or 2) shown below.

1. Installs the Angular CLI package locally in the current directory.
   ```bash
   npx --package @angular/cli
   ```

2. Installs the Angular CLI package globally on the computer (I went with this).
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
