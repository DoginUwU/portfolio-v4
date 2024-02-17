<template>
  <canvas ref="canvas" class="absolute top-0 w-screen h-full -z-10" />
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue'
import { Stars } from './helper'

const canvas = ref<HTMLCanvasElement | null>(null)

onMounted(async () => {
  await nextTick()

  if (canvas.value === null) { return }

  const helper = new Stars(canvas.value)
  helper.init()
})
</script>
