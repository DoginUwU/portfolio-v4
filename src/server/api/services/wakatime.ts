import { pick } from "lodash-es";
import { cache } from "~/server/utils/cache";

const CACHE_TTL = 60 * 60; // 60 minutes

interface WakatimeData {
  languages: {
    [key: string]: {
      name: string;
      text: string;
    }
  };
}

export default defineEventHandler(async (event): Promise<WakatimeData> => {
  const cachedData = cache.get<WakatimeData>("wakatime");

  if (cachedData) {
    return cachedData;
  }

  const config = useRuntimeConfig(event);
  const wakatimeKey = config.wakatimeKey;

  const API_URL = `https://wakatime.com/api/v1/users/current/stats/last_7_days?api_key=${wakatimeKey}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  cache.set("wakatime", data, CACHE_TTL);

  return pick(data.data, ['languages']);
})
