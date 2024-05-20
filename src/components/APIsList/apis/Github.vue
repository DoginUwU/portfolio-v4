<template>
  <section
    v-if="pending"
    class="mt-2 flex gap-4"
  >
    <skeleton-bar class="h-4 w-[30%]" />
    <skeleton-bar class="h-4 w-[30%]" />
  </section>
  <AutoTextScroll
    v-else-if="data"
    class="flex gap-4 mt-2"
  >
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
import SkeletonBar from '~/components/Skeletons/SkeletonBar.vue'

const { data, pending } = await useFetch('/api/services/github')
</script>
