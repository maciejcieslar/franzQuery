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

const typed = (value, actions, ...additionalArgs) => {
  const type = getValueType(value);
  const args = [value, ...additionalArgs];

  if (typeof actions[type] !== 'function' && actions.default) {
    return actions.default(...args);
  }

  if (typeof actions[type] !== 'function') {
    throw new TypeError('Unsupported type!');
  }

  return actions[type](...args);
};

export default typed;
