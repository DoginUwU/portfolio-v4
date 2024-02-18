<template>
  <div v-if="data" class="flex flex-col text-sm w-full">
    <h2 class="text-base uppercase">
      {{ data.name }}
    </h2>
    <span class="text-gray-400">{{ data.album }}</span>
    <div class="flex items-center justify-center gap-4 mt-2">
      <span class="text-sm">{{ currentProgress }}</span>
      <div class="relative w-full h-1 bg-gray-400 rounded-xl overflow-hidden">
        <div class="absolute top-0 left-0 h-full bg-purple-600 " :style="{ width: progressWidth }" />
      </div>
      <span class="text-sm">{{ convertMsToMinutes(data.duration) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, computed } from 'vue'
const { data } = useFetch('/api/services/spotify')

const state = reactive({
  currentProgress: 0,
  interval: 0,
})

watch(() => data.value, () => {
  state.currentProgress = data.value?.currentProgress || data.value?.duration || 0
  window.clearInterval(state.interval)

  state.interval = window.setInterval(() => {
    if (data.value && state.currentProgress >= data.value.duration) {
      window.clearInterval(state.interval)
      return
    }

    state.currentProgress += 1000
  }, 1000)
}, { deep: true, immediate: true })

const currentProgress = computed(() => {
  return convertMsToMinutes(state.currentProgress)
})

const progressWidth = computed(() => {
  if (!data.value) return '0%'
  const percentage = (state.currentProgress / data.value.duration) * 100

  return `${percentage}%`
})

function convertMsToMinutes(ms: number) {
  const minutes = Math.floor(ms / 60000)
  const seconds = ((ms % 60000) / 1000).toFixed(0)
  return `${minutes}:${+seconds < 10 ? '0' : ''}${seconds}`
}
</script>
