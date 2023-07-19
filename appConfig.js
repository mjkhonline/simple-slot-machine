export const BLOCKS_COUNT = 3

export const INIT_CREDIT = 10

export const ROLLING_COST = 1

export const REVEAL_DELAY = 1000

export const SUPPORTED_SYMBOLS = [
  {
    name: 'cherry',
    reward: 10
  },
  {
    name: 'lemon',
    reward: 20
  },
  {
    name: 'orange',
    reward: 30
  },
  {
    name: 'watermelon',
    reward: 40
  }
]

export const CHEATING_RULES = [
  {
    condition: (credit) => credit < 40,
    reRollProbability: 0
  },
  {
    condition: (credit) => credit >= 40 && credit <= 60,
    reRollProbability: 30
  },
  {
    condition: (credit) => credit > 60,
    reRollProbability: 60
  }
]
