import type { GithubRepository } from '~/types/github'

interface GithubApiRepository {
  name: string
  description: string
  html_url: string
  stargazers_count: number
  created_at: string
  language: string
  topics: string[]
}

interface GithubApiContent {
  content: string
}

export function formatGithubRepository(data: GithubApiRepository, readmeData?: GithubApiContent): GithubRepository {
  let readme = ''

  if (readmeData && readmeData.content) {
    readme = Buffer.from(readmeData.content, 'base64').toString('utf-8')
  }

  return {
    name: data.name,
    description: data.description,
    url: data.html_url,
    stars: Number(data.stargazers_count),
    createdAt: data.created_at,
    language: data.language,
    topics: data.topics,
    readme,
  }
}
