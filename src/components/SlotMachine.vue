<script setup>
import {
  BLOCKS_COUNT,
  INIT_CREDIT,
  ROLLING_COST,
  SUPPORTED_SYMBOLS,
  CHEATING_RULES,
  REVEAL_DELAY
} from '../../appConfig'
import SlotBlock from '@/components/SlotBlock.vue'
import CashOutButton from '@/components/CashOutButton.vue'
import { reactive, computed, ref } from 'vue'
import { rnd, asyncTimeout, probability, areAllItemsEqual } from '../../utils'

const props = defineProps({
  numberOfBlocks: {
    type: Number,
    required: false,
    default: BLOCKS_COUNT
  },
  initCredit: {
    type: Number,
    required: false,
    default: INIT_CREDIT
  },
  rollingCost: {
    type: Number,
    required: false,
    default: ROLLING_COST
  },
  revealDelay: {
    type: Number,
    required: false,
    default: REVEAL_DELAY
  }
})

const machine = reactive({
  state: 'init',
  credit: props.initCredit,
  blocks: new Array(props.numberOfBlocks).fill({ state: 'empty' })
})

const blocksSymbols = computed(() => machine.blocks.map(({ symbol }) => symbol))
const isWinningRoll = computed(() => areAllItemsEqual(blocksSymbols.value))
const isGameOver = computed(() => machine.state === 'idle' && machine.credit < props.rollingCost)
const isRollingUnavailable = computed(() => machine.state === 'rolling' || isGameOver.value)
const isResetUnavailable = computed(() => machine.state === 'rolling' || machine.state === 'init')
const isCashOutUnavailable = computed(() => machine.state !== 'idle' || machine.credit <= 0)
const displayState = computed(() => {
  if (machine.state === 'init') {
    return "Let's Play!"
  }
  if (isWinningRoll.value && machine.state === 'idle') {
    return 'Win! 🎉'
  }
  if (machine.state === 'cashed-out') {
    return `Your Credit: ${machine.credit}, will be deposited into your account.`
  }
  return ''
})
const cashOutBtn = ref(null)

async function roll() {
  if (isRollingUnavailable.value) return

  machine.state = 'rolling'
  machine.credit -= props.rollingCost
  machine.blocks = machine.blocks.map(() => ({ state: 'spinning' }))

  const generatedSymbols = generateSymbols()
  for (let i = 0; i < props.numberOfBlocks; i++) {
    await asyncTimeout(props.revealDelay)
    const block = machine.blocks[i]
    block.symbol = generatedSymbols[i]
    block.state = 'revealed'
  }

  if (isWinningRoll.value) {
    machine.credit += calcReward()
  }
  machine.state = 'idle'
}

function generateSymbols() {
  const symbols = new Array(props.numberOfBlocks).fill('').map(getARandomSymbol)

  if (areAllItemsEqual(symbols)) {
    const { reRollProbability: prob } = CHEATING_RULES.find((rule) =>
      rule.condition(machine.credit)
    )

    if (probability(prob)) {
      return generateSymbols()
    }
  }

  return symbols
}

function calcReward() {
  return SUPPORTED_SYMBOLS.find((symbol) => symbol.name === blocksSymbols.value[0]).reward
}

function getARandomSymbol() {
  return SUPPORTED_SYMBOLS[rnd(0, SUPPORTED_SYMBOLS.length)].name
}

async function cashOut() {
  machine.state = 'cashed-out'
  await asyncTimeout(3000)
  resetGame()
}

function resetGame() {
  machine.credit = props.initCredit
  machine.blocks = machine.blocks.fill({ state: 'empty' })
  machine.state = 'init'
  cashOutBtn.value.resetPosition()
}
</script>

<template>
  <div class="w-2/3 min-w-[700px] border-2 border-gray-400 relative">
    <!-- <state>  -->
    <p class="state text-emerald-700 text-center text-2xl font-bold mt-2 min-h-[32px]">
      {{ displayState }}
    </p>
    <!-- <state/>  -->

    <!-- <Blocks>  -->
    <div class="flex flex-row justify-around items-center p-4 mt-20 mb-24">
      <SlotBlock
        v-for="(block, i) in machine.blocks"
        :key="i"
        :state="block.state"
        :symbol="block.symbol"
      />
    </div>
    <!-- <Blocks/>  -->

    <!-- <machine dashboard>  -->
    <div class="border-2 border-gray-200 flex flex-row justify-around items-center p-4">
      <CashOutButton ref="cashOutBtn" @clicked="cashOut" :is-disabled="isCashOutUnavailable" />

      <button
        :class="{ 'btn-disabled': isRollingUnavailable }"
        :disabled="isRollingUnavailable"
        type="button"
        class="btn bg-emerald-500 w-1/3"
        @click="roll"
      >
        Spin
      </button>

      <button
        :class="{ 'btn-disabled': isResetUnavailable }"
        :disabled="isResetUnavailable"
        type="button"
        class="btn bg-amber-600"
        @click="resetGame"
      >
        Start Over
      </button>
    </div>
    <!-- <machine dashboard/>  -->

    <!-- <credit> -->
    <div
      class="absolute right-[-2px] top-[-52px] h-[50px] bg-indigo-200 border-2 border-indigo-200 px-3 py-1"
    >
      <p class="credit text-2xl mb-3">
        Credit: {{ machine.credit }}
        <span
          class="rounded-full bg-gray-700 w-[30px] h-[30px] inline-block text-center text-white text-[17px]"
          >C</span
        >
      </p>
    </div>
    <!-- <credit/> -->

    <!-- <game-over> -->
    <div
      v-if="isGameOver"
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-400 py-16 px-64 rounded-xl"
    >
      <p class="text-4xl font-bold text-red-500 whitespace-nowrap">Game Over!!</p>
    </div>
    <!-- <game-over/> -->
  </div>
</template>
