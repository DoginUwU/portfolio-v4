// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: 'client',
  css: ['~/assets/css/main.css'],
  modules: [
    "@nuxtjs/tailwindcss",
    ["@nuxtjs/google-fonts", {
      families: {
        Nunito: true,
      },
      display: "swap",
      prefetch: true,
      preconnect: true,
    }
    ]
  ],
})