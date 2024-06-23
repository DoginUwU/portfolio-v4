<template>
  <div class="px-4 pt-6 pb-8 default-card max-w-96 lg:max-w-80 flex flex-col gap-4 items-center text-center">
    <div class="p-3 aspect-square flex items-center justify-center bg-white/10 rounded-full w-fit h-fit">
      <i
        class="uil text-2xl"
        :class="icon"
      />
    </div>
    <h3 class="font-semibold">
      <slot name="title" />
    </h3>
    <p class="text-sm text-white/70">
      <slot />
    </p>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  icon: string
}>()
</script>
