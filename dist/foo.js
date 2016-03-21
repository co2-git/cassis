'use strict';

var _ = require('.');

var _util = require('./lib/util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var string = 'html { color : red } div.foo, a.lol { padding : 0 }';

var css = new _.Stylesheet(string);

console.log(require('util').inspect(css, { depth: null }));

console.log();
console.log();
console.log();
console.log('----------------------------------------------------------------');
console.log();
console.log();
console.log();

console.log(require('util').inspect(_util2.default.parseSelector('html.foo.bar#good, div a'), { depth: null }));