import { typed, typedActions, flatten } from '../../../utils';

const filterElements = (elements = []) => {
  const ids = {};

  return elements.filter((element) => {
    if (ids[element.id]) {
      return false;
    }

    ids[element.id] = true;
    return true;
  });
};

class CoreQuery {
  constructor({
    Element, elementsLike, prevObject, browser,
  }) {
    Object.assign(this, {
      Element,
      prevObject: prevObject instanceof CoreQuery ? prevObject : document,
      browser,
    });

    const selector = typed(elementsLike, typedActions.selectorLike);

    Object.assign(this, {
      selector,
      elements: this._mergeElements(elementsLike),
    });
  }

  // ---------------- HELPERS ----------------

  _isValidSelector(selector) {
    // selector to be checked
    const dummyElement = document.createElement('div');

    try {
      dummyElement.querySelector(selector);
    } catch (e) {
      return false;
    }

    return true;
  }

  _getElementsBySelector(selector) {
    // selector - string to be used as query
    return Array.from(document.querySelectorAll(selector)).map(this._ensureElement, this);
  }

  _getElementBySelector(selector) {
    // selector - css selector
    const element = document.querySelector(selector);

    if (!element) {
      return null;
    }

    return new this.Element(element);
  }

  _ensureElement(el) {
    // el - either istance of Element or DOMElement
    return new this.Element(el);
  }

  _mergeElements(...elementsSets) {
    // ...elementsSets - Array of sets
    // set - Array of elements / element / selector

    const filteredSet = elementsSets.filter(el => el);

    return filterElements(this._normalizeElementLike(...filteredSet).map(el => this._ensureElement(el)));
  }

  _parseHTML(htmlLike) {
    // htmlLike - string / DOMElement
    return Array.from(typed(htmlLike, typedActions.htmlLike));
  }

  _hasPreviousElements() {
    return this.prevObject.elements && this.prevObject.elements.length;
  }

  _hasElements() {
    return this.elements.length;
  }

  _createInstance(...elements) {
    return new this.constructor(elements, this);
  }

  _isDOMElement(element) {
    return element instanceof window.Element;
  }

  _normalizeElementLike(...supposedElements) {
    const actions = {
      object: (element) => {
        if (this._isDOMElement(element) || element instanceof this.Element) {
          return [element];
        }

        if (element instanceof CoreQuery) {
          return this._normalizeElementLike(element.elements);
        }

        return null;
      },
      string: (supposedSelector) => {
        if (this._isValidSelector(supposedSelector)) {
          return this._getElementsBySelector(supposedSelector);
        }

        return this._parseHTML(supposedSelector);
      },
      default: () => {
        throw new TypeError('Unsupported element type.');
      },
    };

    return flatten(flatten(supposedElements)
      .map(supposedElement => typed(supposedElement, actions))
      .filter(el => el));
  }

  // ---------------- API ----------------

  merge(...instances) {
    return this._createInstance(this, ...instances);
  }

  add(...sets) {
    // set - elementsLike - Array of elements / element / selector
    return this._createInstance(this.elements, ...sets);
  }

  getSelector() {
    return this.selector;
  }

  addEventHandler(event, fn) {
    this.forEach(el => el.onEvent(event, fn));

    return this;
  }

  removeEventHandler(event, fn) {
    this.forEach(el => el.removeEvent(event, fn));

    return this;
  }

  map(fn) {
    return this._createInstance(this.elements.map(fn));
  }

  filter(fn) {
    return this._createInstance(this.elements.filter(fn));
  }

  forEach(fn) {
    return this.elements.forEach(fn);
  }

  dispatchEvent(event) {
    this.forEach(el => el.dispatchEvent(event));

    return this;
  }

  addClass(...classes) {
    this.elements.forEach(el => el.addClass(...classes));

    return this;
  }

  removeClass(...classes) {
    this.elements.forEach(el => el.removeClass(...classes));

    return this;
  }

  toggleClass(className) {
    if (!this._hasElements()) {
      return false;
    }

    this.elements[0].toggleClass(className);
    return true;
  }

  containsClass(className) {
    if (!this._hasElements()) {
      return false;
    }

    return this.elements[0].containsClass(className);
  }

  addBack() {
    if (!this._hasPreviousElements()) {
      return this;
    }

    return this._createInstance(this.elements, this.prevObject.elements);
  }

  after(elementLike) {
    // elementLike - html string / dom element
    this.forEach((el) => {
      const elements = typed(elementLike, typedActions.elementLike, this);
      return el.after(...elements);
    });

    return this;
  }

  append(elementLike) {
    // elementLike - element / html
    this.forEach((el) => {
      const elements = typed(elementLike, typedActions.elementLike, this);
      return el.append(...elements);
    });

    return this;
  }

  appendTo(element) {
    // element - element / selector
    const actions = {
      string: selector => this._getElementBySelector(selector),
      default: el => el,
    };

    this.forEach((el) => {
      const elem = typed(element, actions);
      return el.appendTo(elem);
    });

    return this;
  }

  before(elementLike) {
    this.forEach((el) => {
      const elements = typed(elementLike, typedActions.elementLike, this);
      return el.before(...elements);
    });

    return this;
  }

  children() {
    return this._createInstance(this.elements.map(el => el.children()));
  }

  clone() {
    return this._createInstance(this.elements.map(el => el.clone(true)));
  }

  empty() {
    this.forEach(el => el.empty());

    return this;
  }

  eq(index) {
    return this._createInstance(this.elements[index]);
  }

  find(selector) {
    return this._createInstance(this.elements.map(el => el.find(selector)));
  }

  first() {
    return this._createInstance(this.elements.slice(1));
  }

  get() {
    if (!this._hasElements()) {
      return null;
    }

    return this.elements[0].get();
  }

  has(element) {
    return this.elements.some(el => el.isEqual(element));
  }

  html() {
    if (!this._hasElements()) {
      return '';
    }

    return this.elements[0].html();
  }

  index(element) {
    return this.elements.findIndex(el => el.isEqual(element));
  }

  last() {
    return this._createInstance(this.elements.slice(-1));
  }

  get length() {
    return this.elements.length;
  }

  next() {}

  parent() {
    return this._createInstance(this.elements.map(el => el.parent()));
  }

  position() {
    if (!this._hasElements()) {
      return null;
    }

    return this.elements[0].position();
  }

  prepend() {}

  prependTo() {}

  prev() {}

  remove() {
    this.forEach(el => el.remove());

    return this;
  }

  slice(start, end) {
    return this._createInstance(this.elements.slice(start, end));
  }

  text() {
    if (!this._hasElements()) {
      return '';
    }

    return this.elements[0].text();
  }
}

export default CoreQuery;
