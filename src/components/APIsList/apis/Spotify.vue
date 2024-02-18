<template>
  <section v-if="pending" class="flex flex-col gap-2">
    <skeleton-bar class="h-3 w-[40%]" />
    <skeleton-bar class="h-2 w-[20%]" />
    <skeleton-bar class="mt-2 h-2 w-[100%]" />
  </section>
  <div v-else-if="data" class="flex flex-col text-sm w-full">
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
import { reactive, onMounted, onBeforeUnmount, computed } from 'vue'
import SkeletonBar from '~/components/Skeletons/SkeletonBar.vue'
const { data, pending } = await useFetch('/api/services/spotify')

const state = reactive({
  currentProgress: 0,
  interval: null as NodeJS.Timeout | null,
})

onMounted(() => {
  state.currentProgress = data.value?.currentProgress || data.value?.duration || 0
  clearInterval(state.interval!)

  state.interval = setInterval(() => {
    if (data.value && state.currentProgress >= data.value.duration) {
      clearInterval(state.interval!)
      return
    }

    state.currentProgress += 1000
  }, 1000)
})

onBeforeUnmount(() => {
  clearInterval(state.interval!)
})

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
