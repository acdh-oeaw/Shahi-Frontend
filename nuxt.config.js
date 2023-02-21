import colors from 'vuetify/es5/util/colors';
import axios from 'axios';
export default {
  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
  },
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  ssr: true,
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: 'Shahi Kingdoms Database',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.ico' },
    ],
    script: [

      {
        src: 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js',

      },
    ]
  },
  generate: {
    routes() {
      return axios.get('https://shahi.openatlas.eu/api/0.3/query/?view_classes=artifact&view_classes=place&limit=20').then(res => {
        const singles =  res.data.results.map(entity => {
          return {
            route:'/single/' + entity.features[0]['@id'].split('/').pop(),
            payload: entity
          }
        })
        const gallery = {
          route: '/data/gallery',
          payload:res.data.results
        }
        const data = {
          route: '/data',
          payload:res.data.results
        }
        return [...singles, data, gallery]
      })
    },
    crawler: true,
    fallback: true,
    exclude: [
      /^\/collections/,
      /^\/map/,
    ],
  },
  /*
  ** Global CSS
  */
  css: [
    '~/css/main.scss',
    '@mdi/font/css/materialdesignicons.css',
    'typeface-roboto/index.css',
    'vue-json-viewer/style.css',
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '@/plugins/api.js',
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
    '@nuxtjs/netlify-files',
    '@nuxt/image',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt/content
    'nuxt-leaflet',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},
  /*
  ** Content module configuration
  ** See https://content.nuxtjs.org/configuration
  */
  content: {},
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    optionsPath: '~/plugins/vuetify.js',
    theme: {
      light: true,
      themes: {
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
    defaultAssets: false,
  },
  image: { domains: ['shahi.openatlas.eu'] },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    analyze: true,
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
  },
};
