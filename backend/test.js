const assert = require('assert');

function add(a, b) { return a + b; }

assert.strictEqual(add(2, 3), 5, '2 + 3 should equal 5');
assert.strictEqual(add(0, 0), 0, '0 + 0 should equal 0');

console.log('All tests passed!');
