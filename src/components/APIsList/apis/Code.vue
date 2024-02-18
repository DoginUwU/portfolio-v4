<template>
  <AutoTextScroll v-if="data" class="languages flex gap-4 mt-2 flex-nowrap whitespace-nowrap">
    <div v-for="(language, index) in data.languages" :key="index" class="flex items-center gap-2 text-xs">
      <span class="text-xs rounded-xl leading-6 px-2" :class="getLanguageColor(language.name)">
        {{ language.name }}
      </span>
      {{ language.text }}
    </div>
  </AutoTextScroll>
</template>

<script setup lang="ts">
const { data } = useFetch('/api/services/wakatime')

const LANGUAGE_COLORS = {
  JavaScript: 'text-yellow-200 bg-yellow-600/40',
  TypeScript: 'text-blue-200 bg-blue-600/40',
  'Vue.js': 'text-green-200 bg-green-600/40',
  CSS: 'text-blue-200 bg-blue-600/40',
} as const

function getLanguageColor(language: string) {
  return LANGUAGE_COLORS[language] || 'text-gray-200 bg-gray-600/40'
}
</script>
