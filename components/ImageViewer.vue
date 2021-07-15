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
      <div v-for="image in images" class="image-preview">
        <v-img @click="selected = image + 'info.json'" :src="image + 'full/120,/0/default.jpg'"></v-img>
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
  components: { LIiif },
  data() {
    return {
      initZoom: 0,
      center: L.latLng(0, 0),
      iiifOptions: {
        tileFormat: 'jpg',
        tileSize: 310,
      },
      infoUrl: 'https://stacks.stanford.edu/image/iiif/hg676jb4964%2F0380_796-44/info.json',
      images: ['http://localhost:8182/iiif/3/sculpture1.jpg/', 
                'http://localhost:8182/iiif/3/sculpture2.jpg/', 
                'http://localhost:8182/iiif/3/sculpture3.jpg/', 
                'http://localhost:8182/iiif/3/sculpture4.jpg/', ],
      selected: 'http://localhost:8182/iiif/3/sculpture1.jpg/info.json',
    };

  },
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
  height: auto;
  width: 100px;
  margin: 10px;
  cursor: pointer;
  z-index: 999999;
  transition: transform 250ms, opacity 400ms;
}
.image-preview:hover {
  transform: scale(1.1);
}

.image-picker{
  position: absolute;
  width: 100%;
  z-index: 999999;

  background-color: rgb(0,0,0,0.3);
  bottom: 0px;
  display: flex;
  flex-direction: row;
}

</style>
