'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _css = require('css');

var _css2 = _interopRequireDefault(_css);

var _rule = require('./rule');

var _rule2 = _interopRequireDefault(_rule);

var _declaration = require('./declaration');

var _declaration2 = _interopRequireDefault(_declaration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stylesheet = function () {
  function Stylesheet() {
    var _this = this;

    _classCallCheck(this, Stylesheet);

    this.rules = [];

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    args.forEach(function (arg) {
      if (typeof arg === 'string') {
        var parsed = _css2.default.parse(arg);

        parsed.stylesheet.rules.forEach(function (rule) {
          _this.rules.push(new _rule2.default(rule.selectors, rule.declarations.map(function (declaration) {
            return new _declaration2.default(declaration.property, declaration.value);
          })));
        });
      }
    });
  }

  _createClass(Stylesheet, [{
    key: 'toString',
    value: function toString() {
      return this.rules.map(function (rule) {
        return rule.toString();
      }).join('\n');
    }
  }, {
    key: 'add',
    value: function add() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this.rules.push(new (Function.prototype.bind.apply(_rule2.default, [null].concat(args)))());
      return this;
    }
  }, {
    key: 'find',
    value: function find(selector) {
      return this.rules.filter(function (rule) {
        console.log(rule);
      });
    }
  }]);

  return Stylesheet;
}();

exports.default = Stylesheet;