// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/ui", "@pinia/nuxt"],
  app: {
    baseURL: "/takeandwake-nuxt-app-test/",
  },

  nitro: {
    output: {
      dir: "./dist/takeandwake-nuxt-app-test",
    },
  },
});
