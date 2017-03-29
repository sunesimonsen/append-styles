# append-styles

This module will prepend style tags to the document head. The style tag will get
the given id and you can specify that the style tag should be placed before or
after another tag with a given id. This is useful if you create multiple
dependent modules that needs to injects CSS a specified order. If you don't need
that capability use [insert-css](https://www.npmjs.com/package/insert-css)
instead.

# Example

You have two modules A and B, where B dependents on A. Then you inject your
styles in the following way:

Module A:

```js
var appendStyles = require('append-styles');

appendStyles({
  css: 'body { background:blue; }',
  id: 'module-a',
  before: 'module-b'
});

appendStyles({
  css: 'h1 { color:papayawhip; }',
  id: 'module-a',
  before: 'module-b'
});
```

Module B:

```js
var appendStyles = require('append-styles');

appendStyles({
  css: 'body { background:red; }',
  id: 'module-b',
  after: 'module-a'
});

appendStyles({
  css: 'h1 { color:black; }',
  id: 'module-b',
  after: 'module-a'
});
```

No matter what order you load the modules in, you will get the following styles
injected:

```html
<html>
  <head>
    <style type="text/css" id="module-a">
      body { background:blue; }
      h1 { color:papayawhip; }
    </style>
    <style type="text/css" id="module-b">
      body { background:red; }
      h1 { color:black; }
    </style>
    ...
  </head>
  ...
<html>
```

# API

## var styleElement = appendStyles(css, options);

* `options.css` - the css to be appended.
* `options.id` - the id of the script tag to append css to. The element will be created if it does not exist.
* `options.before` - the id of a script tag that this script tag should be created before.
* `options.after` - the id of a script tag that this script tag should be created after.

Notice that you have to specify either a `before` and `after`.
