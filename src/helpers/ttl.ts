import type { NuxtApp } from '#app'

export const ttl = <T = any>(cacheDuration = 0) => ({
  transform: (input: T) => {
    if (Array.isArray(input)) {
      return input.map(data => ({ ...data, cachedAt: new Date() }))
    }

    return { ...input, cachedAt: new Date() }
  },
  getCachedData: (key: string, nuxtApp: NuxtApp) => {
    const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key]

    if (!data) return

    if (cacheDuration) {
      if (Array.isArray(data)) {
        const firstData = data[0]

        if (firstData.cachedAt?.getTime() < new Date().getTime() - cacheDuration) return undefined
      }

      if (data.cachedAt?.getTime() < new Date().getTime() - cacheDuration) return undefined
    }

    return data
  },
})
