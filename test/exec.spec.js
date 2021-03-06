const assert = require('assert');
const exec   = require('../exec');


describe('exec(fn) -> promise(val)', () => {

  it('runs a function and resolves it\'s value', () =>
    exec(() => 'val').then(v => assert.equal(v, 'val')));

  it('runs a function with a callback and resolves it\'s value', () =>
    exec(cb => cb(null, 'val')).then(v => assert.equal(v, 'val')));

  it('runs a generator and resolves it\'s values', () =>
    exec(function* () { yield 1; yield 2; return 3; }).then(v => assert.deepEqual(v, [1, 2, 3])));

  it('runs a generator that returns promises and resolves it\'s values', () =>
    exec(function* () { yield 1; yield Promise.resolve(2); return 3; })
      .then(v => assert.deepEqual(v, [1, 2, 3])));

  it('if given a value it simply resolves it', () =>
    exec('val').then(v => assert.equal(v, 'val')));

  it('if given no arguement it returns a resolved promise', () =>
    exec().then(v => assert.equal(v, undefined)));

  it('captures a thrown error', () =>
    exec(() => { throw new Error('error'); })
      .catch(err => assert.equal(err.message, 'error')));
});
