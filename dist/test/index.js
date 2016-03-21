'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redtea = require('redtea');

var _redtea2 = _interopRequireDefault(_redtea);

var _should = require('should');

var _should2 = _interopRequireDefault(_should);

var _ = require('..');

var _util = require('../lib/util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function test() {
  var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  return (0, _redtea2.default)('Cassis', function (it) {

    it('selectors', function (it) {
      it('element', function (it) {
        it('should find element', function (it) {
          var parsed = _util2.default.parseSelector('html');

          it('should be an array', function () {
            return parsed.should.be.an.Array();
          });

          it('should have 1 selector', function () {
            return parsed.should.have.length(1);
          });

          it('should have the right element', function () {
            return parsed[0].element.should.be.exactly('html');
          });
        });

        it('should find elements', function (it) {
          var parsed = _util2.default.parseSelector('html, body');

          it('should be an array', function () {
            return parsed.should.be.an.Array();
          });

          it('should have 2 selectors', function () {
            return parsed.should.have.length(2);
          });

          it('1st element should be the right element', function () {
            return parsed[0].element.should.be.exactly('html');
          });

          it('2nd element should be the right element', function () {
            return parsed[1].element.should.be.exactly('body');
          });
        });
      });
    });

    it('Stylesheet', function (it) {

      it('should be a class', function () {
        return _.Stylesheet.should.be.a.Function();
      });

      it('instantiators', function (it) {

        it('no arguments', function (it) {
          var css = new _.Stylesheet();

          it('should be a stylesheet', function () {
            return css.should.be.an.instanceof(_.Stylesheet);
          });

          it('should have no rules', function () {
            return css.rules.should.have.length(0);
          });
        });

        it('string', function (it) {
          var css = new _.Stylesheet('html {}');

          it('should be a stylesheet', function () {
            return css.should.be.an.instanceof(_.Stylesheet);
          });

          it('should have 1 rule', function () {
            return css.rules.should.have.length(1);
          });
        });
      });
    });
  });
}

exports.default = test;