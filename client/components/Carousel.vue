<template>
  <div class="relative mb-12">
    <div
      class="whitespace-nowrap transition-all -mb-2"
      :style="{ transform: `translateX(-${state.translateX > 0 ? state.translateX : 0}%)` }"
    >
      <a v-for="cachorro in 10" :key="cachorro" href="/">
        <div class="slide" :class="{ active: state.activeIndex === cachorro - 1, first: cachorro - 1 === 0 }">
          <img src="https://www.legotardo.com/assets/loading_carousel.webp" alt="Carregando...">
        </div>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, onBeforeMount, watch } from 'vue'

const DELAY = 5000

const state = reactive({
  activeIndex: 1,
  interval: null as number | null,
  translateX: 0
})

watch(() => state.activeIndex, () => {
  const isMobile = window.innerWidth < 768

  state.translateX = isMobile ? state.activeIndex * 100 : state.activeIndex * 33.33 - 33
})

onMounted(() => {
  state.interval = window.setInterval(() => {
    state.activeIndex = (state.activeIndex + 1) % 10
  }, DELAY)
})

onBeforeMount(() => {
  if (state.interval !== null) {
    window.clearInterval(state.interval)
  }
})
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
</style>
