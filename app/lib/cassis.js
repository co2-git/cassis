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
    this.declarations = new Declaration(declarations, this.selector);
  }

  render () {

    let source = this.selector + ` {
`;

    for ( let declaration in this.declarations.declarations ) {
      source += Declaration.render(declaration, this.declarations.declarations[declaration]);
    }

    source += `}`;

    source = source.replace(/.+\{\n\}/g, '');

    return source;
  }
}

class Declaration {
  constructor (declarations, ns = '') {
    this.declarations = {};

    for ( let declaration in declarations ) {
      if ( typeof declarations[declaration] === 'string' || typeof declarations[declaration] === 'number' ) {
        this.declarations[declaration] = declarations[declaration];
      }
      else if ( declarations[declaration] instanceof Declaration ) {
        for ( let _declaration in declarations[declaration].declarations ) {
          this.declarations[_declaration] = declarations[declaration].declarations[_declaration];
        }
      }
      else if ( typeof declarations[declaration] === 'object' ) {
        let selector = declaration.split(',')
          .map(selector => selector.trim())
          .map(selector => `${ns} ${selector}`.replace(/ \&/g, ''))
          .join(', ');

        this.declarations[selector] = new Rule(selector, declarations[declaration]);
      }
    }
  }

  static render (property, value) {
    let source = '';

    if ( typeof value === 'string' ||  typeof value === 'number' ) {
      source += `    ${property}: ${value};
`;
    }
    else {
      source += `}
`;

      source += `${value.selector} {
`;

      for ( let _declaration in value.declarations.declarations ) {
        source += this.render(_declaration, value.declarations.declarations[_declaration]);
      }

      // source += `}`;
    }

    return source;
  }
}

Cassis.style = style;
Cassis.Declaration = Declaration;

export default Cassis;

const border = new Declaration({ 'border' : '1px solid black', margin : '10px' });

const css = new Cassis({
  'body' : {
    'color' : 'red'
  },

  'h1' : { border },

  'p' : {
    '.foo' : {
      color : 'red'
    },
    '.bar' : {
      color : 'blue'
    },
    '&.barz, &.yellow' : {
      color : 'yellow'
    },
    '.dog': {
      '.cat' : {
        color : 'red'
      }
    }
  }
});

console.log(require('util').inspect(css, { depth: null }));

console.log(css.render());
