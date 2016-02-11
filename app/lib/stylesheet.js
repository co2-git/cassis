'use strict';

import css from 'css';
import Rule from './rule';
import Declaration from './declaration';

class Stylesheet {
  rules = [];

  constructor (...args) {
    args.forEach(arg => {
      if ( typeof arg === 'string' ) {
        const parsed = css.parse(arg);

        parsed.stylesheet.rules.forEach(rule => {
          this.rules.push(new Rule(
            rule.selectors,
            rule.declarations.map(declaration => new Declaration(
              declaration.property,
              declaration.value
            ))
          ));
        });
      }
    });
  }

  toString () {
    return this.rules.map(rule => rule.toString()).join('\n');
  }

  add (...args) {
    this.rules.push(new Rule(...args));
    return this;
  }
}

export default Stylesheet;
