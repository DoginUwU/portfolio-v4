<template>
  <section class="default-container-size mt-12">
    <ProjectsGrid />
    <template v-if="!pending && data">
      <a
        v-for="repo in data.publicRepos"
        :key="repo.name"
        :href="repo.url"
        target="_blank"
      >
        <div
          class="default-card mt-4 p-4 group cursor-pointer flex flex-col gap-2"
        >
          <div class="flex justify-between items-center">
            <div>
              <h3 class="font-bold group-hover:text-purple-500 transition">
                {{ formatName(repo.name) }}
              </h3>
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
            class="flex gap-2"
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
    </template>
  </section>
</template>

<script setup lang="ts">
const { data, pending } = await useFetch('/api/services/github')

function formatName(name: string): string {
  return name.replace(/-/g, ' ')
}
</script>

<style scoped>

</style>
