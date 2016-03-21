'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

var _cassis = require('./cassis');

var _cassis2 = _interopRequireDefault(_cassis);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Styles = function (_EventEmitter) {
  _inherits(Styles, _EventEmitter);

  function Styles() {
    _classCallCheck(this, Styles);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Styles).call(this));

    _this.rules = {};

    if (typeof window !== 'undefined') {
      _this.element = window.document.createElement('style');
      window.document.body.appendChild(_this.element);
    }

    _this.on('changed', function () {
      return _this.write();
    });
    return _this;
  }

  _createClass(Styles, [{
    key: 'add',
    value: function add(rules) {
      if (rules instanceof _cassis2.default) {
        rules = rules.rules;
      }

      for (var rule in rules) {
        this.rules[rule] = rules[rule];
      }

      this.emit('changed');
    }
  }, {
    key: 'has',
    value: function has(selector) {
      var has = false;

      for (var rule in this.rules) {
        var selectors = this.rules[rule].selector.split(',').map(function (selector) {
          return selector.trim();
        });

        if (selectors.indexOf(selector) > -1) {
          has = true;
        }
      }

      return has;
    }
  }, {
    key: 'write',
    value: function write() {
      var _this2 = this;

      if (typeof window === 'undefined') {
        throw new Error('Must be in browser');
      }

      var source = '';

      for (var rule in this.rules) {
        source += this.rules[rule].render();
      }

      source += '\n/** Powered by Cassis v' + _package2.default.version + ' */';

      process.nextTick(function () {
        _this2.element.textContent = source;
      });
    }
  }]);

  return Styles;
}(_events.EventEmitter);

exports.default = new Styles();