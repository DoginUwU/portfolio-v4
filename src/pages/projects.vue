<template>
  <section class="default-container-size mt-12">
    <ProjectsGrid />
    <DynamicScroller
      v-if="status !== 'pending' && data"
      class="scroller"
      :items="data.publicRepos"
      :min-item-size="70"
      key-field="url"
    >
      <template #default="{ item: repo, index, active }">
        <DynamicScrollerItem
          :item="repo"
          :active="active"
          :size-dependencies="[
            repo.description,
          ]"
          :data-index="index"
        >
          <div class="pb-4 pr-1">
            <a
              :href="repo.url"
              target="_blank"
            >
              <div
                class="default-card mt-4 p-4 group cursor-pointer flex flex-col gap-2"
              >
                <div class="flex justify-between items-center">
                  <div>
                    <h1 class="font-bold group-hover:text-purple-500 transition">
                      {{ formatName(repo.name) }}
                    </h1>
                  </div>
                  <span class="text-gray-400">
                    <i class="uil uil-star" />
                    {{ repo.stars }}
                  </span>
                </div>
                <p
                  v-if="repo.description?.length"
                  class="text-gray-400"
                >
                  {{ repo.description }}
                </p>
                <ul
                  v-if="repo.topics?.length"
                  class="flex gap-2 max-w-full overflow-hidden overflow-x-auto"
                >
                  <li
                    v-for="topic in repo.topics"
                    :key="topic"
                    class="text-gray-400 bg-gray-800 px-2 py-1 rounded-xl text-sm"
                  >
                    {{ topic }}
                  </li>
                </ul>
              </div>
            </a>
          </div>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
  </section>
</template>

<script setup lang="ts">
import { ttl } from '~/helpers/ttl'

useSeoMeta({
  title: 'Projetos - Gotardo',
  ogTitle: 'Projetos - Gotardo',
  ogDescription: 'Conheça os projetos que desenvolvi e contribui no GitHub ao longo do tempo',
})

const { data, status } = await useFetch('/api/services/github', { key: 'github-projects', ...ttl(24 * 60 * 60 * 1000) })

function formatName(name: string): string {
  return name.replace(/-/g, ' ')
}
</script>

<style scoped>

</style>
