// UTILS
import {
  areAllEqual,
  isOneEqual,
  isStrictlyEqual,
  isThreeEqual,
  isTwoEqual,
} from './equals';

const isFixedArgEqual: Function[] = [
  isOneEqual,
  isOneEqual,
  isTwoEqual,
  isThreeEqual,
];

/**
 * memoize the function based on its arguments passed and the options set
 * @param fn the function to memoize
 * @param options the options used for memoization
 * @param options.isEqual the equality comparator to be used
 * @param options.transformArgs optional method to transform the arguments before usage as key
 * @returns the memoized function
 */
const memzee = (
  fn: Function,
  { isEqual = isStrictlyEqual, transformArgs }: memzee.Options = {},
): memzee.MemoizedFunction => {
  let key: any[];
  let result: any;

  const memoized: memzee.MemoizedFunction = function () {
    const args: IArguments = arguments;
    const newKey: IArguments | any[] = transformArgs
      ? transformArgs(args)
      : args;
    const length: number = newKey.length;
    const isKeyEqual: Function = isFixedArgEqual[length] || areAllEqual;

    if (
      key &&
      key.length === length &&
      isKeyEqual(key, newKey, isEqual, length)
    ) {
      return result;
    }

    if (length > 1) {
      key = new Array(length);

      for (let index: number = 0; index < length; index++) {
        key[index] = newKey[index];
      }
    } else {
      key = length ? [newKey[0]] : [];
    }

    return (result = fn.apply(this, args));
  };

  memoized.clear = (): void => {
    key = [];
    result = void 0;
  };

  memoized.set = (keyToSet: any[], resutToSet: any): void => {
    key = keyToSet;
    result = resutToSet;
  };

  return memoized;
};

export default memzee;
