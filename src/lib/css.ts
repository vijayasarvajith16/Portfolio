/** CSS mask that keeps only a ring between `inner`% and `outer`% of an element's radius. */
export const ringMask = (inner: number, outer: number) =>
  `radial-gradient(circle closest-side, transparent ${inner}%, #000 ${inner + 1}%, #000 ${outer}%, transparent ${outer + 1}%)`;
