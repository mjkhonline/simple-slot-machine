/**
 * Returns a promise that resolves after a specified number of milliseconds.
 * @param {number} ms - The number of milliseconds to wait before resolving the promise.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 */
export function asyncTimeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Returns a random integer between min (inclusive) and max (exclusive).
 * @param {number} min - The minimum value (inclusive).
 * @param {number} max - The maximum value (exclusive).
 * @returns {number} A random integer between min and max.
 */
export function rnd(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

/**
 * Returns true with the given probability.
 * @param {number} prob - The probability, as a percentage, of returning true.
 * @returns {boolean} True with the given probability, false otherwise.
 */
export function probability(prob) {
  return Math.random() < prob / 100
}

/**
 * Returns a random position within a circle of the given radius.
 * @param {number} len - The radius of the circle.
 * @param {string} [unit='px'] - The unit to use for the position values.
 * @returns {{x: string, y: string}} An object with x and y properties representing the random position.
 */
export function rndPosition(len, unit = 'px') {
  const angle = Math.random() * (2 * Math.PI)

  return {
    x: Math.cos(angle) * len + unit,
    y: Math.sin(angle) * len + unit
  }
}

/**
 * Returns true if all items (primitive values) in the array are equal, false otherwise.
 * @param {Array} arr - The array to check.
 * @returns {boolean} True if all items in the array are equal, false otherwise.
 */
export function areAllItemsEqual(arr) {
  return arr.every((item) => item === arr[0])
}
