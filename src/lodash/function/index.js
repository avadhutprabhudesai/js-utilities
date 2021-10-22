import { transform } from '@babel/core';

// invoke cb after n calls, no result before it.
export const after = (n, cb) => {
  return () => {
    n--;
    if (n <= 0) {
      cb();
    }
  };
};

// invoke cb for n-1 times, same result after that
export const before = (n, cb) => {
  var init = 0;

  return () => {
    init++;
    if (init < n) {
      cb();
    }
  };
};

// call fn with upto n args
export const ary =
  (fn, n) =>
  (...args) =>
    fn(...args.slice(0, n));

// provide curried version of fn
export const curry = function (fn, arity = fn.length) {
  return function innerCurry(...args) {
    return args.length >= arity
      ? fn(...args)
      : (...nextArgs) => innerCurry(...args, ...nextArgs);
  };
};

const _ = Symbol('_');
export const curryWithPlaceHolder = (fn, arity = fn.length) => {
  const waitForArguments = (...args) => {
    const waitForMoreArguments = (...nextArgs) => {
      const filledArgs = args.map((a) => {
        return a.toString() == _.toString() && nextArgs.length
          ? nextArgs.shift()
          : a;
      });
      return waitForArguments(...filledArgs, ...nextArgs);
    };

    // filter args for _ and check length. if length >= arity then pass ...args  to fn else wait for more args.
    return args.filter((el) => el.toString() !== _.toString()).length >= arity
      ? fn(...args)
      : waitForMoreArguments;
  };
  return waitForArguments;
};

export const curryRight = (fn, arity = fn.length) => {
  const waitForArguments = (...args) =>
    args.length >= arity
      ? fn(...args)
      : (...nextArgs) => waitForArguments(...nextArgs, ...args);

  return waitForArguments;
};

export const curryRightWithPlaceholders = (fn, arity = fn.length) => {
  const waitForArguments = (...args) => {
    const waitForMoreArguments = (...nextArgs) => {
      const filledArgs = args.map((a) =>
        a.toString() === _.toString() && nextArgs.length ? nextArgs.shift() : a
      );
      return waitForArguments(...nextArgs, ...filledArgs);
    };

    return args.filter((a) => a.toString !== _.toString).length >= arity
      ? fn(...args)
      : waitForMoreArguments;
  };
  return waitForArguments;
};

export const partial =
  (fn, ...initArgs) =>
  (...nextArgs) =>
    fn(...initArgs, ...nextArgs);

export const partialWithPlaceholders =
  (fn, ...initArgs) =>
  (...nextArgs) => {
    const filledArgs = initArgs.map((a) =>
      a.toString() === _.toString() && nextArgs.length ? nextArgs.shift() : a
    );
    return fn(...filledArgs, ...nextArgs);
  };

export const partialRight =
  (fn, ...laterArgs) =>
  (...initArgs) =>
    fn(...initArgs, ...laterArgs);

export const partialRightWithPlaceholders =
  (fn, ...laterArgs) =>
  (...initArgs) => {
    const filledArgs = laterArgs.map((a) =>
      a.toString() === _.toString() && initArgs.length ? initArgs.shift() : a
    );
    return fn(...filledArgs, laterArgs);
  };

export const flip =
  (fn) =>
  (...args) =>
    fn(...args.reverse());

export const memoize = (fn, resolver) => {
  var cache = {};
  return (...args) => {
    var key =
      resolver && typeof resolver === 'function'
        ? resolver(...args)
        : cache[args[0]];
    if (!(key in cache)) {
      cache[key] = fn(...args);
    }
    return cache[key];
  };
};

export const negate =
  (fn) =>
  (...args) =>
    !fn(...args);

export const once = (fn) => {
  var count = 0;
  return (...args) => {
    count++;
    if (count <= 1) fn(...args);
  };
};

export const overArgs =
  (fn, transforms) =>
  (...args) =>
    fn(
      ...args.map((a, idx) =>
        idx < transforms.length ? transforms[idx](a) : a
      )
    );

export const rearg =
  (fn, indexes) =>
  (...args) =>
    fn(...indexes.map((i) => (i < args.length ? args[i] : undefined)));

export const rest =
  (fn, start = fn.length - 1) =>
  (...args) => {
    return fn(...args.slice(0, start), args.slice(start));
  };

export const unary = (fn) => (arg) => fn(arg);

export const wrap =
  (val, fn) =>
  (...args) =>
    fn(val, ...args);
