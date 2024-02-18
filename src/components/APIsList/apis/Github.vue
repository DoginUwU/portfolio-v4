<template>
  <AutoTextScroll v-if="data" class="flex gap-4 mt-2">
    <div class="flex gap-2 text-gray-400">
      <Tag>{{ data.repos }}</Tag>
      repositories
    </div>
    <div class="flex gap-2 text-gray-400">
      <Tag>{{ data.followers }}</Tag>
      followers
    </div>
  </AutoTextScroll>
</template>

<script setup lang="ts">
const { data } = useFetch('/api/services/github')
</script>

