'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _css = require('css');

var _css2 = _interopRequireDefault(_css);

var _mediaQuery = require('./media-query');

var _mediaQuery2 = _interopRequireDefault(_mediaQuery);

var _declaration = require('./declaration');

var _declaration2 = _interopRequireDefault(_declaration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rule = function () {
  function Rule() {
    _classCallCheck(this, Rule);

    this.declarations = [];
    this.selectors = [];
    this.media = {};

    this.parseArgs.apply(this, arguments);
  }

  _createClass(Rule, [{
    key: 'parseArgs',
    value: function parseArgs() {
      var _this = this;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      args.forEach(function (arg) {
        if (typeof arg === 'string') {
          if (/\{/.test(arg)) {
            var parsed = _css2.default.parse(arg);

            _this.selectors = parsed.stylesheet.rules[0].selectors;

            _this.declarations = parsed.stylesheet.rules[0].declarations.map(function (declaration) {
              return new _declaration2.default(declaration.property, declaration.value);
            });
          } else {
            _this.selectors = [arg];
          }
        } else if (Array.isArray(arg)) {
          _this.parseArgs.apply(_this, _toConsumableArray(arg));
        } else if (arg instanceof _declaration2.default) {
          _this.declarations.push(arg);
        } else if (arg instanceof _mediaQuery2.default) {
          _this.mediaQuery(arg);
        }
      });
    }
  }, {
    key: 'mediaQuery',
    value: function mediaQuery(media) {
      if (!(this.media instanceof _mediaQuery2.default)) {
        this.media = new _mediaQuery2.default(media);
      } else {
        Object.assign(this.media, new _mediaQuery2.default(media));
      }

      return this;
    }
  }, {
    key: 'toString',
    value: function toString() {
      if (this.media instanceof _mediaQuery2.default) {
        var string = '@media ';

        var modes = [];

        if (this.media.screen) {
          modes.push('screen');
        }

        string += modes.join(' and ');

        if (modes.length) {
          string += ' and ';
        }

        var conditions = [];

        if ('maxDeviceWidth' in this.media) {
          conditions.push('(max-device-width : ' + this.media.maxDeviceWidth + 'px)');
        }

        string += conditions.join(' and ');

        string += ' {\n  ' + this.selectors.join(', ') + ' {\n    ' + this.declarations.map(function (declaration) {
          return declaration.toString();
        }).join('\n') + '\n  }\n}';

        return string;
      }

      return this.selectors.join(', ') + (' {\n  ' + this.declarations.map(function (declaration) {
        return declaration.toString();
      }).join('\n') + '\n}');
    }
  }]);

  return Rule;
}();

exports.default = Rule;