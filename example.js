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

console.log(testing, test2, testingFix, test3, test4)
