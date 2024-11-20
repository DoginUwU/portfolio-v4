// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', ['@nuxtjs/google-fonts', {
    families: {
      Nunito: true,
    },
    display: 'swap',
    prefetch: true,
    preconnect: true,
  },
  ], '@vueuse/nuxt', '@nuxt/image', '@nuxt/eslint', '@pinia/nuxt'],
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      htmlAttrs: {
        lang: 'pt-BR',
      },
    },
  },
  css: ['~/assets/css/main.css'],
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
  srcDir: 'src',
  eslint: {
    config: {
      stylistic: true,
    },
  },
  image: {},
})
