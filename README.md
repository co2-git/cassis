cassis
===

Write CSS in JS.

# Install

```bash
npm install cassis
```

# Usage

## Create from object

```js
import { Stylesheet } from 'cassis';

const css = new Stylesheet();


console.log(css.toString());
```

```css
html {
  font-size: 100%;
}
@media (max-device-width : 600px) {
  body {
    font-size: 32px;
  }
}
```
