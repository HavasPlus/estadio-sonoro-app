const path = require("path");

const root = pathToResolve => {
  const resolvedPath = path.join(process.cwd(), pathToResolve);
  return resolvedPath;
};

const extend = (target, ...sources) => {
  sources.forEach(source => {
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) target[prop] = source[prop];
    }
  });
  return target;
};

module.exports = {
  root,
  extend
};
