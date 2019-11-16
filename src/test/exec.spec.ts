import { exec } from '../exec';


describe('exec(fn) -> promise(val)', () => {

  it('runs a function and resolves it\'s resolved value', () =>
    exec(() => Promise.resolve('val')).then(v => expect(v).toBe('val')));

  it('runs a function and resolves it\'s return value', () =>
    exec(() => 'val').then(v => expect(v).toBe('val')));

  it('if given a value it simply resolves it', () =>
    exec('val').then(v => expect(v).toBe('val')));

  it('if given no arguement it returns a resolved promise', () =>
    exec().then(v => expect(v).toBe(undefined)));

  it('captures a thrown error', () =>
    exec(() => { throw new Error('error'); })
      .catch(err => expect(err.message).toBe('error')));
});
