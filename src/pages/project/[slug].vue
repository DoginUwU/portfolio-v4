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
      class="bg-gray-600/50 w-full p-4 rounded-xl markdown"
    >
      <div
        v-if="readme"
        v-html="readme"
      />
      <span v-else>
        Este projeto não possui um README.md
      </span>
    </div>
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
import markdownit from 'markdown-it'
import xss from 'xss'

const route = useRoute()
const projectStore = useProjectStore()

await useAsyncData('projects', () => projectStore.fetchProjects())

const project = projectStore.projects.find(project => project.slug === route.params.slug)

const { data: github } = await useFetch(`/api/services/github/projects/${project!.slug}`)

const md = markdownit({
  html: true,
  linkify: true,
  typographer: true,
})

const readme = computed(() => {
  if (!github.value) return null

  return xss(md.render(github.value.readme), {
    onTag: (tag, html) => {
      if (tag === 'samp') {
        return `<samp>${html}</samp>`
      }

      return html
    },
  })
})
</script>

<style>
.markdown h1 {
  @apply text-2xl font-bold pb-2 border-b border-gray-300/10;
}

.markdown h2 {
  @apply border-b border-gray-300/10 pb-2 text-xl font-bold my-4;
}

.markdown h6 {
  @apply text-sm text-gray-300 my-4;
}

.markdown img {
  @apply rounded-md
}

.markdown pre {
  @apply bg-gray-300/10 p-4 rounded-md;
}

.markdown blockquote {
  @apply bg-gray-300/10 p-4 rounded-md;
}

.markdown p {
  @apply my-4;
}

.markdown ul {
  @apply list-disc list-inside;
}

.markdown ol {
  @apply list-decimal list-inside;
}

.markdown li {
  @apply my-2 w-full;
}

.markdown li p {
  @apply my-0 inline;
}

.markdown code {
  @apply bg-gray-300/10 p-1 rounded-md;
}
</style>
