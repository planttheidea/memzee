// external dependencies
import { deepEqual } from 'fast-equals';

// import '../benchmarks';
import memzee from '../src';

const fibonacciSingle = (number: number): number => {
  return number < 2
    ? number
    : fibonacciSingle(number - 1) + fibonacciSingle(number - 2);
};

const fibonacciMultiple = (number: number, isComplete: boolean): number => {
  if (isComplete) {
    return number;
  }

  const firstValue: number = number - 1;
  const secondValue: number = number - 2;

  return (
    fibonacciMultiple(firstValue, firstValue < 2) +
    fibonacciMultiple(secondValue, secondValue < 2)
  );
};

const fibonacciIgnoredArgs = (number: number, unused: string): number => {
  return number < 2
    ? number
    : fibonacciIgnoredArgs(number - 1, unused) +
        fibonacciIgnoredArgs(number - 2, unused);
};

interface DeepNumber extends Object {
  number: number;
}

const fibonacciDeep = (object: DeepNumber): number => {
  return object.number < 2
    ? object.number
    : fibonacciDeep({ number: object.number - 1 }) +
        fibonacciDeep({ number: object.number - 2 });
};

const single: Function = memzee(fibonacciSingle);
const multiple: Function = memzee(fibonacciMultiple);
const transform: Function = memzee(fibonacciIgnoredArgs, {
  transformArgs(args) {
    return [args[0]];
  },
});
const deep: Function = memzee(fibonacciDeep, {
  isEqual: deepEqual,
});

const number: number = 35;
const object: Object = { number };

console.group('single');
console.log(single(number));
console.log('======');
console.log(single(number));
console.log(single(number));
console.log(single(number));
console.groupEnd();

console.group('multiple');
console.log(multiple(number, false));
console.log('======');
console.log(multiple(number, false));
console.log(multiple(number, false));
console.log(multiple(number, false));
console.groupEnd();

console.group('custom equals');
console.log(deep(object));
console.log('======');
console.log(deep(object));
console.log(deep(object));
console.log(deep(object));
console.groupEnd();

console.group('transform args');
console.log(transform(number, 'foo'));
console.log('======');
console.log(transform(number, 'bar'));
console.log(transform(number, 'baz'));
console.log(transform(number, 'quz'));
console.groupEnd();

document.body.style.backgroundColor = '#1d1d1d';
document.body.style.color = '#d5d5d5';
document.body.style.margin = '0';
document.body.style.padding = '0';

const div = document.createElement('div');

div.textContent = 'Check the console for details.';

document.body.appendChild(div);
