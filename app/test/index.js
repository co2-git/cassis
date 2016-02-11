'use strict';

import describe from 'redtea';
import should from 'should';
import Cassis from '../lib/cassis';
import json from '../../package.json';

function test (props = {}) {
  return describe('Cassis', it => {

    it('should be a function', () => Cassis.should.be.a.Function());

    it('should have a render method', () =>
      new Cassis().should.have.property('render').which.is.a.Function()
    );

    it('should render', () => {
      const rendered = new Cassis({ body : { color : 'red' } }).render();

      rendered.should.be.String().and.is.exactly(`body {
    color: red;
}

/** Powered by Cassis v${json.version} */`);
    });

  });
}

export default test;
