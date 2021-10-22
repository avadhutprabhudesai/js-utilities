import {
  after,
  ary,
  before,
  curry,
  curryRight,
  curryRightWithPlaceholders,
  curryWithPlaceHolder,
  flip,
  memoize,
  negate,
  once,
  overArgs,
  partial,
  partialRight,
  partialRightWithPlaceholders,
  partialWithPlaceholders,
  rearg,
  rest,
  unary,
  wrap,
} from '.';

const _ = Symbol('_');

const sum = (a, b, c) => a + b + c;
const variadicSum = (...inputs) => inputs.reduce((acc, val) => acc + val, 0);

const curriedSum = curry(sum);
const curriedPlaceHolder = curryWithPlaceHolder(sum);

const createGame = (type, place, country1, country2) => {
  return `A game of ${type} is going to happen at ${place} between ${country1} and ${country2}`;
};
const greet = (msg, who) => `${msg} ${who}`;

const isEven = (num) => num % 2 === 0;

var initCount = 10;

const incCount = () => {
  initCount += 10;
};

const square = (x) => x * x;
const mult = (...args) => args.reduce((acc, val) => acc * val, 1);
const div = (x, y) => x / y;
const add = (x, y = 0) => x + y;

const announce = (pre, list) => `${pre} ${list.join(', ')}`;

const textFormatter = (f, text) => f(text);

describe('Testing lodash/after', () => {
  var employees = ['Bob', 'Smith'];
  var count = 0;
  var afterAllEmps = after(employees.length, () => {
    count += 10;
  });
  var immediate = after(0, () => {
    count += 10;
  });
  beforeEach(() => {
    count = 0;
  });
  it('should return a function', () => {
    expect(typeof afterAllEmps).toEqual('function');
  });
  it('should invoke callback after the returned function is called n times where n!=0', () => {
    afterAllEmps();
    expect(count).toEqual(0);
    afterAllEmps();
    expect(count).toEqual(10);
    afterAllEmps();
    expect(count).toEqual(20);
  });
  it('should invoke callback after the returned function is called for the first time where n === 0', () => {
    immediate();
    expect(count).toEqual(10);
    immediate();
    expect(count).toEqual(20);
  });
});

describe('Testing lodash/before', () => {
  var employees = ['Bob', 'Smith', 'Sarah', 'April'];
  var count = 0;
  var tillAllEmps = before(employees.length, () => {
    count += 10;
  });
  var immediate = before(0, () => {
    count += 10;
  });
  beforeEach(() => {
    count = 0;
  });
  it('should return a function', () => {
    expect(typeof tillAllEmps).toEqual('function');
  });
  it('should invoke the callback function till returned function is called less than n times, where n !== 0', () => {
    tillAllEmps();
    tillAllEmps();
    tillAllEmps();
    expect(count).toEqual(30);
    tillAllEmps();
    tillAllEmps();
    expect(count).toEqual(30);
  });
  it('should never call the callback if n <= 0', () => {
    immediate();
    immediate();
    immediate();
    expect(count).toEqual(0);
  });
});

describe('Testing lodash/ary', () => {
  it('should return a function', () => {
    expect(typeof ary(variadicSum, 2)).toEqual('function');
  });
  it('should invoke the fn with upto n arguments', () => {
    const first2 = ary(variadicSum, 2);
    expect(first2(1, 2, 3, 4, 5)).toEqual(3);
  });
});

describe('Testing lodash/curry', () => {
  const curriedVariadicSum = curry(variadicSum, 3);

  it('should return a function', () => {
    expect(typeof curriedSum).toEqual('function');
  });
  it('should accept arguments at different points in time', () => {
    expect(curriedSum(1)(2)(3)).toEqual(6);
    expect(curriedSum(1, 2)(3)).toEqual(6);
    expect(curriedSum(1)(2, 3)).toEqual(6);
    expect(curriedSum(1, 2, 3)).toEqual(6);
  });
  it('should provide curried version of variadic args function, with arity specified', () => {
    expect(curriedVariadicSum(1)(2)(3)).toEqual(6);
    expect(curriedVariadicSum(1, 2)(3)).toEqual(6);
    expect(curriedVariadicSum(1)(2, 3)).toEqual(6);
    expect(curriedVariadicSum(1, 2, 3)).toEqual(6);
  });
});

