import CoreQuery from '../core';
import Element from './element';

class FranzQuery extends CoreQuery {
  constructor(elementsLike, prevObject) {
    super({
      Element,
      elementsLike,
      prevObject,
      browser: 'Safari',
    });
  }
}

export default FranzQuery;
