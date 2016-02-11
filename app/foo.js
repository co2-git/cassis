'use strict';

import Rule from './lib/rule';
import Stylesheet from './lib/stylesheet';
import MediaQuery from './lib/media-query';

// const rule = new Rule('body { font-size : 32px }')
//   .mediaQuery({ maxDeviceWidth : 600 });

const css = new Stylesheet('html { font-size: 100% }')
  .add('body { font-size : 16px }')
  .add('body { font-size : 32px }', new MediaQuery({ maxDeviceWidth : 600 }));

console.log(css.toString());
console.log();
console.log();
console.log();
console.log(require('util').inspect(css, { depth: null }));
