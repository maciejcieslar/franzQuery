// returns array of DOM elements
const elementLike = {
  string: (html, context) => {
    const elements = context._parseHTML(html);
    return [...elements];
  },
  object: element => [element.cloneNode(true)],
  default: () => {
    throw new TypeError('Unsupported element type.');
  },
};

// returns selector if passed, else ''
const selectorLike = {
  string: sel => sel,
  default: () => '',
};

const htmlLike = {
  array: elements => elements,
  object: element => [element],
  string: html => new DOMParser().parseFromString(html, 'text/html').body.children,
  default: () => {
    throw new TypeError('Cant parse the content to html.');
  },
};

export { htmlLike, selectorLike, elementLike };
