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

const getState = interface => Object.entries(interface)
  .reduce((acc, [key, value]) => {
    return !isFunction(value)
      ? {...acc, [key]: clone(value)}
      : acc;
  }, {});
  
const Record = interface => {
  const handler = {
    apply: (target, thisArg, args) => {
      return args.length === 0 
        ? target(thisArg)
        : target(thisArg)(...args);
    }
  };

  const prototype = Object.entries(interface)
    .reduce((acc, [funcName, func]) => {
      return isFunction(func)
      ? {...acc, [funcName]: new Proxy(func, handler)}
      : acc;
    }, {});

  return (args={}) => ({
    ...getState(interface),
    ...prototype,
    ...args
  })
}

module.exports = Record
