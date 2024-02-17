<template>
  <div class="flex flex-col gap-3">
    <label class="text-white/70 text-sm" :for="id">
      {{ label }}
    </label>

    <input
      :id="id"
      class="w-full bg-transparent border-b border-white/30 focus:border-purple-600 focus:outline-none"
      type="text"
      v-bind="$attrs"
    >
  </div>
</template>

<script lang="ts" setup>
interface Props {
  id: string
  label: string
}

defineProps<Props>()
</script>
