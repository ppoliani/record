const test = require('ava');
const Record = require('../lib');

const Stack = Record({
  items: [],
  push: stack => item => stack.items.push(item),
  pop: stack => stack.items.pop(),
  count: stack => stack.items.length
});

test('It should create an instance with default state', t => {
  const stack = Stack();

  t.deepEqual(stack.items, []);
})

test('It should create an instance which you can override the default state', t => {
  const stack = Stack({
    items: ['1']
  });

  t.deepEqual(stack.items, ['1']);
})

test('It should create an instance which you can then update the state via some function', t => {
  const stack = Stack();
  stack.push('1');
  stack.push('2');

  t.deepEqual(stack.items, ['1', '2']);
})

test('It should create multiple instances with separate state each', t => {
  const stack1 = Stack({items: ['1']});
  const stack2 = Stack({items: ['2']});

  t.deepEqual(stack1.items, ['1']);
  t.deepEqual(stack2.items, ['2']);
})

test('It should create multiple functions that can be used by each instance but mutate states separately', t => {
  const stack1 = Stack({items: ['1']});
  stack1.push('2');
  const stack2 = Stack({items: ['2']});
  stack2.push('1')

  t.deepEqual(stack1.items, ['1', '2']);
  t.deepEqual(stack2.items, ['2', '1']);
})

test('It should reuse the functions in each instance', t => {
  const stack1 = Stack();
  const stack2 = Stack();

  t.not(stack1.items, stack2.items);
  t.is(stack1.push, stack2.push);
  t.is(stack1.pop, stack2.pop);
  t.is(stack1.count, stack2.count);
})
