'use strict';

import { EventEmitter } from 'events';
import Cassis from './cassis';
import $package from '../../package.json';

class Styles extends EventEmitter {
  constructor () {
    super();

    this.rules = {};

    if ( typeof window !== 'undefined' ) {
      this.element = window.document.createElement('style');
      window.document.body.appendChild(this.element);
    }

    this.on('changed', () => this.write());
  }

  add (rules) {
    if ( rules instanceof Cassis ) {
      rules = rules.rules;
    }

    for ( let rule in rules ) {
      this.rules[rule] = rules[rule];
    }

    this.emit('changed');
  }

  has (selector) {
    let has = false;

    for ( let rule in this.rules ) {
      let selectors = this.rules[rule].selector
        .split(',')
        .map(selector => selector.trim());

      if ( selectors.indexOf(selector) > -1 ) {
        has = true;
      }
    }

    return has;
  }

  write () {

    if ( typeof window === 'undefined' ) {
      throw new Error('Must be in browser');
    }

    let source = '';

    for ( let rule in this.rules ) {
      source += this.rules[rule].render();
    }

    source += `
/** Powered by Cassis v${$package.version} */`;

    process.nextTick(() => {
      this.element.textContent = source;
    });
  }
}

export default new Styles();
