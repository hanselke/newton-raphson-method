'use strict'

import Big from 'big.js'

Big.DP = 100

interface Options {
  tolerance: Big
  maxIterations: number
  h: Big
  verbose: boolean
}

type F = (x: Big) => Big

export function newtonRaphson(f: F, x0: Big, options?: Partial<Options>, fp?: F): Big | false {
  var x1, y, yp, tol, maxIter, iter, yph, ymh, yp2h, ym2h, h, hr, verbose

  options = options || {}
  tol = new Big(options.tolerance === undefined ? 1e-7 : options.tolerance)
  maxIter = options.maxIterations === undefined ? 20 : options.maxIterations
  h = new Big(options.h === undefined ? 1e-4 : options.h)
  verbose = options.verbose === undefined ? false : options.verbose
  hr = new Big(1).div(h)

  iter = 0
  while (iter++ < maxIter) {
    // Compute the value of the function:
    y = f(x0)

    if (fp) {
      yp = fp(x0)
    } else {
      // Needs numerical derivatives:
      yph = f(x0.plus(h))
      ymh = f(x0.minus(h))
      yp2h = f(x0.plus(h.mul(2)))
      ym2h = f(x0.minus(h.mul(2)))

      yp = ym2h
        .minus(yp2h)
        .plus(new Big(8).mul(yph.minus(ymh)))
        .mul(hr)
        .div(12)
    }

    // Update the guess:
    x1 = x0.minus(y.div(yp))

    // Check for convergence:
    if (
      x1
        .minus(x0)
        .abs()
        .lte(tol.mul(x1.abs()))
    ) {
      if (verbose) {
        console.log('Newton-Raphson: converged to x = ' + x1 + ' after ' + iter + ' iterations')
      }
      return x1
    }

    // Transfer update to the new guess:
    x0 = x1
  }

  if (verbose) {
    console.log('Newton-Raphson: Maximum iterations reached (' + maxIter + ')')
  }

  return false
}
