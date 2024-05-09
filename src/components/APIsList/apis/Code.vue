<template>
  <section v-if="pending" class="mt-2 flex gap-4">
    <skeleton-bar class="h-4 w-[30%]" />
    <skeleton-bar class="h-4 w-[30%]" />
  </section>
  <AutoTextScroll v-else-if="data" class="languages flex gap-4 mt-2 flex-nowrap whitespace-nowrap">
    <div v-for="(language, index) in data.languages" :key="index" class="flex items-center gap-2 text-xs">
      <span class="text-xs rounded-xl leading-6 px-2" :class="getLanguageColor(language.name)">
        {{ language.name }}
      </span>
      {{ language.text }}
    </div>
  </AutoTextScroll>
</template>

<script setup lang="ts">
import SkeletonBar from '~/components/Skeletons/SkeletonBar.vue'
const { data, pending } = await useFetch('/api/services/wakatime')

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: 'text-yellow-200 bg-yellow-600/40',
  TypeScript: 'text-blue-200 bg-blue-600/40',
  'Vue.js': 'text-green-200 bg-green-600/40',
  CSS: 'text-blue-200 bg-blue-600/40'
}

function getLanguageColor (language: string): string {
  return LANGUAGE_COLORS[language] || 'text-gray-200 bg-gray-600/40'
}
</script>
