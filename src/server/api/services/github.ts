import pick from "lodash-es/pick"
import { cache } from "~/server/utils/cache"

const CACHE_TTL = 60 * 60; // 60 minutes

interface GithubData {
  repos: number
  followers: number
}

export default defineEventHandler(async (): Promise<GithubData> => {
  const cachedData = cache.get<GithubData>("github")

  if (cachedData) {
    return cachedData
  }

  const API_URL = "https://api.github.com/users/doginuwu"

  const response = await fetch(API_URL)

  const data = await response.json()

  cache.set("github", data, CACHE_TTL)

  const pickedData = pick(data, ['public_repos', 'followers'])

  return {
    repos: pickedData.public_repos,
    followers: pickedData.followers
  }
})

