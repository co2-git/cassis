cassis
===

Write CSS in JS.

# Install

```bash
npm install cassis
```

# Usage

```js
import { Stylesheet, MediaQuery } from 'cassis';

new Stylesheet('html { font-size: 100% }')
  .add('body { font-size : 32px }',
    new MediaQuery({ maxDeviceWidth : 600, screen : true })
  );
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
