<template>
  <section class="default-container-size mt-12">
    <ProjectsGrid />
    <template v-if="!pending && data">
      <div
        v-for="repo in data.publicRepos"
        :key="repo.name"
        class="default-card mt-4 p-4 group cursor-pointer flex relative"
      >
        <div>
          <h3 class="font-bold group-hover:text-purple-500 transition">
            {{ formatName(repo.name) }}
          </h3>
          <span class="text-xs">{{ formatDate(repo.createdAt) }}</span>
        </div>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
const { data, pending } = await useFetch('/api/services/github')

function formatName(name: string): string {
  return name.replace(/-/g, ' ')
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
</script>

<style scoped>

</style>
