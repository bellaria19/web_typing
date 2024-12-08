/**
 * Rounds a number to one decimal places.
 * @param num The number to round.
 * @returns The input number rounded to one decimal places.
 */
export function roundTo1(num: number): number {
  return Math.round((num + Number.EPSILON) * 10) / 10;
}

/**
 * Rounds a number to two decimal places.
 * @param num The number to round.
 * @returns The input number rounded to two decimal places.
 */
export function roundTo2(num: number): number {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

/**
 * Calculates the mean (average) of an array of numbers.
 * @param array An array of numbers.
 * @returns The mean of the input array.
 */
export function mean(array: number[]): number {
  try {
    return (
      array.reduce((previous, current) => (current += previous)) / array.length
    );
  } catch (e) {
    return 0;
  }
}
