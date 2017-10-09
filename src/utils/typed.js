const types = {
  NULL: 'null',
  OBJECT: 'object',
  ARRAY: 'array',
  FUNCTION: 'function',
  STRING: 'string',
  NUMBER: 'number',
  UNDEFINED: 'undefined',
};

const getValueType = (value) => {
  let type = typeof value;

  if (type === 'object') {
    if (Array.isArray(value)) {
      type = types.ARRAY;
    } else if (value === null) {
      type = types.NULL;
    }
  }

  return types[type.toUpperCase()];
};

const typed = (value, actions) => {
  const type = getValueType(value);

  if (typeof actions[type] !== 'function' && actions.default) {
    return actions.default(value);
  }

  if (typeof actions[type] !== 'function') {
    throw new TypeError('Unsupported type!');
  }

  return actions[type](value);
};

export default typed;
