# Babel plugin for angular projects

## Install

```
$ npm install babel babel-core babel-plugin-angular
```

```js
function MyController(service1, service2, service3) {

}
MyController.$inject = ['service1', 'service2', 'service3];

angular
  .module('my.app', ['dep1', 'dep2'])
  .controller('MyController', MyController);
```

```js
@Inject(['service1', 'service2', 'service3'])
class MyController {

}

angular
  .module('my.app', ['dep1', 'dep2'])
  .controller('MyController', MyController);

```

## Use:

```js
$ babel --stage 0 --plugins angular script.js
```

or:

```js
require("babel").transform("code", { stage: 0, plugins: ["angular"] });
```

with `browserify` / `babelify`:

```js
var b = browserify({
  // options
}).transform(
  babelify.configure({
    stage: 0,
    plugins: ["angular"]
  })
);
```