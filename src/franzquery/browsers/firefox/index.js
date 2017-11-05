import CoreQuery from '../core';
import Element from './element';

class FranzQuery extends CoreQuery {
  constructor(elementsLike, prevObject) {
    super({
      Element,
      elementsLike,
      prevObject,
      browser: 'Firefox',
    });
  }
}

export default FranzQuery;
