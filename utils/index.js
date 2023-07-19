export function asyncTimeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function rnd(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

export function probability(prob) {
  return Math.random() < prob / 100
}

export function rndPosition(len, unit = 'px') {
  const angle = Math.random() * (2 * Math.PI)

  return {
    x: Math.cos(angle) * len + unit,
    y: Math.sin(angle) * len + unit
  }
}

export function areAllItemsEqual(arr) {
  return arr.every((item) => item === arr[0])
}
