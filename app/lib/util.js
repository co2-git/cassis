'use strict';

class Util {
  static nameRegex = /(\w+[a-z0-9-_]+)/;

  static parseSelector (selector)  {
    const selectors = [];

    let counter = 0;

    selector.trim().split(',').forEach(selector => {
      counter ++;

      selector.trim().split(/\s+/).forEach(selector => {
        let element = selector.replace(/(\.(\w+[a-z0-9-_]+)|#(\w+[a-z0-9-_]+))/g, '');

        let classes = [];

        let id = '';

        let children = [];

        selector.replace(/\.(\w+[a-z0-9-_]+)/g, (matches, className) => {
          classes.push(className);
        });

        selector.replace(/#(\w+[a-z0-9-_]+)/g, (matches, idName) => {
          id = idName;
        });

        const exists = selectors.filter(sel => sel._id === counter )[0];

        const parsed = { element, classes, id, children, _id : counter };

        if ( exists ) {
          exists.children.push(parsed);
        }

        else {
          selectors.push(parsed);
        }
      });
    });

    return selectors;
  }

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
