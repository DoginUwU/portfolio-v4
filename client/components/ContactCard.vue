<template>
  <div class="flex items-center justify-start gap-4 py-3 px-5 rounded-xl border" :class="{ 'bg-purple-600/10 border-purple-600': active, 'border-transparent': !active }">
    <i class="uil text-purple-600" :class="icon" />
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps({
  icon: {
    type: String,
    default: 'uil-phone'
  },
  active: {
    type: Boolean,
    default: false
  }
})
</script>
