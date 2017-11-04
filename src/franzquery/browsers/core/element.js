import { typed, randomId } from '../../../utils';

const capitalize = str => str.slice(0, 1).toUpperCase() + str.slice(1);

const getFormattedDataName = key => `franz${capitalize(key)}`;

class Element {
  constructor(el) {
    typed(el, {
      object: (element) => {
        if (element instanceof Element) {
          return Object.assign(this, element);
        }

        if (this._isDOMElement(element)) {
          return Object.assign(this, {
            el: element,
          });
        }

        throw new TypeError('Element must be either an instance of Element or a DOMElement.');
      },
      default: () => {
        throw new TypeError('Element must be an object.');
      },
    });
    const supposedId = this.getFranzAttr('id');

    if (supposedId) {
      this.id = supposedId;
    } else {
      const id = randomId();
      this.setFranzAttr('id', id);
      this.id = id;
    }
  }

  _isDOMElement(element) {
    return element instanceof window.Element;
  }

  get() {
    return this.el;
  }

  html() {
    return this.el.innerHTML;
  }

  text() {
    return this.el.textContent;
  }

  addEventHandler(event, fn) {
    this.el.addEventListener(event, fn);
    return this;
  }

  removeEventHandler(event, fn) {
    this.el.removeEventListener(event, fn);

    return this;
  }

  dispatchEvent(event) {
    this.el.dispatchEvent(new Event(event));

    return this;
  }

  setAttr(key, value) {
    this.el.setAttribute(key, value);

    return this;
  }

  getAttr(key) {
    return this.el.getAttribute(key);
  }

  getTag() {
    return this.el.tagName.toLowerCase();
  }

  setFranzAttr(key, value) {
    const scrapperKey = getFormattedDataName(key);
    this.el.dataset[scrapperKey] = value;
    return this;
  }

  getFranzAttr(key) {
    return this.el.dataset[getFormattedDataName(key)];
  }

  addClass(...classes) {
    this.el.classList.add(...classes);

    return this;
  }

  removeClass(...classes) {
    this.el.classList.remove(...classes);

    return this;
  }

  toggleClass(className) {
    this.el.classList.toggle(className);

    return this;
  }

  containsClass(className) {
    return this.el.classList.contains(className);
  }

  after(...elements) {
    this.el.after(...elements);

    return this;
  }

  append(...elements) {
    this.el.append(...elements);

    return this;
  }

  appendTo(element) {
    element.append(this.el);

    return this;
  }

  children() {
    return Array.from(this.el.children);
  }

  clone(isDeep = true) {
    return this.el.cloneNode(isDeep);
  }

  before(element) {
    this.el.before(element);

    return this;
  }

  empty() {
    const node = this.el;
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }

    return this;
  }

  isEqual(element) {
    return this === element || element === this.el;
  }

  remove() {
    this.el.remove();

    return this;
  }

  position() {
    return this.el.getBoundingClientRect();
  }

  find(selector) {
    return Array.from(this.el.querySelectorAll(selector));
  }

  prepend(...elements) {
    this.el.prepend(...elements);

    return this;
  }

  prependTo(element) {
    element.prepend(this.el);

    return this;
  }

  parent() {
    return this.el.parentNode;
  }

  next() {
    return this.el.nextElementSibling;
  }

  prev() {
    return this.el.previousElementSibling;
  }
}

export default Element;
