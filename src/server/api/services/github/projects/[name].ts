import { API_GITHUB_USER } from '~/server/constants/github'
import type { GithubRepository } from '~/types/github'

export default defineEventHandler(async (event): Promise<GithubRepository> => {
  const name = getRouterParam(event, 'name')

  const API_URL = `https://api.github.com/repos/${API_GITHUB_USER}/${name}`

  const response = await fetch(API_URL)
  const data = await response.json()

  const README_URL = `${API_URL}/contents/README.md`
  const responseReadme = await fetch(README_URL)
  const dataReadme = await responseReadme.json()

  return formatGithubRepository(data, dataReadme)
})
