import { defineStore } from 'pinia'
import type { NotionData } from '~/types/project'

export const useProjectStore = defineStore('projects', {
  state: () => ({
    projects: [] as NotionData[],
  }),
  actions: {
    async fetchProjects() {
      if (this.projects.length > 0) return

      const { data } = await useFetch('/api/projects')

      this.projects = data.value as NotionData[]
    },
    findProjectBySlug(slug: string) {
      return this.projects.find(project => project.slug === slug)
    },
  },
})
