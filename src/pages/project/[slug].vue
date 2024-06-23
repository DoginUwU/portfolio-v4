<template>
  <section
    v-if="project && github"
    class="default-container-size pt-12 flex flex-col items-center gap-1"
  >
    <div class="bg-gray-600/50 w-full p-4 rounded-xl flex flex-col items-center">
      <h1 class="font-bold text-2xl">
        {{ project.title }}
      </h1>
      <span class="text-gray-300">{{ github.description }}</span>
    </div>
    <div class="bg-gray-600/50 w-full rounded-xl overflow-hidden max-h-96">
      <img
        class="w-full object-cover"
        :src="project.images[0].url"
        alt=""
      >
    </div>
    <div
      class="bg-gray-600/50 w-full p-4 rounded-xl"
      v-html="github.readme"
    />
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-1 w-full">
      <div
        class="bg-gray-600/50 w-full p-4 rounded-xl flex flex-col items-center text-center"
      >
        <h3 class="font-bold text-xl">
          Repositório
        </h3>
        <span class="text-gray-300 mb-6">O projeto pode ser encontrado no Github publicamente! Que tal dar uma olhada? 👀</span>
        <a
          class="w-full"
          target="_blank"
          :href="project.link"
        >
          <Button class="w-full rounded-xl">
            Abrir
          </Button>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const route = useRoute()
const projectStore = useProjectStore()

await useAsyncData('projects', () => projectStore.fetchProjects())

const project = projectStore.projects.find(project => project.slug === route.params.slug)

const { data: github } = await useFetch(`/api/services/github/projects/${project!.slug}`)
</script>

<style scoped>

</style>
