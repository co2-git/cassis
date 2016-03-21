'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cassis = require('./cassis');

var _cassis2 = _interopRequireDefault(_cassis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = function () {
  function Util() {
    _classCallCheck(this, Util);
  }

  _createClass(Util, null, [{
    key: 'parseSelector',
    value: function parseSelector(selector) {
      var selectors = [];

      var counter = 0;

      selector.trim().split(',').forEach(function (selector) {
        counter++;

        selector.trim().split(/\s+/).forEach(function (selector) {
          var element = selector.replace(/(\.(\w+[a-z0-9-_]+)|#(\w+[a-z0-9-_]+))/g, '');

          var classes = [];

          var id = '';

          var children = [];

          selector.replace(/\.(\w+[a-z0-9-_]+)/g, function (matches, className) {
            classes.push(className);
          });

          selector.replace(/#(\w+[a-z0-9-_]+)/g, function (matches, idName) {
            id = idName;
          });

          var exists = selectors.filter(function (sel) {
            return sel._id === counter;
          })[0];

          var parsed = { element: element, classes: classes, id: id, children: children, _id: counter };

          if (exists) {
            exists.children.push(parsed);
          } else {
            selectors.push(parsed);
          }
        });
      });

      return selectors;
    }
  }, {
    key: 'placeholder',
    value: function placeholder(selector, declarations) {
      var placeholders = ['::-webkit-input-placeholder', ':-moz-placeholder', '::-moz-placeholder', ':-ms-input-placeholder'];

      var rules = {};

      var selectors = selector.split(',').map(function (selector) {
        return selector.trim();
      });

      placeholders.forEach(function (placeholder) {
        var selectorsWithPlaceholder = selectors.map(function (selector) {
          return '' + selector + placeholder;
        }).join(', ');

        rules[selectorsWithPlaceholder] = declarations;
      });

      var Declaration = _cassis2.default.Declaration;


      return new Declaration(rules);
    }
  }]);

  return Util;
}();

Util.nameRegex = /(\w+[a-z0-9-_]+)/;
exports.default = Util;