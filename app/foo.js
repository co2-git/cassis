'use strict';

import { Stylesheet, MediaQuery } from '.';
import Util from './lib/util';

// const rule = new Rule('body { font-size : 32px }')
//   .mediaQuery({ maxDeviceWidth : 600 });
//
// const css = new Stylesheet('html { font-size: 100% }')
//   .add('body { font-size : 16px }')
//   .add('body { font-size : 32px }', new MediaQuery({ maxDeviceWidth : 600, screen : true }));
//
// console.log(css.toString());
// console.log();
// console.log();
// console.log();
// console.log(require('util').inspect(css, { depth: null }));


const string = 'html { color : red } div.foo, a.lol { padding : 0 }';

const css = new Stylesheet(string);

console.log(require('util').inspect(css, { depth: null }));

console.log();
console.log();
console.log();
console.log('----------------------------------------------------------------');
console.log();
console.log();
console.log();

console.log(require('util').inspect(Util.parseSelector('html.foo.bar#good, div a'), { depth: null }));
