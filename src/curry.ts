export function curry<T extends unknown[], U extends unknown[], R>(
  fn: (...args: [...T, ...U]) => R,
  ...a: T
) {
  return (...b: U) => fn(...a, ...b);
}
