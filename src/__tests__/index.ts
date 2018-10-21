// external dependencies
import copy from 'fast-copy';
import { deepEqual } from 'fast-equals';

// src
import memzee from '../index';

const ITERATION_SIZE = 100;

describe('memzee', () => {
  it('should handle single parameters', () => {
    const args = [{ foo: 'bar' }];
    const fn = jest.fn();

    const result = memzee(fn);

    for (let index = 0; index < ITERATION_SIZE; index++) {
      result(...args);
    }

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenLastCalledWith(...args);
  });

  it('should handle multiple parameters', () => {
    const args = [{ foo: 'bar' }, ['baz'], 123, 'quz', Symbol('blah')];
    const fn = jest.fn();

    const result = memzee(fn);

    for (let index = 0; index < ITERATION_SIZE; index++) {
      result(...args);
    }

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenLastCalledWith(...args);
  });

  it('should handle no parameters', () => {
    const args: any[] = [];
    const fn = jest.fn();

    const result = memzee(fn);

    for (let index = 0; index < ITERATION_SIZE; index++) {
      result(...args);
    }

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenLastCalledWith(...args);
  });

  it('should handle a custom equality method', () => {
    const args = [{ foo: 'bar' }, ['baz'], 123, 'quz', Symbol('blah')];
    const badFn = jest.fn();
    const goodFn = jest.fn();

    const badResult = memzee(badFn);

    const goodResult = memzee(goodFn, {
      isEqual: deepEqual,
    });

    for (let index = 0; index < ITERATION_SIZE; index++) {
      badResult(...copy(args));
      goodResult(...copy(args));
    }

    expect(badFn).toHaveBeenCalledTimes(ITERATION_SIZE);

    expect(goodFn).toHaveBeenCalledTimes(1);
    expect(goodFn).toHaveBeenLastCalledWith(...args);
  });

  it('should handle a transform args method', () => {
    const args = [{ foo: 'bar' }, ['baz'], 'quz', Symbol('blah'), 123];
    const badFn = jest.fn();
    const goodFn = jest.fn();

    const badResult = memzee(badFn);
    const goodResult = memzee(goodFn, {
      transformArgs(receivedArgs) {
        return [].slice.call(receivedArgs, 0, receivedArgs.length - 1);
      },
    });

    let iterationArgs;

    for (let index = 0; index < ITERATION_SIZE; index++) {
      iterationArgs = index
        ? [...args.slice(0, args.length - 1), ~~(Math.random() * 1000)]
        : args;

      badResult(...copy(args));
      goodResult(...iterationArgs);
    }

    expect(badFn).toHaveBeenCalledTimes(ITERATION_SIZE);

    expect(goodFn).toHaveBeenCalledTimes(1);
    expect(goodFn).toHaveBeenLastCalledWith(...args);
  });

  it('should handle custom equality and transform args methods', () => {
    const args = [{ foo: 'bar' }, ['baz'], 'quz', Symbol('blah'), 123];
    const badFn = jest.fn();
    const goodFn = jest.fn();

    const badResult = memzee(badFn);
    const goodResult = memzee(goodFn, {
      isEqual: deepEqual,
      transformArgs(receivedArgs) {
        return [].slice.call(receivedArgs, 0, receivedArgs.length - 1);
      },
    });

    let iterationArgs;

    for (let index = 0; index < ITERATION_SIZE; index++) {
      iterationArgs = index
        ? [...copy(args).slice(0, args.length - 1), ~~(Math.random() * 1000)]
        : args;

      badResult(...copy(args));
      goodResult(...iterationArgs);
    }

    expect(badFn).toHaveBeenCalledTimes(ITERATION_SIZE);

    expect(goodFn).toHaveBeenCalledTimes(1);
    expect(goodFn).toHaveBeenLastCalledWith(...args);
  });
});

describe('memzee.clear', () => {
  it('should clear the existing cache key and result', () => {
    const args = [{ foo: 'bar' }];
    const fn = jest.fn();

    const result: memzee.MemoizedFunction = memzee(fn);

    for (let index = 0; index < ITERATION_SIZE; index++) {
      result(...args);
    }

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenLastCalledWith(...args);

    result.clear();

    for (let index = 0; index < ITERATION_SIZE; index++) {
      result(...args);
    }

    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith(...args);
  });
});

describe('memzee.set', () => {
  it('should set the key and result in cache', () => {
    const args = [{ foo: 'bar' }];
    const fn = jest.fn();

    const result: memzee.MemoizedFunction = memzee(fn);

    const cacheResult = 123;

    result.set(args, cacheResult);

    let callResult;

    for (let index = 0; index < ITERATION_SIZE; index++) {
      callResult = result(...args);
    }

    expect(fn).toHaveBeenCalledTimes(0);
    expect(callResult).toBe(cacheResult);
  });
});
