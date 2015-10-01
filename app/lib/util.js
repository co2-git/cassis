'use strict';

class Util {
  static placeholder (selector, declarations) {
    const placeholders = [
      '::-webkit-input-placeholder',
      ':-moz-placeholder',
      '::-moz-placeholder',
      ':-ms-input-placeholder'
    ];

    let rules = {};

    let selectors = selector.split(',').map(selector => selector.trim());

    placeholders.forEach(placeholder => {
      let selectorsWithPlaceholder = selectors
        .map(selector => `${selector}${placeholder}`)
        .join(', ');

      rules[selectorsWithPlaceholder] = declarations;
    });

    const { Declaration } = Cassis;

    return new Declaration(rules);
  }
}

export default Util;

import Cassis from './cassis';
