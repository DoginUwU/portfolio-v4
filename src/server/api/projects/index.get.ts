import { notion } from "~/server/utils/notion"
import { cache } from "~/server/utils/cache"

const CACHE_TTL = 60 * 60; // 1 hour

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();

  const cachedData = cache.get("notionData");

  if (cachedData) {
    return cachedData;
  }

  const { results } = await notion.databases.query({
    database_id: config.notionDatabaseId,
  })

  const data = parseNotionData(results);

  const filteredData = data.filter((item) => item.published);

  cache.set("notionData", filteredData, CACHE_TTL);

  return filteredData;
});

function parseNotionData(data: any[]) {
  return data.map((item) => {
    return {
      id: item.id,
      slug: item.properties.Slug.rich_text[0].plain_text,
      published: item.properties.Published.checkbox,
      date: item.properties.Date.date.start,
      link: item.properties.Link.url,
      images: item.properties.Images.files.map((image: any) => ({
        name: image.name,
        url: image.file.url,
      })),
      title: item.properties.Name.title[0].plain_text,
      description: item.properties.Description.rich_text,
      tags: item.properties.Tags.multi_select.map((tag: any) => ({
        id: tag.id,
        name: tag.name,
        color: tag.color,
      })),
    }
  });
}
