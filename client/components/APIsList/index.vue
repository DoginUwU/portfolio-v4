<template>
    <section class="p-4 bg-gray-700/20 border-2 border-gray-600 rounded-xl shadow-md flex flex-col gap-4 backdrop-blur">
        <article v-for="api in APIS" :key="api.title"
            class="flex items-center gap-4 bg-gray-500/10 border-2 border-gray-600 rounded-xl p-4 relative backdrop-blur">
            <img :src="api.icon" :alt="api.title" class="w-20 h-20 rounded-xl p-3"
                :style="{ backgroundColor: api.color }" />
            <div class="w-full">
                <h2 class="text-lg uppercase">{{ api.title }}</h2>
                <component :is="api.component" />
            </div>
            <span v-if="api.caption" class="absolute top-2 right-3 text-xs text-gray-400">{{ api.caption }}</span>
        </article>
    </section>
</template>

<script lang="ts" setup>
import { APIS } from './helper'
</script>