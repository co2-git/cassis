'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cassis = require('./cassis');

var _cassis2 = _interopRequireDefault(_cassis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Reset = function (_Cassis) {
  _inherits(Reset, _Cassis);

  function Reset() {
    _classCallCheck(this, Reset);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Reset).call(this, {
      'html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video': {
        margin: 0,
        padding: 0,
        border: 0,
        'font-size': '100%',
        font: 'inherit',
        'vertical-align': 'baseline'
      },

      'article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section': {
        display: 'block'
      },

      'body': {
        'line-height': 1
      },

      'ol, ul': {
        'list-style': 'none'
      },

      'blockquote, q': {
        quotes: 'none'
      },

      'blockquote:before, blockquote:after, q:before, q:after': {
        content: '',
        content: 'none'
      },

      'table': {
        'border-collapse': 'collapse',
        'border-spacing': 0
      }
    }));
  }

  return Reset;
}(_cassis2.default);

exports.default = Reset;