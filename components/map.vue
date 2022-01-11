<template>
  <client-only style="width: 100%; height: 100%">
    <div id="map-container" style="width: 100%; height: 100%" />
  </client-only>
</template>

<script>
import MapViewerComponent from '@/assets/js/map/mapviewer.js';
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    options: {
      type: Object,
      default: () => ({
        map: {
          controls: {
            zoomlvl: true,
            layer: true,
            geonames: true,
            locate: true,
            opacity: true,
          },
          leafletOptions: {
            maxZoom: 10,
            minZoom: 7,
            zoom: 8,
            center: [35, 70],
          },
        },
      }),
    },
    geojsonitems: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      map: undefined,
    };
  },
  computed: {
    correctDataFormat() {
      return { features: this.geojsonitems.filter((x) => x?.[0]?.geometry?.coordinates) };
    },
  },
  watch: {
    correctDataFormat: {
      handler() {
        this.map?.clearData();
        if (this.correctDataFormat.features.length !== 0 ){
          this.map?.passData(this.correctDataFormat);
        }

      },
      deep: true,
      immediate: true,
    },
  },
  beforeDestroy() {
    this.$nextTick(() => {
      this.map?.clearData();
    });
  },
  mounted() {
    this.$nextTick(function () {
      const coreComponent = document.getElementById('map-container');
      this.map = new MapViewerComponent(coreComponent, this.options, this.correctDataFormat);
      this.map.on('init', (el) => { });
      this.map.on('featureSelected', (el) => {
        console.log('[mapviewer-component event: feature selected]:', el);
      });
      this.map.on('mapStateChanged', (el) => {
        if (el) {
          console.log(`[mapviewer-component event: mapStateChanged]: ${JSON.stringify(el)}`);
        }
      });
    });
  },
};
</script>

<style>

</style>
