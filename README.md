# @ppoliani/record
A stateful record ADT

Installation
===
`npm install @ppoliani/record`

or 

`yarn add @ppoliani/record`

Usage
===

```
const Stack = Record({
  items: [],
  push: stack => item => stack.items.push(item),
  pop: stack => stack.items.pop(),
  count: stack => stack.items.length
});

// use the default state
const stack = Stack();
stack.push('1'); 
stack.push('2');

console.log(stack.items) // ['1', '2']

// init with values
const stack = Stack({items: ['1']});
console.log(stack.items) // ['1']

```

License
===
MIT License
