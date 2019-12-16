# newton-raphson-method


> Find zeros of a function using [Newton's Method](https://en.wikipedia.org/wiki/Newton%27s_method)

[![Build Status][travis-image]][travis-url] [![npm version][npm-image]][npm-url]  [![Dependency Status][daviddm-image]][daviddm-url] [![js-semistandard-style][semistandard-image]][semistandard-url]

## Introduction

This is a fork of [scijs/newton-raphson-method](https://github.com/scijs/newton-raphson-method) that uses [big.js](https://github.com/MikeMcl/big.js/) instances instead of plain javascript numbers.

The Newton-Raphson method uses the tangent of a curve to iteratively approximate a zero of a function, `f(x)`. This yields the update:<p align="center"><img alt="x&lowbar;&lcub;i &plus; 1&rcub; &equals; x&lowbar;i -&bsol;frac&lcub;f&lpar;x&lowbar;i&rpar;&rcub;&lcub;f&apos;&lpar;x&lowbar;i&rpar;&rcub;&period;" valign="middle" src="images/x_i-1-x_i-fracfx_ifx_i-e7e51496fc.png" width="172.5" height="53.5"></p>

## Example

Consider the zero of `(x + 2) * (x - 1)` at `x = 1`:

```javascript
const { newtonRaphson } = require('@fvictorio/newton-raphson-method');

function f (x) { return x.minus(1).mul(x.plus(2)); }
function fp (x) { return x.minus(1).plus(x).plus(2); }

// Using the derivative:
newtonRaphson(f, 2, fp)
// => 1.0000000000000000 (6 iterations)

// Using a numerical derivative:
newtonRaphson(f, 2)
// => 1.0000000000000000 (6 iterations)
```

## Installation

```bash
$ npm install @fvictorio/newton-raphson-method
```

## API

#### `newtonRaphson(f, x0[, fp, options])`

Given a real-valued function of one variable, iteratively improves and returns a guess of a zero.

**Parameters**:
- `f`: The numerical function of one variable of which to compute the zero.
- `x0`: A number representing the intial guess of the zero. Can be a number or a big.js instance.
- `fp` (optional): The first derivative of `f`. If not provided, is computed numerically using a fourth order central difference with step size `h`.
- `options` (optional): An object permitting the following options:
  - `tolerance` (default: `1e-7`): The tolerance by which convergence is measured. Convergence is met if `|x[n+1] - x[n]| <= tolerance * |x[n+1]|`.
  - `maxIterations` (default: `20`): Maximum permitted iterations.
  - `h` (default: `1e-4`): Step size for numerical differentiation.
  - `verbose` (default: `false`): Output additional information about guesses, convergence, and failure.

**Returns**: If convergence is achieved, returns a big.js instance with an approximation of the zero. If the algorithm fails, returns `false`.

## See Also

- [`modified-newton-raphson`](https://github.com/scijs/modified-newton-raphson): A simple modification of Newton-Raphson that may exhibit improved convergence.
- [`newton-raphson`](https://www.npmjs.com/package/newton-raphson): A similar and lovely implementation that differs (only?) in requiring a first derivative.

## License

&copy; 2016 Scijs Authors. MIT License.

## Authors

Ricky Reusser

[npm-image]: https://badge.fury.io/js/newton-raphson-method.svg
[npm-url]: https://npmjs.org/package/newton-raphson-method
[travis-image]: https://travis-ci.org/scijs/newton-raphson-method.svg?branch=master
[travis-url]: https://travis-ci.org/scijs/newton-raphson-method
[daviddm-image]: https://david-dm.org/scijs/newton-raphson-method.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/scijs/newton-raphson-method
[semistandard-image]: https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square
[semistandard-url]: https://github.com/Flet/semistandard
