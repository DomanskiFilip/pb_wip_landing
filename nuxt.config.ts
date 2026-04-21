import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  srcDir: 'src/',

  ssr: true,

  nitro: {
    preset: 'node-server',
  },

  components: true,

  typescript: {
    shim: false,
    strict: false,
  },

  css: ['~/style.css'],



  vite: {},

  runtimeConfig: {
    public: {
      apiBase: '',
    },
  },

  app: {
    baseURL: '/',
  },
})
