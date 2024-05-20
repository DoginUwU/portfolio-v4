import { pick } from 'lodash-es'
import { cache } from '~/server/utils/cache'

const CACHE_TTL = 60 * 60 // 60 minutes

interface GithubData {
  repos: number
  followers: number
  publicRepos: {
    name: string
    url: string
    stars: number
    createdAt: string
    language: string
  }[]
}

export default defineEventHandler(async (): Promise<GithubData> => {
  const cachedData = cache.get<GithubData>('github')

  if (cachedData) {
    return cachedData
  }

  const API_URL = 'https://api.github.com/users/doginuwu'

  const responseUser = await fetch(API_URL)
  const dataUser = await responseUser.json()

  const responseRepos = await fetch(dataUser.repos_url)
  const dataRepos = await responseRepos.json()

  const pickedUserData = pick(dataUser, ['public_repos', 'followers'])
  const publicRepos = dataRepos.map((repo: any) =>
    pick(repo, ['name', 'html_url', 'stargazers_count', 'created_at', 'language']),
  )

  const formattedRepos = publicRepos.map((repo: any) => ({
    name: repo.name,
    url: repo.html_url,
    stars: repo.stargazers_count,
    createdAt: repo.created_at,
    language: repo.language,
  }))

  const formattedData = {
    repos: pickedUserData.public_repos,
    followers: pickedUserData.followers,
    publicRepos: formattedRepos,
  }

  cache.set('github', formattedData, CACHE_TTL)

  return formattedData
})
