// https://nuxt.com/docs/api/configuration/nuxt-config
import TwitchPlayerWithChat from '~/components/TwitchPlayerChat.vue';
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ['shadcn-docs-nuxt'],
  components: {
    dirs: [
      {
        path: '~/components',
        prefix: 'App', // Optional prefix
      },
    ],
  },
});