describe('Testing lodash/curry with placeholders', () => {
  it('should accept placeholder as first argument', () => {
    expect(curriedPlaceHolder(_)('a')('b')('c')).toEqual('abc');
    expect(curriedPlaceHolder(_, 'b')('a')('c')).toEqual('abc');
    expect(curriedPlaceHolder(_, 'b', 'c')('a')).toEqual('abc');
  });
  it('should accept placeholder as second argument', () => {
    expect(curriedPlaceHolder('a', _)('b')('c')).toEqual('abc');
    expect(curriedPlaceHolder('a', _, 'c')('b')).toEqual('abc');
  });
  it('should accept placeholder as third argument', () => {
    expect(curriedPlaceHolder('a', 'b', _)('c')).toEqual('abc');
  });
  it('should accept placeholder at any position', () => {
    expect(curriedPlaceHolder(_, _, _)('a')('b')('c')).toEqual('abc');
    expect(curriedPlaceHolder(_, 'b', _)('a')('c')).toEqual('abc');
    expect(curriedPlaceHolder('a', _, _)('b')('c')).toEqual('abc');
    expect(curriedPlaceHolder(_, _, 'c')('a')('b')).toEqual('abc');
  });
});

describe('Testng lodash/curryRight', () => {
  it('should return a function', () => {
    expect(typeof curryRight(sum)).toEqual('function');
  });
  it('should apply the arguments from right to left', () => {
    expect(curryRight(sum)('c')('b')('a')).toEqual('abc');
    expect(curryRight(sum)('c')('a', 'b')).toEqual('abc');
    expect(curryRight(sum)('b', 'c')('a')).toEqual('abc');
  });
});

describe('Testing lodash/curryRight with placeholders', () => {
  it('should return a function', () => {
    expect(typeof curryRightWithPlaceholders(sum)).toEqual('function');
  });
  it('should accept the arguments from right to left with placeholders', () => {
    expect(curryRightWithPlaceholders(sum)('c')(_, 'b')('a')).toEqual('abc');
    expect(curryRightWithPlaceholders(sum)('c')('a', _)('b')).toEqual('abc');
    expect(curryRightWithPlaceholders(sum)(_)('c', 'b')('a')).toEqual('abc');
    expect(curryRightWithPlaceholders(sum)(_, _, 'c')('a', 'b')).toEqual('abc');
  });
});

describe('Testing lodash/partial', () => {
  const cricketInMumbaiBetween = partial(createGame, 'cricket', 'Mumbai');
  const soccerAtBarcelonaWithSpain = partial(
    createGame,
    'soccer',
    'Barcelona',
    'Spain'
  );
  it('should return a function', () => {
    expect(typeof cricketInMumbaiBetween).toEqual('function');
  });
  it('should accept few params at first and rest later', () => {
    expect(cricketInMumbaiBetween('India', 'England')).toEqual(
      'A game of cricket is going to happen at Mumbai between India and England'
    );
    expect(soccerAtBarcelonaWithSpain('Portugal')).toEqual(
      'A game of soccer is going to happen at Barcelona between Spain and Portugal'
    );
  });
});

describe('Testing lodash/partial with placeholders', () => {
  const soccer = partialWithPlaceholders(createGame, 'soccer');
  const gamesAtDelhi = partialWithPlaceholders(createGame, _, 'Delhi');
  it('should return a function', () => {
    expect(typeof soccer).toEqual('function');
  });
  it('should accept few params with placeholders', () => {
    expect(gamesAtDelhi('Badminton', 'India', 'China')).toEqual(
      'A game of Badminton is going to happen at Delhi between India and China'
    );
  });
});

describe('Testing lodash/partialRight', () => {
  const indVsPak = partialRight(createGame, 'India', 'Pakistan');
  it('should return a function', () => {
    expect(typeof indVsPak).toEqual('function');
  });
  it('should accept last 2 args first and first 2 later', () => {
    expect(indVsPak('Cricket', 'Kolkata')).toEqual(
      'A game of Cricket is going to happen at Kolkata between India and Pakistan'
    );
  });
});

describe('Testing lodash/partialRight with placeholders', () => {
  it('should return a function', () => {
    expect(typeof partialRightWithPlaceholders(greet, 'John', _)).toEqual(
      'function'
    );
  });
  it('should accept few params with placeholders', () => {
    expect(partialRightWithPlaceholders(greet, 'John', _)('Welcome')).toEqual(
      'John Welcome'
    );
    expect(
      partialRightWithPlaceholders(greet, _, 'You are welcome!')('John,')
    ).toEqual('John, You are welcome!');
  });
});

