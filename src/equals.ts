/**
 * are the objects passed strictly equal to one another
 * @param object1 the first object to compare
 * @param object2 the second object to compare
 * @returns are the objects passed strictly equal
 */
export const isStrictlyEqual = (object1: any, object2: any): boolean =>
  object1 === object2;

/**
 * are the arguments passed equal to the key in cache based on a single arg
 * @param key the existing key in cache
 * @param args the new args to compare with the key
 * @param isEqual the equality comparator
 * @returns are the arguments passed equal to the key
 */
export const isOneEqual = (
  key: any[],
  args: IArguments | any[],
  isEqual: Function,
): boolean => isEqual(key[0], args[0]);

/**
 * are the arguments passed equal to the key in cache based on two args
 * @param key the existing key in cache
 * @param args the new args to compare with the key
 * @param isEqual the equality comparator
 * @returns are the arguments passed equal to the key
 */
export const isTwoEqual = (
  key: any[],
  args: IArguments | any[],
  isEqual: Function,
): boolean => isEqual(key[0], args[0]) && isEqual(key[1], args[1]);

/**
 * are the arguments passed equal to the key in cache based on three args
 * @param key the existing key in cache
 * @param args the new args to compare with the key
 * @param isEqual the equality comparator
 * @returns are the arguments passed equal to the key
 */
export const isThreeEqual = (
  key: any[],
  args: IArguments | any[],
  isEqual: Function,
): boolean =>
  isEqual(key[0], args[0]) &&
  isEqual(key[1], args[1]) &&
  isEqual(key[2], args[2]);

/**
 * are the arguments passed equal to the key in cache
 * @param key the existing key in cache
 * @param args the new args to compare with the key
 * @param isEqual the equality comparator
 * @param length the number of arguments to check
 * @returns are the arguments passed equal to the key
 */
export const areAllEqual = (
  key: any[],
  args: IArguments | any[],
  isEqual: Function,
  length: number,
): boolean => {
  for (let index: number = 0; index < length; index++) {
    if (!isEqual(key[index], args[index])) {
      return false;
    }
  }

  return true;
};
