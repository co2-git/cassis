'use strict';

import $package from '../../package.json';

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
    this.declarations = declarations;
  }

  render () {
    let source = this.selector + ` {
`;

    for ( let declaration in this.declarations ) {
      source += `    ${declaration}: ${this.declarations[declaration]};
`
    }

    source += `}`;

    return source;
  }
}

export default Cassis;
