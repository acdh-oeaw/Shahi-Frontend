<template>
  <client-only>
    <div class="example">
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
          <v-img height="100%" :src="`http://localhost:8080/iiif/images/shahi/${$route.params.id%3 +1}/${i}.jp2/full/120,/0/default.png`" @click="selected = `http://localhost:8080/iiif/images/shahi/${$route.params.id%3 +1}/${i}.jp2/info.json`"/>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
import * as L from 'leaflet';
import LIiif from '@/components/Vue2LeafletIIIF.vue';

export default {
  name: 'ImageViewer',
  components: {LIiif},
  data() {
    return {
      initZoom: 0,
      center: L.latLng(0, 0),
      iiifOptions: {
        tileFormat: 'jpg',
        tileSize: 310,
      },
      manifest: 'http://localhost:8080/iiif/presentation/hk-shahi/manifest',
      infoUrl: 'https://stacks.stanford.edu/image/iiif/hg676jb4964%2F0380_796-44/info.json',
      images: ['http://localhost:8182/iiif/3/sculpture1.tif/',
        'http://localhost:8182/iiif/3/sculpture2.jpg/'],
      selected: `http://localhost:8080/iiif/images/shahi/${this.$route.params.id%3 +1}/1.jp2/info.json`,
    };
  },
  computed: {
    id() {
      return Math.ceil(Math.random() * 3);
    }
  }
};
</script>

<style scoped>
@import "https://unpkg.com/leaflet@1.6.0/dist/leaflet.css";

html, body {
  margin: 0;
  height: 100%;
}

.example {
  height: 200px;
  width: 100%;
}

.image-preview {
  height: 150px;
  margin: 10px;
  cursor: pointer;
  z-index: 999999;
  transition: transform 250ms, opacity 400ms;
}

.image-preview:hover {
  transform: scale(1.1);
}

.image-picker {
  position: absolute;
  width: 100%;
  overflow: auto;
  z-index: 999999;

  background-color: rgba(0, 0, 0, 0.3);
  bottom: 0;
  display: flex;
  flex-direction: row;
}

</style>
