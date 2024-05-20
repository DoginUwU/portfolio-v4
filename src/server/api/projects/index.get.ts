import { notion } from '~/server/utils/notion'
import { cache } from '~/server/utils/cache'

const CACHE_TTL = 60 * 60 // 1 hour

interface NotionData {
  id: string
  slug: string
  published: boolean
  date: string
  link: string
  images: Array<{
    name: string
    url: string
  }>
  title: string
  description: {
    type: 'rich_text'
    rich_text: Array<{
      text: {
        content: string
      }
      annotations: {
        bold: boolean
        italic: boolean
        strikethrough: boolean
        underline: boolean
        code: boolean
        color: string
      }
      plain_text: string
    }>
  }
  shortDescription: string
  tags: Array<{
    id: string
    name: string
    color: string
  }>
}

export default defineEventHandler(async (): Promise<NotionData[]> => {
  const config = useRuntimeConfig()

  const cachedData = cache.get<NotionData[]>('notionData')

  if (cachedData != null) {
    return cachedData
  }

  const { results } = await notion.databases.query({
    database_id: config.notionDatabaseId
  })

  const data = parseNotionData(results)

  const filteredData = data.filter(item => item.published)

  cache.set('notionData', filteredData, CACHE_TTL)

  return filteredData
})

function parseNotionData (data: any[]): NotionData[] {
  return data.map((item) => {
    const shortDescription = item.properties.Description.rich_text.map((text: any) => text.text.content).join(' ').substring(0, 100)

    return {
      id: item.id,
      slug: item.properties.Slug.rich_text[0].plain_text,
      published: item.properties.Published.checkbox,
      date: item.properties.Date.date.start,
      link: item.properties.Link.url,
      images: item.properties.Images.files.map((image: any) => ({
        name: image.name,
        url: image.file.url
      })),
      title: item.properties.Name.title[0].plain_text,
      description: item.properties.Description.rich_text,
      shortDescription,
      tags: item.properties.Tags.multi_select.map((tag: any) => ({
        id: tag.id,
        name: tag.name,
        color: tag.color
      }))
    }
  })
}