describe('Testing lodash/flip', () => {
  it('should return a function', () => {
    expect(typeof flip(sum)).toEqual('function');
  });
  it('should flip the arguments before passing it to the callback function', () => {
    expect(flip(sum)('a', 'b', 'c')).toEqual('cba');
  });
});

describe('Testing lodash/memoize', () => {
  it('should return a function', () => {
    expect(typeof memoize(sum)).toEqual('function');
  });
  it('should accept a resolver function and pass it the arguments received in function to be memoized ', () => {
    var count;
    const memoSum = memoize(sum, (...args) => {
      count = args;
    });
    memoSum('a', 'b', 'c');
    expect(count.join('')).toEqual('abc');
  });
  it('should memoize the result of a function in the cache against the first argument, when resolver is not provided', () => {
    const memoSum = memoize(sum);
    expect(memoSum(1, 2, 3)).toEqual(6);
    expect(memoSum(1, 3, 3)).toEqual(6);
    expect(memoSum(1, 1, 1)).toEqual(6);
  });
  it('should memoize the result of a function in the cache against the cache provided by the resolver', () => {
    const memoSum = memoize(sum, (...args) => args.join(','));
    expect(memoSum(1, 2, 3)).toEqual(6);
    expect(memoSum(1, 2, 3)).toEqual(6);
    expect(memoSum(1, 10, 9)).toEqual(20);
  });
});

describe('Testing lodash/negate', () => {
  const isOdd = negate(isEven);
  it('should return a function', () => {
    expect(typeof isOdd).toEqual('function');
  });
  it('should negate the result of a predicate func', () => {
    expect(isOdd(3)).toBeTruthy();
  });
});

describe('Testing lodash/once', () => {
  it('should return a function', () => {
    expect(typeof once(incCount)).toEqual('function');
  });
  it('should invoke the passed in function only once', () => {
    const onceCount = once(incCount);
    onceCount();
    onceCount();
    expect(initCount).toEqual(20);
  });
});

describe('Testing lodash/overArgs', () => {
  const volCone = overArgs(mult, [curryRight(div)(3), square]);
  it('should return a function', () => {
    expect(typeof volCone).toEqual('function');
  });
  it('should transform input arguments with transforms at respective indices', () => {
    expect(parseInt(volCone(3.14, 3, 3))).toEqual(28);
  });
});

describe('Testing lodash/rearg', () => {
  it('should return a function', () => {
    expect(typeof rearg(sum, [2, 0, 1])).toEqual('function');
  });
  it('should rearrange the arguments as per the indexes provided in the input array', () => {
    expect(rearg(sum, [2, 0, 1])('a', 'b', 'c')).toEqual('cab');
    expect(rearg(sum, [0, 1, 2])('a', 'b', 'c')).toEqual('abc');
    expect(rearg(sum, [1, 0, 2])('a', 'b', 'c')).toEqual('bac');
    expect(rearg(sum, [1, 0, 2])('a', 'b')).toEqual('baundefined');
  });
});

describe('Testing lodash/rest', () => {
  it('should return a function', () => {
    expect(typeof rest(announce)).toEqual('function');
  });
  it('should invoke the function by passing arugments from start as an array', () => {
    expect(rest(announce)('The winners are', 'John', 'Bob', 'Smith')).toEqual(
      'The winners are John, Bob, Smith'
    );
    expect(
      rest(announce, 1)('The winners are', 'John', 'Bob', 'Smith')
    ).toEqual('The winners are John, Bob, Smith');
  });
});

describe('Testing lodash/unary', () => {
  it('should return a function', () => {
    expect(typeof unary(sum)).toEqual('function');
  });
  it('should pass on only 1 argument to wrapped function', () => {
    expect(unary(add)(5, 4)).toEqual(5);
  });
});

describe('Testing lodash/wrap', () => {
  const toUpper = wrap((x) => x.toUpperCase(), textFormatter);
  const toLower = wrap((x) => x.toLowerCase(), textFormatter);
  it('should return a function', () => {
    expect(typeof toUpper).toEqual('function');
  });
  it('should pass the wrapped value as first argument to the function', () => {
    expect(toUpper('john')).toEqual('JOHN');
    expect(toLower('JOHN')).toEqual('john');
  });
});
