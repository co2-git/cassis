'use strict';

import { EventEmitter } from 'events';
import Reset from './reset';
import Cassis from './cassis';
import $package from '../../package.json';

class Styles extends EventEmitter {
  constructor () {
    super();

    this.rules = {};

    this.element = window.document.createElement('style');
    window.document.body.appendChild(this.element);

    this.on('changed', () => this.write());
  }

  reset () {
    process.nextTick(() => {
      this.add(new Reset());
    });
  }

  appendClass (cls) {
    console.log('append class', cls.name);

    if ( this.classes.indexOf(cls.name) > -1 ) {
      console.log('class already here', cls.name);
      return;
    }

    this.classes.push(cls.name);

    this.rules.push(new cls());
    this.emit('changed');
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

  write () {
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
