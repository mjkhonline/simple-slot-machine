<script setup>
import { computed } from 'vue'
import { SUPPORTED_SYMBOLS } from '../../appConfig'

const props = defineProps({
  state: {
    type: String,
    required: true,
    validator(value) {
      return ['empty', 'spinning', 'revealed'].includes(value)
    }
  },
  symbol: {
    type: String,
    required: false,
    validator(value) {
      return SUPPORTED_SYMBOLS.map((v) => v.name).includes(value)
    }
  }
})

const imgSrc = computed(
  () =>
    ({
      empty: '/img/emptyBlock.png',
      spinning: '/img/spin.svg',
      revealed: `/img/${props.symbol}.svg`
    }[props.state])
)
</script>

<template>
  <div class="border-2 border-gray-400 p-4 rounded-xl">
    <div class="w-[200px] h-[250px] flex justify-center items-center">
      <img :src="imgSrc" alt="block image" width="200" height="200" />
    </div>
  </div>
</template>
