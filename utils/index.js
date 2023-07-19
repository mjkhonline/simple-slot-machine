export function asyncTimeout(ms) {
    return new Promise(resolve => setTimeout(resolve,ms))
}

export function rnd(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

export function probability(prob) {
    return Math.random() < prob / 100
}
