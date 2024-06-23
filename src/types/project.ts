export interface NotionData {
  id: string
  slug: string
  published: boolean
  date: string
  link: string
  github: string
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
