cassis
===

CSS in ES6

# Install

```bash
npm install -g cassis
```

# Usage

```js
import Cassis from 'cassis';

const css = new Cassis({
  body : { color : '#888' },
  p : { margin : '10px', padding : 0 }
});

console.log(css.render());
```

```css
body {
  color: #888;
}
p {
  margin: 10px;
  padding: 0;
}
```

# Style

For dev purposes, the `Style` class allows live styling into a dynamic `<style/>` element.

```js
import Cassis from 'cassis';

const { style } = Cassis;

const body = new Cassis({ body : { color : '#888' } });

// Add rule to style

style.add(body);
```

# Reset

You can call the Eric Meyer Reset 2.0 which ships by default with Cassis:

```js
import Cassis from 'cassis';
import Reset from 'cassis/dist/lib/reset';

style.add(new Reset());
```

# Demo

You can find a demo of Cassis in the file index.html. Just open it with your favorite browser.

# Add rules

You can add rules also by using the `add` method

```js
import Cassis from 'cassis';

const css = new Cassis({
  body : { color : '#888' }
});

css.addRule({
  p : { margin : '10px', padding : 0 }
});

console.log(css.render());
```

```css
body {
  color: #888;
}
p {
  margin: 10px;
  padding: 0;
}
```

# Declarations mixins

Declarations can be re-used such as:

```js
import Cassis from 'cassis';

const { Declaration } = Cassis;

const border = new Declaration({ 'border' : '1px solid black' });

const css = new Cassis({ h1 : { border }, p : { border } });

console.log(css.render());
```

```css
h1 {
  border: 1px solid black;
}
p {
  border: 1px solid black;
}
```

# Nested rules

You can have nested rules such as:

```js
import Cassis from 'cassis';

const css = new Cassis({
  'p' : {
    '.foo' : {
      color : 'red'
    },
    '.bar' : {
      color : 'blue'
    }
  }
});

console.log(css.render());
```

```css
p .foo {
  color: red;
}

p .bar {
  color: blue;
}
```

On a side note, we discourage you to use too deep nested rules. Remember that CSS read from right to left (children to parents) and deep nested selectors are slow to be processed.

# Flag rules

You can use `&` in rules to attach it to rules such as :

```js
import Cassis from 'cassis';

const css = new Cassis({
  'p' : {
    '&.foo' : {
      color : 'red'
    }
  }
});

console.log(css.render());
```

```css
p.foo {
  color: red;
}
```

# Properties with the same name

Since in JavaScript object cannot have properties with the same name but CSS can, this is how to do it:

```js
import Cassis from 'cassis';

const css = new Cassis({
  '.row' : {
    'display': ['-webkit-flex', 'flex']
  }
});

console.log(css.render());
```

```css
.row {
  display: -webkit-flex;
  display: flex;
}
```

# Util

## Placeholder

```js
import Cassis from 'cassis';

const css = new Cassis({
  'input' : {
    'color' : 'red',
    'placeholder' : Cassis.Util.placeholder('input', { color : 'orange' })
  }
});

console.log(css.render());
```

```css
input {
  color: red;
}
input::-webkit-input-placeholder {
   color: orange;
}
input:-moz-placeholder {
   color: orange;
}
input::-moz-placeholder {
   color: orange;
}
input:-ms-input-placeholder {
   color: orange;
}
```
