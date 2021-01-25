const isFunction = val => typeof val == 'function'

const isObject = val => typeof val === 'object' 
  && val !== null 
  && !Array.isArray(val)

const clone = val => {
  switch(true) {
    case isObject(val):
      return {...val};
    case Array.isArray(val):
      return [...val];
    default:
      return val;
  }
}

const getState = definition => Object.entries(definition)
  .reduce((acc, [key, value]) => {
    return !isFunction(value)
      ? {...acc, [key]: clone(value)}
      : acc;
  }, {});
  
const Record = definition => {
  const handler = {
    apply: (target, thisArg, args) => {
      return args.length === 0 
        ? target(thisArg)
        : target(thisArg)(...args);
    }
  };

  const prototype = Object.entries(definition)
    .reduce((acc, [funcName, func]) => {
      return isFunction(func)
      ? {...acc, [funcName]: new Proxy(func, handler)}
      : acc;
    }, {});

  return (args={}) => ({
    ...getState(definition),
    ...prototype,
    ...args
  })
}

module.exports = Record
