const flatten = (arr) => {
  if (!Array.isArray(arr)) {
    return arr;
  }

  return arr.reduce((prev, curr) => prev.concat(flatten(curr)), []);
};

export default flatten;
