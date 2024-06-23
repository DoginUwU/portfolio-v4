import { API_GITHUB_USER } from '~/server/constants/github'
import type { GithubRepository } from '~/types/github'
import { cache } from '~/server/utils/cache'

const CACHE_TTL = 60 * 60 * 24 // 24 hours

export default defineEventHandler(async (event): Promise<GithubRepository> => {
  const name = getRouterParam(event, 'name')

  const cachedData = cache.get<GithubRepository>(`github-project-${name}`)

  if (cachedData != null) {
    return cachedData
  }

  const API_URL = `https://api.github.com/repos/${API_GITHUB_USER}/${name}`

  const response = await fetch(API_URL)
  const data = await response.json()

  const README_URL = `${API_URL}/contents/README.md`
  const responseReadme = await fetch(README_URL)
  const dataReadme = await responseReadme.json()

  const formatedData = formatGithubRepository(data, dataReadme)

  cache.set(`github-project-${name}`, formatedData, CACHE_TTL)

  return formatedData
})
