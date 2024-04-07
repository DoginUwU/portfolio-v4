<template>
  <div ref="planetContainer" class="w-screen h-fit md:h-screen flex items-center justify-center md:-mt-24 pointer-events-none md:pointer-events-auto">
    <div ref="canvasParent" class="w-full h-[600px] relative">
      <h1
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 text-white/50 hidden lg:block text-6xl xl:text-9xl font-black -z-10 text-nowrap -mt-12"
        :style="{ letterSpacing }"
      >
        Software Developer
      </h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, nextTick } from 'vue'
import { ThreePlanet } from '~/utils/ThreePlanet'
import { useScroll } from '~/hooks/useScroll'

const { y } = useScroll()

const canvasParent = ref<HTMLDivElement | null>(null)
const planetContainer = ref<HTMLDivElement | null>(null)

const letterSpacing = computed(() => {
  if (process.server === true) { return 1 }
  if (planetContainer.value === null) { return 1 }

  const value = Math.max(1, 1 + y.value / planetContainer.value.clientHeight * 10) * 2

  return `${value}px`
})

onMounted(async () => {
  await nextTick()

  if (canvasParent.value === null) { return }

  const threePlanet = new ThreePlanet(canvasParent.value)
  threePlanet.animate()

  window.addEventListener('resize', () => {
    threePlanet.onWindowResize()
  })
})
</script>
