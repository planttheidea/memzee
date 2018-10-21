// src
import {
  areAllEqual,
  isOneEqual,
  isStrictlyEqual,
  isThreeEqual,
  isTwoEqual,
} from '../equals';

describe('areAllEqual', () => {
  it('should return true when all arguments of both key and args are the same', () => {
    const key = [{}, [], 123, 'foo', Symbol('bar')];
    const args = [...key];
    const isEqual = isStrictlyEqual;

    const result = areAllEqual(key, args, isEqual, args.length);

    expect(result).toBe(true);
  });

  it('should return false when all arguments of both key and args are not the same', () => {
    const key = [{}, [], 123, 'foo', Symbol('bar')];
    const args = [{}, [], 123, 'foo', Symbol('bar')];
    const isEqual = isStrictlyEqual;

    const result = areAllEqual(key, args, isEqual, args.length);

    expect(result).toBe(false);
  });
});

describe('isOneEqual', () => {
  it('should return true when the first argument of both key and args are the same', () => {
    const key = [{}];
    const args = [...key];
    const isEqual = isStrictlyEqual;

    const result = isOneEqual(key, args, isEqual);

    expect(result).toBe(true);
  });

  it('should return false when the first argument of both key and args are not the same', () => {
    const key = [{}];
    const args = [{}];
    const isEqual = isStrictlyEqual;

    const result = isOneEqual(key, args, isEqual);

    expect(result).toBe(false);
  });
});

describe('isStrictlyEqual', () => {
  it('should return true when the objects are identical', () => {
    const a = {};
    const b = a;

    const result = isStrictlyEqual(a, b);

    expect(result).toBe(true);
  });

  it('should return false when the objects are not identical', () => {
    const a = {};
    const b = {};

    const result = isStrictlyEqual(a, b);

    expect(result).toBe(false);
  });
});

describe('isThreeEqual', () => {
  it('should return true when the first 3 arguments of both key and args are the same', () => {
    const key = [{}, [], 123];
    const args = [...key];
    const isEqual = isStrictlyEqual;

    const result = isThreeEqual(key, args, isEqual);

    expect(result).toBe(true);
  });

  it('should return false when the first 3 arguments of both key and args are not the same', () => {
    const key = [{}, [], 123];
    const args = [{}, [], 123];
    const isEqual = isStrictlyEqual;

    const result = isThreeEqual(key, args, isEqual);

    expect(result).toBe(false);
  });
});

describe('isTwoEqual', () => {
  it('should return true when the first 2 arguments of both key and args are the same', () => {
    const key = [{}, []];
    const args = [...key];
    const isEqual = isStrictlyEqual;

    const result = isTwoEqual(key, args, isEqual);

    expect(result).toBe(true);
  });

  it('should return false when the first 2 arguments of both key and args are not the same', () => {
    const key = [{}, []];
    const args = [{}, []];
    const isEqual = isStrictlyEqual;

    const result = isTwoEqual(key, args, isEqual);

    expect(result).toBe(false);
  });
});
