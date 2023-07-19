<script setup>
import { ref, computed } from 'vue'
import { probability, rndPosition } from '../../utils'

const props = defineProps({
  isDisabled: {
    type: Boolean,
    required: false,
    default: false
  }
})

const emit = defineEmits(['clicked'])

const btn = ref(null)
const isClickable = ref(true)
const isBtnDisabled = computed(() => props.isDisabled || !isClickable.value)

function onMouseOver() {
  isClickable.value = !probability(40)

  if (probability(50)) {
    const pos = rndPosition(300)
    btn.value.style.transform = `translate(${pos.x}, ${pos.y})`
  }
}

function onClick() {
  if (isBtnDisabled.value) return
  emit('clicked')
}

function resetPosition() {
  btn.value.style.transform = `translate(0, 0)`
}

defineExpose({ resetPosition })
</script>

<template>
  <button
    :class="{ 'btn-disabled': isBtnDisabled }"
    ref="btn"
    type="button"
    class="btn bg-red-600 relative transition-all duration-200"
    @mouseover.self="onMouseOver"
    @click="onClick"
  >
    Cash Out
  </button>
</template>
