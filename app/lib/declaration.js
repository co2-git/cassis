'use strict';

import css from 'css';

class Declaration {
  property;
  value;

  constructor (property, value) {
    this.property = property;
    this.value = value;
  }

  toString () {
    return `${this.property}: ${this.value};`;
  }
}

export default Declaration;
