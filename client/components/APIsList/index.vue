<template>
  <section
    class="h-fit p-4 default-card flex flex-col gap-4 backdrop-blur"
  >
    <article
      v-for="api in APIS"
      :key="api.title"
      class="flex items-center gap-4 bg-gray-500/10 border border-transparent rounded-xl p-4 relative backdrop-blur transition-all hover:cursor-pointer hover:bg-purple-600/10 hover:border-purple-600"
    >
      <img
        :src="api.icon"
        :alt="api.title"
        class="w-20 h-20 rounded-xl p-3"
        :style="{ backgroundColor: api.color }"
      >
      <div class="w-full overflow-hidden">
        <h2 class="text-base uppercase">
          {{ api.title }}
        </h2>
        <component :is="api.component" />
      </div>
      <span v-if="api.caption" class="absolute top-2 right-3 text-xs text-gray-400">{{ api.caption }}</span>
    </article>
  </section>
</template>

<script lang="ts" setup>
import { APIS } from './helper'
</script>
