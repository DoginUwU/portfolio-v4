// https://nuxt.com/docs/api/configuration/nuxt-config
// eslint-disable-next-line no-undef
export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: 'src',
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    ['@nuxtjs/google-fonts', {
      families: {
        Nunito: true
      },
      display: 'swap',
      prefetch: true,
      preconnect: true
    }
    ],
    '@vueuse/nuxt'
  ],
  app: {
    head: {
      link: [{ rel: 'stylesheet', href: 'https://unicons.iconscout.com/release/v4.0.8/css/line.css' }]
    }
  },
  runtimeConfig: {
    wakatimeKey: '',
    spotifyClientId: '',
    spotifyClientSecret: '',
    spotifyRefreshToken: '',
    notionKey: '',
    notionDatabaseId: ''
  }
})
