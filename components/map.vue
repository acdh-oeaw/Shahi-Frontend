<template>
  <client-only style="width: 100%; height: 100%">
    <div id="map-container" style="width: 100%; height: 100%"/>
  </client-only>
</template>

<script>
import MapViewerComponent from '@/assets/js/map/mapviewer.js';
import {mapActions, mapGetters} from 'vuex';
import config from '../assets/js/map/config.json';

export default {
  props: {
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
      return {features: this.geojsonitems.filter((x) => x?.geometry?.coordinates)};
    },
  },
  watch: {
    correctDataFormat: {
      handler() {
        this.$nextTick(() => {
          this.map?.clearData();
          if (this.correctDataFormat.features.length !== 0) {
            this.map?.passData(this.correctDataFormat);
          }
        });
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
      this.map = new MapViewerComponent(coreComponent, config, {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Point",
              "coordinates": [
                66.37939453125,
                32.38923910985902
              ]
            }
          },
        ]
      });
      this.map.on('init', (el) => {
      });
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
@import "@/assets/js/map/mapviewer.css";

</style>
