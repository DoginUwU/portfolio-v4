<template>
  <div class="game">
    <Loading v-if="state.loading" />
    <iframe
      class="w-screen h-screen absolute top-0 left-0 border-none"
      :src="config.public.portfolioGameUrl"
      frameborder="0"
      @load="handleLoad"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import Loading from '@/components/Loading.vue'

useSeoMeta({
  title: 'Jogo - Gotardo',
})

const config = useRuntimeConfig()

const state = reactive({
  loading: true,
})

function handleLoad(): void {
  state.loading = false
}
</script>
