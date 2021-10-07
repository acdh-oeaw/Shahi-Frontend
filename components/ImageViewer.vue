<template>
  <div>
    <div class="d-flex flex-column  align-start">
      <v-img
        contain
        max-width="100%"
        max-height="700px"
        :src="`https://shahi-img.acdh-dev.oeaw.ac.at/iiif/images/artefacts/${$route.params.id%2 +1}/1.jp2/full/500,/0/default.png`"
      />
      <v-btn
        class="pa-0"
        text
        @click="viewMode=true;"
      >
        more images <v-icon>mdi-magnify-plus</v-icon>
      </v-btn>
    </div>
    <client-only>
      <div v-if="viewMode" class="wrapper">
        <div class="viewer">
          <v-btn class="closeIcon" icon @click="viewMode=false">
            <v-icon color="white">
              mdi-close
            </v-icon>
          </v-btn>
          <l-map
            :zoom="initZoom"
            :center="center"
          >
            <l-iiif
              :url="selected"
              :options="iiifOptions"
            />
          </l-map>

          <div class="image-picker">
            <div v-for="i in 5" :key="i" class="image-preview">
              <v-img
                height="100%"
                :src="`https://shahi-img.acdh-dev.oeaw.ac.at/iiif/images/artefacts/${$route.params.id%2 +1}/${i}.jp2/full/120,/0/default.png`"
                @click="selected = `https://shahi-img.acdh-dev.oeaw.ac.at/iiif/images/artefacts/${$route.params.id%2 +1}/${i}.jp2/info.json`"
              />
            </div>
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
import * as L from 'leaflet';
import LIiif from '@/components/Vue2LeafletIIIF.vue';

export default {
  name: 'ImageViewer',
  components: { LIiif },
  data() {
    return {
      viewMode: false,
      initZoom: 0,
      center: L.latLng(0, 0),
      iiifOptions: {
        tileFormat: 'jpg',
        tileSize: 310,
      },
      manifest: 'https://shahi-img.acdh-dev.oeaw.ac.at/iiif/presentation/hk-shahi/manifest',
      infoUrl: 'https://stacks.stanford.edu/image/iiif/hg676jb4964%2F0380_796-44/info.json',
      images: ['http://localhost:8182/iiif/3/sculpture1.tif/',
        'http://localhost:8182/iiif/3/sculpture2.jpg/'],
      selected: `https://shahi-img.acdh-dev.oeaw.ac.at/iiif/images/artefacts/${this.$route.params.id % 2 + 1}/1.jp2/info.json`,
    };
  },
  computed: {
    id() {
      return Math.ceil(Math.random() * 3);
    },
  },
};
</script>

<style scoped>
@import "https://unpkg.com/leaflet@1.6.0/dist/leaflet.css";

html, body {
  margin: 0;
  height: 100%;
}

.wrapper {
  height: 100vh !important;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  align-self: center;
  justify-content: center;
}

.viewer {
  padding: 10px 0;
  max-width: 900px;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.image-preview {
  height: 150px;
  cursor: pointer;
  z-index: 999999;
  transition: transform 250ms, opacity 400ms;
  margin: 10px 10px;
}

.image-preview:hover {
  transform: scale(1.1);
}

.image-picker {
  position: absolute;
  width: 100%;
  overflow: auto;
  z-index: 999999;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.3);
  bottom: 0;
  display: flex;
  flex-direction: row;
}

.closeIcon {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 999999;

}

</style>
