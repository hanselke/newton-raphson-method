'use strict'

import {BigNumber , BigNumberish } from '@ethersproject/bignumber'



interface Options {
  tolerance: BigNumberish
  maxIterations: number
  h: BigNumberish
  verbose: boolean
}

type F = (x: BigNumber) => BigNumber

export function newtonRaphson(f: F, x0: BigNumberish, options?: Partial<Options>, fp?: F): BigNumber | false {
  var x1, y, yp, tol, maxIter, iter, yph, ymh, yp2h, ym2h, h, hr, verbose

  options = options || {}
  tol = BigNumber.from(options.tolerance === undefined ? 1e-7 : options.tolerance)
  maxIter = options.maxIterations === undefined ? 20 : options.maxIterations
  h = BigNumber.from(options.h === undefined ? 1e-4 : options.h)
  verbose = options.verbose === undefined ? false : options.verbose
  hr = BigNumber.from(1).div(h)
  x0 = BigNumber.from(x0)

  iter = 0
  while (iter++ < maxIter) {
    // Compute the value of the function:
    y = f(BigNumber.from(x0))

    if (fp) {
      yp = fp(BigNumber.from(x0))
    } else {
      // Needs numerical derivatives:
      yph = f(BigNumber.from(x0).add(h))
      ymh = f(BigNumber.from(x0).sub(h))
      yp2h = f(BigNumber.from(x0).add(h.mul(2)))
      ym2h = f(BigNumber.from(x0).sub(h.mul(2)))

      yp = ym2h
        .sub(yp2h)
        .add(BigNumber.from(8).mul(yph.sub(ymh)))
        .mul(hr)
        .div(12)
    }

    // Update the guess:
    x1 = BigNumber.from(x0).sub(y.div(yp))

    // Check for convergence:
    if (
      x1
        .sub(x0)
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
