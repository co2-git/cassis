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

/*
body {
  color: #888;
}
p {
  margin: 10px;
  padding: 0;
}
*/
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
