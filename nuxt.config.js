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
      return axios.get('https://shahi.openatlas.eu/api/0.3/query/?view_classes=artifact&view_classes=place&limit=0').then(async res => {
        const fs = require('fs');
        const path = require('path');

        // Create a write stream to the log file
        const logStream = fs.createWriteStream(path.join(__dirname, 'logs.txt'), { flags: 'a' });

        // Function to log messages to console and file
        const log = (message) => {
          console.log(message);
          // logStream.write(`${message}\n`);
        };

        log('Fetching depictions info...');
        let depictionsInfo = (await axios.get('https://shahi.openatlas.eu/api/0.4/licensed_file_overview/')).data;
        log('Finished fetching depictions info');

        log('Start mapping depictions...');
        const remappedPayload = res.data.results.map((entity, index) => {
          // No images -> return entity as is
          if (!entity.features[0].depictions || entity.features[0].depictions.length < 1)
            return entity;

          // has images -> remap ever image url to the local image url
          const mappedEntity = entity;
          log(`Mapping entity ${entity.features[0]['@id'].split('/').pop()}`);

          mappedEntity.features[0].depictions = mappedEntity.features[0].depictions.map(depiction => {
            const remappedDepiction = depiction;
            const id = depiction.url.split('/').pop();
            if (!depictionsInfo[id] || !depictionsInfo[id].extension) {
              log(`Can't read depiction ${id}`);
              log(depictionsInfo[id]);
              return remappedDepiction;
            }
            const extension = depictionsInfo[id].extension;

            remappedDepiction.url = `/entity_files/${id + extension}`
            return remappedDepiction;
          })
          return mappedEntity;
        })
        log('Finished mapping depictions.');

        const singles =  remappedPayload.map(entity => {
          return {
            route:'/single/' + entity.features[0]['@id'].split('/').pop(),
            payload: entity
          }
        })
        const gallery = {
          route: '/data/gallery',
          payload: remappedPayload
        }
        const list = {
          route: '/data/list',
          payload: remappedPayload
        }

        const detaillist = {
          route: '/data/detaillist',
          payload: remappedPayload
        }
        const map = {
          route: '/data/map',
          payload:remappedPayload
        }
        return [...singles,list, gallery, detaillist, map]

        return [list, gallery, detaillist, map]
      })
    },
    crawler: true,
    fallback: true,
    exclude: [
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
