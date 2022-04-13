# EuclideanRhythms-P5
An Euclidean Rhythms generator implemented in p5.js.

## Summary

As the name suggests, Euclidean rhythms have roots in ancient Greek geometry before entering the world of modern music creation.

The musical properties of the Euclid's ubiquitous greatest common divisor algorithm were discovered by Godfried Toussaint in 2005 and are described in his paper ["The Euclidean Algorithm Generates Traditional Musical Rhythms"](http://cgm.cs.mcgill.ca/~godfried/publications/banff.pdf). In short, he demonstrates how this mathematical principle can produce rhythms that are found in numerous and disparate styles of music from around the world and throughout history.

## Implementation

This implementation is based on the Bjorklund algorithm, which was first introduced in nuclear physics for timing patterns in neutron accelerators but then re-imagined by Toussaint to produce sequences of maximally even rhythms.

It takes a number of steps (n) and finds the most even way to space pulses (k) within the window using only integers: if n is not evenly divisible by k, there will be two different durations between the evenly-spaced pulses. For example, k = 7 and n = 16 produces [ 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0 ].

For the algorithm details, the reference is Bjorklund's paper ["The Theory of Rep-Rate Pattern Generation in the SNS Timing System"](https://www.semanticscholar.org/paper/The-Theory-of-Rep-Rate-Pattern-Generation-in-the-Bjorklund/c652d0a32895afc5d50b6527447824c31a553659) (where he provides C code).

I set up four independent sequencers synchronized by the same clock, in order to enhance the polyrhythmic capabilities of the algorithm.