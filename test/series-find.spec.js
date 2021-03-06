const assert     = require('assert');
const setTimeout = require('../set-timeout');
const seriesFind = require('../series-find');


describe('seriesFind(items, worker(item) -> promise(val)) -> promise(val)', () => {

  it('processes items array and resolves the first item that causes the tester to resolve true', () => {
    const items = [1, 2, 3, 4];
    return seriesFind(items, i => setTimeout(() => i === 2, 10)).then(r =>
      assert.deepEqual(r, 2));
  });

  it('processes items object and resolves the first item that causes the tester to resolve true', () => {
    const items = { a: 1, b: 2, c: 3, d: 4 };
    return seriesFind(items, i => setTimeout(() => i === 2, 10)).then(r =>
      assert.deepEqual(r, 2));
  });

  it('can handle empty items array', () => {
    const items = [];
    return seriesFind(items, i => i).then(r =>
      assert.deepEqual(r, undefined));
  });

  it('can handle empty items object', () => {
    const items = {};
    return seriesFind(items, i => i).then(r =>
      assert.deepEqual(r, undefined));
  });

  it('passes the itemIndex and items array as a second and third argument', () => {
    const items = [0, 1, 2];
    return seriesFind(items, (item, index, _items) => {
      assert.equal(item, index);
      assert.equal(items, _items);
    });
  });
});
