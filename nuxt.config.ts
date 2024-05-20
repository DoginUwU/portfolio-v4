// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: 'src',
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss', ['@nuxtjs/google-fonts', {
    families: {
      Nunito: true,
    },
    display: 'swap',
    prefetch: true,
    preconnect: true,
  },
  ], '@vueuse/nuxt', '@nuxt/image', '@nuxt/eslint'],
  app: {
    head: {
      link: [{ rel: 'stylesheet', href: 'https://unicons.iconscout.com/release/v4.0.8/css/line.css' }],
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  image: {},
  runtimeConfig: {
    wakatimeKey: '',
    spotifyClientId: '',
    spotifyClientSecret: '',
    spotifyRefreshToken: '',
    notionKey: '',
    notionDatabaseId: '',
    public: {
      portfolioGameUrl: '',
    },
  },
})
