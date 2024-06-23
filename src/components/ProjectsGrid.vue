<template>
  <div class="projects grid gap-4">
    <nuxt-link
      v-for="project in projects"
      :key="project.id"
      :to="`/project/${project.slug}`"
    >
      <div
        class="default-card flex flex-col rounded-2xl group cursor-pointer"
      >
        <img
          class="project-image group-hover:-translate-y-2 rounded-t-xl"
          :src="project.images[0].url"
          :alt="project.images[0].name"
          :style="{ aspectRatio: '1.8' }"
        >
        <div class="p-4">
          <h3 class="font-bold group-hover:text-purple-500 transition">
            {{ project.title }}
          </h3>
          <span class="text-xs">{{ formatDate(project.date) }}</span>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script lang="ts" setup>
const projectStore = useProjectStore()
await useAsyncData('projects', () => projectStore.fetchProjects())

const props = defineProps<{
  limit?: number
}>()

const projects = projectStore.projects.slice(0, props.limit)

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
</script>

<style scoped>
.projects {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.project-image {
  transition: cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s;
}
</style>
