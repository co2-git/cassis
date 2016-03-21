'use strict';

import describe from 'redtea';
import should from 'should';
import { Stylesheet } from '..';
import Util from '../lib/util';

function test (props = {}) {
  return describe('Cassis', it => {

    it('selectors', it => {
      it('element', it => {
        it('should find element', it => {
          const parsed = Util.parseSelector('html');

          it('should be an array', () => parsed.should.be.an.Array());

          it('should have 1 selector', () => parsed.should.have.length(1));

          it('should have the right element', () => parsed[0].element.should.be.exactly('html'));
        });

        it('should find elements', it => {
          const parsed = Util.parseSelector('html, body');

          it('should be an array', () => parsed.should.be.an.Array());

          it('should have 2 selectors', () => parsed.should.have.length(2));

          it('1st element should be the right element', () => parsed[0].element.should.be.exactly('html'));

          it('2nd element should be the right element', () => parsed[1].element.should.be.exactly('body'));
        });
      });
    });

    it('Stylesheet', it => {

      it('should be a class', () => Stylesheet.should.be.a.Function());

      it('instantiators', it => {

        it('no arguments', it => {
          const css = new Stylesheet();

          it('should be a stylesheet', () => css.should.be.an.instanceof(Stylesheet));

          it('should have no rules', () => css.rules.should.have.length(0));
        });

        it('string', it => {
          const css = new Stylesheet('html {}');

          it('should be a stylesheet', () => css.should.be.an.instanceof(Stylesheet));

          it('should have 1 rule', () => css.rules.should.have.length(1));
        });

      });

    });

  });
}

export default test;
