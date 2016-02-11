'use strict';

import css from 'css';
import MediaQuery from './media-query';
import Declaration from './declaration';

class Rule {
  declarations    =   [];
  selectors       =   [];
  media           =   {};

  constructor (...args) {
    this.parseArgs(...args);
  }

  parseArgs (...args) {
    args.forEach(arg => {
      if ( typeof arg === 'string' ) {
        if ( /\{/.test(arg) ) {
          const parsed = css.parse(arg);

          this.selectors = parsed.stylesheet.rules[0].selectors;

          this.declarations = parsed.stylesheet.rules[0].declarations
            .map(declaration => new Declaration(
              declaration.property,
              declaration.value
            ));
        }
        else {
          this.selectors = [arg];
        }
      }
      else if ( Array.isArray(arg) ) {
        this.parseArgs(...arg);
      }
      else if ( arg instanceof Declaration ) {
        this.declarations.push(arg);
      }
      else if ( arg instanceof MediaQuery ) {
        this.mediaQuery(arg);
      }
    });
  }

  mediaQuery (media) {
    if ( ! ( this.media instanceof MediaQuery ) ) {
      this.media = new MediaQuery(media);
    }
    else {
      Object.assign(this.media, new MediaQuery(media));
    }

    return this;
  }

  toString () {
    if ( this.media instanceof MediaQuery ) {
      let string = '@media ';

      const modes = [];

      if ( this.media.screen ) {
        modes.push('screen');
      }

      string += modes.join(' and ');

      if ( modes.length ) {
        string += ' and ';
      }

      const conditions = [];

      if ( ( 'maxDeviceWidth' in this.media ) ) {
        conditions.push(`(max-device-width : ${this.media.maxDeviceWidth}px)`);
      }

      string += conditions.join(' and ');

      string += ` {
  ${this.selectors.join(', ')} {
    ${this.declarations.map(declaration => declaration.toString()).join('\n')}
  }
}`;

      return string;
    }

    return this.selectors.join(', ') + ` {
  ${this.declarations.map(declaration => declaration.toString()).join('\n')}
}`;
  }
}

export default Rule;
