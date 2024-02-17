import pick from "lodash-es/pick"

export default defineEventHandler(async () => {
  const API_URL = "https://api.github.com/users/doginuwu"

  const response = await fetch(API_URL)

  const data = await response.json()

  return pick(data, ['public_repos', 'followers']) 
})
