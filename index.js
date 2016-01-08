var permutation = require('permutation');
var frequency = require('freq');

// Make all permutations of the card order, e.g.
// [ '4', '3', '2', '1', '0' ],
// [ '4', '3', '2', '0', '1' ],
// [ '4', '3', '1', '2', '0' ],
// [ '4', '3', '1', '0', '2' ],
// [ '4', '3', '0', '2', '1' ]...
var cases = permutation('43210').map(function(i) { return i.split('').map(function(c) { return Number(c); }); });

// Our strategy as a function
function strategy (c) {
  var max = 0;
  for (var i = 0; i < c.length; i++) {
    // if the number is less than the max, return it as the solution
    if (c[i] < max) {
      return c[i];
    // otherwise store our new number as the max
    } else {
      max = c[i];
    }
  }
  // there is one case where we never return: [0, 1, 2, 3, 4] and this is when
  // we have to "take the last offer"
  return 4;
}

// calculate the outcomes of all our cases
var outcomes = cases.map(function(c) { return strategy(c); });

// [ 3,
//   3,
//   3,
//   3,
//   3,
//   3,
//   2,
//   2,
//   2,
//   2,
//   2...

// calculate the frequency of each outcome (this particular library needs a
// string as input)
var numbers = ['zero', 'one', 'two', 'three', 'four'];
var freqs = frequency(outcomes.map(function(o) { return numbers[o]; }));

// [ { word: 'zero', count: 41 },
  // { word: 'one', count: 35 },
  // { word: 'two', count: 27 },
  // { word: 'three', count: 16 },
  // { word: 'four', count: 1 } ]

// calculate our expected value
var ev = freqs.reduce(function (a, b)
  { return a + numbers.indexOf(b.word) * b.count }, 0) / outcomes.length;

// The Answer (multiplied by 100 because we left that out)
console.log(ev * 100);
