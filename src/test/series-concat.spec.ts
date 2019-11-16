import { setTimeout }   from '../set-timeout';
import { seriesConcat } from '../series-concat';


describe('seriesConcat(items, worker(item) -> promise(val)) -> promise(val)', () => {

  it('processes item arrays, executing the worker on each item and resolves the mapped results', () => {
    const items = [1, 2, 3, 4];
    return seriesConcat(items, i => setTimeout(() => [i - 1, i, i + 1], 10)).then(d =>
      expect(d).toEqual([0, 1, 2, 1, 2, 3, 2, 3, 4, 3, 4, 5]));
  });

  it('processes item objects, executing the worker on each item and resolves the mapped results', () => {
    const items = { a: 1, b: 2, c: 3, d: 4 };
    return seriesConcat(items, i => setTimeout(() => [i - 1, i, i + 1], 10)).then(d =>
      expect(d).toEqual([0, 1, 2, 1, 2, 3, 2, 3, 4, 3, 4, 5]));
  });

  it('can process an empty item array', () => {
    const items = [];
    return seriesConcat(items, i => i).then(d =>
      expect(d).toEqual([]));
  });

  it('can process an empty item object', () => {
    const items = {};
    return seriesConcat(items, i => i).then(d =>
      expect(d).toEqual([]));
  });

  it('passes the itemIndex and items array as a second and third argument', () => {
    const items = [0, 1, 2];
    return seriesConcat(items, (item, index, _items) => {
      expect(item).toBe(index);
      expect(items).toBe(_items);
    });
  });
});
