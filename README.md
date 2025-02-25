# Use Nullish Coalescing Operators
This is a simple Deno linting rule to make users use the new `Nullish Coalescing` operator instead of ternary operators

For example: 
```ts
const something = {foo : undefined, ha: {foo: "bar"}};
const test = 'baz'
const testing = test ? test : "bar";
const testingFix = test ?? "bar";
const test2 = something.foo ? something.foo : test;
const test3 = something.ha.foo ? something.ha.foo : test;
const test4 = something
?
something :
test;
```
will be replaced by:
```ts
const something = {foo : undefined, ha: {foo: "bar"}};
const test = 'baz'
const testing = test ?? "bar";
const testingFix = test ?? "bar";
const test2 = something.foo ?? test;
const test3 = something.ha.foo ?? test;
const test4 = something ?? test;
```
