import { pick } from "lodash-es";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const wakatimeKey = config.wakatimeKey;

  const API_URL = `https://wakatime.com/api/v1/users/current/stats/last_7_days?api_key=${wakatimeKey}`;

  const response = await fetch(API_URL);
  const data = await response.json();

  return pick(data.data, ['languages']);
})
