import { auto } from '../auto'

describe('auto(tasks) -> promise(results)', () => {

  it('executes the tasks in the correct order then resolves the results', () => {
    const execOrder: string[] = [];
    return auto({
      a: ['d',      () => { execOrder.push('a'); return 3; }],
      b: [          () => { execOrder.push('b'); return 1; }],
      c: ['a', 'b', () => { execOrder.push('c'); return 4; }],
      d: [          () => { execOrder.push('d'); return 2; }]
    }).then((d) => {
      expect(d).toEqual({ b: 1, d: 2, a: 3, c: 4 });
      expect(execOrder).toEqual(['b', 'd', 'a', 'c' ]);
    });
  });

  it('can handle empty sets', () =>
    auto({}).then(d =>
      expect(d).toEqual({})));

  it('throws error on circular dependencies', () =>
    auto({
      a: ['b', () => {}],
      b: ['a', () => {}]
    })
      .then(() => { throw new Error('should have been rejected'); })
      .catch(err => expect(err).toBeTruthy()));
});
