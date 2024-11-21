<template>
  <div
    v-if="state.data"
    class="flex flex-col text-sm w-full"
  >
    <h2 class="text-base uppercase">
      {{ state.data.name }}
    </h2>
    <span class="text-gray-400">{{ state.data.album }}</span>
    <div class="flex items-center justify-center gap-4 mt-2">
      <span class="text-sm">{{ currentProgress }}</span>
      <div class="relative w-full h-1 bg-gray-400 rounded-xl overflow-hidden">
        <div
          class="absolute top-0 left-0 h-full bg-purple-600 "
          :style="{ width: progressWidth }"
        />
      </div>
      <span class="text-sm">{{ convertMsToMinutes(state.data.duration) }}</span>
    </div>
  </div>
  <section
    v-else
    class="flex flex-col gap-2"
  >
    <skeleton-bar class="h-3 w-[40%]" />
    <skeleton-bar class="h-2 w-[20%]" />
    <skeleton-bar class="mt-2 h-2 w-[100%]" />
  </section>
</template>

<script setup lang="ts">
import { reactive, onMounted, onBeforeUnmount, computed } from 'vue'
import { PORTFOLIO_BACKEND_URL } from '../../../constants/global';
import type { HeroSpotify } from '../../../types/hero';
import SkeletonBar from '../../SkeletonBar.vue';

const state = reactive({
    currentProgress: 0,
    interval: null as number | null,
    data: null as HeroSpotify | null,
})

onMounted(async () => {
    try {
        handleSpotifyPlayingNow();
    } catch (err) {
        console.error(err);
    }
})

onBeforeUnmount(() => {
    clearInterval(state.interval!)
})

async function handleSpotifyPlayingNow() {
    const response = await fetch(`${PORTFOLIO_BACKEND_URL}/hero/spotify?time=${Date.now()}`);
    const data: HeroSpotify = await response.json();
    state.data = data;

    state.currentProgress = data.currentProgress || data.duration || 0
    clearInterval(state.interval!)

    state.interval = setInterval(() => {
        if (data && state.currentProgress >= data.duration) {
        clearInterval(state.interval!)
        return
        }

        state.currentProgress += 1000
        state.currentProgress = Math.min(state.currentProgress, data.duration || 0)
    }, 1000)
}

const currentProgress = computed(() => {
    return convertMsToMinutes(state.currentProgress)
})

const progressWidth = computed(() => {
    if (!state.data) return '0%'
    const percentage = (state.currentProgress / state.data.duration) * 100

    return `${percentage}%`
})

function convertMsToMinutes(ms: number) {
    const minutes = Math.floor(ms / 60000)
    const seconds = ((ms % 60000) / 1000).toFixed(0)
    return `${minutes}:${+seconds < 10 ? '0' : ''}${seconds}`
}
</script>