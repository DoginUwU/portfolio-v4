<template>
  <div ref="scroller" class="scroller">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeMount, ref, reactive, watch } from 'vue'

const DELAY_BETWEEN_ANIMATIONS = 2000
const scroller = ref<HTMLElement>()

const state = reactive({
  needScroll: false
})

watch(() => state.needScroll, (needScroll) => {
  const scrollerElement = scroller.value
  if (scrollerElement === undefined) { return }

  if (!needScroll) {
    scrollerElement.classList.remove('scroller')
    return
  }

  if (!scrollerElement.classList.contains('scroller')) {
    scrollerElement.classList.add('scroller')
  }

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

onMounted(() => {
  checkIfNeedScroll()

  window.addEventListener('resize', checkIfNeedScroll)
})

onBeforeMount(() => {
  window.removeEventListener('resize', checkIfNeedScroll)
})

function checkIfNeedScroll (): void {
  const scrollerElement = scroller.value
  if (scrollerElement === undefined) { return }

  state.needScroll = scrollerElement.scrollWidth > scrollerElement.offsetWidth
}
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
