'use strict';

import $package from '../../package.json';
import style from './style';

class Cassis {

  constructor (rules = {}) {
    this.rules = {};

    for ( let rule in rules ) {
      this.rules[rule] = new Rule(rule, rules[rule]);
    }
  }

  render () {
    let source = '';

    for ( let rule in this.rules ) {
      source += `${this.rules[rule].render()}
`;
    }

    source += `
/** Powered by Cassis v${$package.version} */`;

    return source;
  }
}

class Rule {
  constructor (selector, declarations = {}) {
    this.selector = selector;
    this.declarations = new Declaration(declarations);
  }

  render () {
    let source = this.selector + ` {
`;

    source += this.declarations.render();

    source += `}`;

    return source;
  }
}

class Declaration {
  constructor (declarations) {
    this.declarations = declarations;
  }

  render () {
    let source = '';

    for ( let declaration in this.declarations ) {
      if ( typeof this.declarations[declaration] === 'string' || typeof this.declarations[declaration] === 'number' ) {
        source += `    ${declaration}: ${this.declarations[declaration]};
`;
      }
      else if ( this.declarations[declaration] instanceof Declaration ) {
        source += this.declarations[declaration].render();
      }
    }

    return source;
  }
}

Cassis.style = style;
Cassis.Declaration = Declaration;

export default Cassis;
