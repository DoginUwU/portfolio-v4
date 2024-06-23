import { pick } from 'lodash-es'
import { cache } from '~/server/utils/cache'
import type { GithubRepository } from '~/types/github'
import { formatGithubRepository } from '~/server/utils/github'
import { API_GITHUB_USER } from '~/server/constants/github'

const CACHE_TTL = 60 * 60 // 60 minutes

interface GithubData {
  repos: number
  followers: number
  publicRepos: GithubRepository[]
}

export default defineEventHandler(async (): Promise<GithubData> => {
  const cachedData = cache.get<GithubData>('github')

  if (cachedData) {
    return cachedData
  }

  const API_URL = `https://api.github.com/users/${API_GITHUB_USER}`

  const responseUser = await fetch(API_URL)
  const dataUser = await responseUser.json()

  const responseRepos = await fetch(`${dataUser.repos_url}?per_page=100`)
  const dataRepos = await responseRepos.json()

  const pickedUserData = pick(dataUser, ['public_repos', 'followers'])
  const publicRepos = dataRepos.map((repo: any) =>
    pick(repo, ['name', 'html_url', 'stargazers_count', 'created_at', 'language', 'description', 'topics']),
  ).sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  const formattedRepos = publicRepos.map(formatGithubRepository)

  const formattedData = {
    repos: pickedUserData.public_repos,
    followers: pickedUserData.followers,
    publicRepos: formattedRepos,
  }

  cache.set('github', formattedData, CACHE_TTL)

  return formattedData
})
