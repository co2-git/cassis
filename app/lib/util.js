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

    placeholders.forEach(placeholder => {
      rules[`${selector}${placeholder}`] = declarations;
    });

    const { Declaration } = Cassis;

    return new Declaration(rules);
  }
}

export default Util;

import Cassis from './cassis';
