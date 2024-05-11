<template>
  <div v-if="data" class="relative mb-12">
    <div
      class="whitespace-nowrap transition-all -mb-2"
      :style="{ transform: `translateX(-${state.translateX > 0 ? state.translateX : 0}%)` }"
    >
      <a
        v-for="(project, index) in data"
        :key="project.id"
        href="/"
        :class="{ 'pointer-events-none select-none': !isActive(index) }"
      >
        <div class="slide" :class="{ active: isActive(index), first: index === 0 }">
          <img :src="project.images[0].url" :alt="project.images[0].name">
          <div v-if="isActive(index)" class="absolute bottom-0 left-0 w-full bg-black/40 p-4">
            <h1>{{ project.title }}</h1>
            <p class="max-w-full overflow-hidden text-ellipsis text-white/80">{{ project.shortDescription }}</p>
          </div>
        </div>
      </a>
    </div>

    <ClientOnly>
      <button
        v-if="state.activeIndex > 0"
        aria-label="previous image"
        type="button"
        className="button prev"
        @click="handlePrev"
      >
        <i class="uil uil-angle-left-b" />
      </button>
      <button
        v-if="state.activeIndex < data.length - 1"
        aria-label="next image"
        type="button"
        className="button next"
        @click="handleNext"
      >
        <i class="uil uil-angle-right-b" />
      </button>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, onBeforeMount, watch } from 'vue'

const { data } = await useFetch('/api/projects')

const DELAY = 2000

const state = reactive({
  activeIndex: 1,
  interval: null as number | null,
  stopInterval: false,
  translateX: 0
})

watch(() => state.activeIndex, () => {
  calculeTranslateX()
})

watch(() => state.stopInterval, () => {
  if (!state.stopInterval) {
    return
  }

  if (state.interval !== null) {
    window.clearInterval(state.interval)
  }

  window.setTimeout(() => {
    state.stopInterval = false

    startAutoRotate()
  }, DELAY)
}, { immediate: true })

onMounted(() => {
  startAutoRotate()

  window.addEventListener('resize', calculeTranslateX)
})

onBeforeMount(() => {
  if (state.interval !== null) {
    window.clearInterval(state.interval)
  }

  window.removeEventListener('resize', calculeTranslateX)
})

function isActive (index: number): boolean {
  return state.activeIndex === index
}

function calculeTranslateX (): void {
  const isMobile = window.innerWidth < 768

  state.translateX = isMobile ? state.activeIndex * 100 : state.activeIndex * 33.33 - 33
  state.stopInterval = true
}

function startAutoRotate (): void {
  state.stopInterval = false

  state.interval = window.setInterval(() => {
    state.activeIndex = (state.activeIndex + 1) % (data.value?.length || 1)
  }, DELAY)
}

function handlePrev (): void {
  state.activeIndex--
  state.stopInterval = true
}

function handleNext (): void {
  state.activeIndex++
  state.stopInterval = true
}
</script>

<style scoped>
.slide {
  display: inline-flex;
  width: 33.33%;
  opacity: 0.3;
  transition: all 0.2s ease-in-out 0s;
  overflow: hidden;
  position: relative;
  text-decoration: none;
  color: rgb(250, 250, 250);
  cursor: default;
}

.slide.active {
  opacity: 1;
  z-index: 10;
  cursor: pointer;
  border-radius: 12px;
  transform: scale(1.2);
}

.slide.first.active {
  transform: scale(1) !important;
  border-radius: 0px !important;
}

.button {
  @apply absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white text-xl transition-all rounded-full aspect-square w-12 h-12 cursor-pointer;
}

.button.prev {
  left: calc(50% - 25%);
}

.button.next {
  left: calc(50% + 25%);
}

@media (max-width: 767px) {
  .slide {
    width: 100%;
  }

  .button.prev {
    left: calc(50% - 40%);
  }

  .button.next {
    left: calc(50% + 40%);
  }
}
</style>
