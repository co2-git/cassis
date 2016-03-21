'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cassis = function () {
  function Cassis() {
    var rules = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Cassis);

    this.rules = {};

    for (var rule in rules) {
      this.rules[rule] = new Rule(rule, rules[rule]);
    }
  }

  _createClass(Cassis, [{
    key: 'render',
    value: function render() {
      var source = '';

      for (var rule in this.rules) {
        source += this.rules[rule].render() + '\n';
      }

      source += '\n/** Powered by Cassis v' + _package2.default.version + ' */';

      return source;
    }
  }]);

  return Cassis;
}();

var Rule = function () {
  function Rule(selector) {
    var declarations = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Rule);

    this.selector = selector;
    this.declarations = new Declaration(declarations, this.selector);
  }

  _createClass(Rule, [{
    key: 'render',
    value: function render() {

      var source = this.selector + ' {\n';

      for (var declaration in this.declarations.declarations) {
        source += Declaration.render(declaration, this.declarations.declarations[declaration]);
      }

      source += '}';

      source = source.replace(/.+\{\n\}/g, '');

      return source;
    }
  }]);

  return Rule;
}();

var Declaration = function () {
  function Declaration(declarations) {
    var ns = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

    _classCallCheck(this, Declaration);

    this.declarations = {};

    for (var declaration in declarations) {
      if (typeof declarations[declaration] === 'string' || typeof declarations[declaration] === 'number' || Array.isArray(declarations[declaration])) {
        this.declarations[declaration] = declarations[declaration];
      } else if (declarations[declaration] instanceof Declaration) {
        for (var _declaration in declarations[declaration].declarations) {
          this.declarations[_declaration] = declarations[declaration].declarations[_declaration];
        }
      } else if (_typeof(declarations[declaration]) === 'object') {
        var selector = declaration.split(',').map(function (selector) {
          return selector.trim();
        }).map(function (selector) {
          return (ns + ' ' + selector).replace(/ \&/g, '');
        }).join(', ');

        this.declarations[selector] = new Rule(selector, declarations[declaration]);
      }
    }
  }

  _createClass(Declaration, null, [{
    key: 'render',
    value: function render(property, value) {
      var source = '';

      if (typeof value === 'string' || typeof value === 'number') {
        source += '    ' + property + ': ' + value + ';\n';
      } else if (Array.isArray(value)) {
        value.forEach(function (value) {
          source += '    ' + property + ': ' + value + ';\n';
        });
      } else {
        source += '}\n';

        source += value.selector + ' {\n';

        for (var _declaration in value.declarations.declarations) {
          source += this.render(_declaration, value.declarations.declarations[_declaration]);
        }

        // source += `}`;
      }

      return source;
    }
  }]);

  return Declaration;
}();

Cassis.style = _style2.default;
Cassis.Declaration = Declaration;
Cassis.Util = _util2.default;

exports.default = Cassis;