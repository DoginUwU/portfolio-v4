<template>
  <div ref="scroller" class="scroller">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const DELAY_BETWEEN_ANIMATIONS = 2000
const scroller = ref<HTMLElement>()

onMounted(() => {
  const scrollerElement = scroller.value
  if (scrollerElement === undefined) { return }

  setTimeout(() => {
    scrollerElement.style.animationPlayState = 'running'
  }, DELAY_BETWEEN_ANIMATIONS)

  scrollerElement.addEventListener('animationiteration', () => {
    scrollerElement.style.animationPlayState = 'paused'

    setTimeout(() => {
      scrollerElement.style.animationPlayState = 'running'
    }, DELAY_BETWEEN_ANIMATIONS)
  })
})
</script>

<style scoped>
.scroller {
    animation: scroll 10s linear infinite alternate;
    animation-play-state: paused;
}

@keyframes scroll {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-50%);
    }
}
</style>
