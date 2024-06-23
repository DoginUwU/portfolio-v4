<template>
  <button
    class="bg-purple-600 text-white rounded-3xl py-2 px-4 transition-all hover:bg-purple-700 active:scale-90"
    :class="{
      'cursor-not-allowed active:scale-100 bg-purple-500 hover:bg-purple-500': disabled,
      'bg-red-500 hover:bg-red-600': error,
      'bg-green-500 hover:bg-green-600': success,
    }"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  disabled?: boolean
  error?: boolean
  success?: boolean
}>()
</script>
