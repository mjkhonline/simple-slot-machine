/**
 * The default number of blocks of the slot machine.
 * @type {number}
 */
export const BLOCKS_COUNT = 3

/**
 * The default initial credit for the player.
 * @type {number}
 */
export const INIT_CREDIT = 10

/**
 * The default cost of rolling the slots.
 * @type {number}
 */
export const ROLLING_COST = 1

/**
 * The default delay in milliseconds before revealing each block.
 * @type {number}
 */
export const REVEAL_DELAY = 1000

/**
 * The supported symbols in the game, with their name and reward value.
 * @type {Array<{name: string, reward: number}>}
 */
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

/**
 * The rules for cheating, based on the player's credit.
 * @type {Array<{condition: function(number): boolean, reRollProbability: number}>}
 */
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
