# Babel plugin for angular

## Install

```
$ npm install babel babel-core babel-plugin-angular
```

## Write code

#### before
```js
function MyController(service1, service2, service3) {

}
MyController.$inject = ['service1', 'service2', 'service3];

angular
  .module('my.app', ['dep1', 'dep2'])
  .controller('MyController', MyController);
```
#### now
```js
@Inject(['service1', 'service2', 'service3'])
class MyController {

}

angular
  .module('my.app', ['dep1', 'dep2'])
  .controller('MyController', MyController);

```

## Use plugin

#### CLI
```js
$ babel --stage 0 --plugins angular script.js
```

#### Require hook
```js
require("babel").transform("code", { stage: 0, plugins: ["angular"] });
```


#### Browserify

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