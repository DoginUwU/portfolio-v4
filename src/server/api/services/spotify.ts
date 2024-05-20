import { cache } from '~/server/utils/cache'

const CACHE_TTL = 60 * 20 // 20 minutes

export default defineEventHandler(async (): Promise<SpotifyTrack> => {
  const cachedData = cache.get<SpotifyTrack>('spotify')

  if (cachedData) {
    return cachedData
  }

  const config = useRuntimeConfig()
  const clientId = config.spotifyClientId
  const clientSecret = config.spotifyClientSecret
  const refreshToken = config.spotifyRefreshToken

  const accessToken = await getAccessToken(clientId, clientSecret, refreshToken)

  let currentPlayback = await getCurrentPlayback(accessToken)

  if (!currentPlayback) {
    currentPlayback = await getRecentlyPlayed(accessToken)
  }

  cache.set('spotify', currentPlayback, CACHE_TTL)

  return currentPlayback
})

interface SpotifyTrack {
  name: string
  artist: string
  album: string
  image: string
  duration: number
  currentProgress?: number
}

async function getRecentlyPlayed(accessToken: string): Promise<SpotifyTrack> {
  const API_URL = 'https://api.spotify.com/v1/me/player/recently-played'

  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const data = await response.json()
  const latestTrack = data.items[0].track

  return {
    name: latestTrack.name,
    artist: latestTrack.artists[0].name,
    album: latestTrack.album.name,
    image: latestTrack.album.images[0].url,
    duration: latestTrack.duration_ms,
  }
}

async function getCurrentPlayback(accessToken: string): Promise<SpotifyTrack | null> {
  const API_URL = 'https://api.spotify.com/v1/me/player/currently-playing'

  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (response.status === 204) {
    return null
  }

  const data = await response.json()

  return {
    name: data.item.name,
    artist: data.item.artists[0].name,
    album: data.item.album.name,
    image: data.item.album.images[0].url,
    duration: data.item.duration_ms,
    currentProgress: data.progress_ms,
  }
}

async function getAccessToken(clientId: string, clientSecret: string, refreshToken: string): Promise<string> {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  })

  const data = await response.json()

  return data.access_token
}
