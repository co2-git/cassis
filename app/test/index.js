'use strict';

import describe from 'redtea';
import should from 'should';
import json from '../../package.json';
import { Stylesheet, Declaration, Rule, MediaQuery } from '..';

function test (props = {}) {
  return describe('Cassis', it => {
    it('Stylesheet', it => {
      it('should be a class', () => Stylesheet.should.be.a.Function());
    });

    it('Declaration', it => {
      it('should be a class', () => Declaration.should.be.a.Function());
    });

    it('Rule', it => {
      it('should be a class', () => Rule.should.be.a.Function());
    });

    it('MediaQuery', it => {
      it('should be a class', () => MediaQuery.should.be.a.Function());
    });
  });
}

export default test;
