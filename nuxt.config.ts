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
  ], '@vueuse/nuxt', '@nuxt/image', '@nuxt/eslint', '@pinia/nuxt'],
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
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
