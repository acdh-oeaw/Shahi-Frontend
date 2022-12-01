<template>
  <client-only style="width: 100%; height: 100%">
    <div id="map-container" style="width: 100%; height: 100%"/>
  </client-only>
</template>

<script>

import {mapActions, mapGetters} from 'vuex';
import config from '../assets/js/map/config.json';

export default {
  props: {
    geojsonitems: {
      type: Array,
      default: () => [],
    },
    center:{
      type:Array,
      default: () => undefined,
    }
  },
  data() {
    return {
      map: undefined,
      MapViewerComponent:undefined,
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
      immediate: false,
    },
  },
  beforeDestroy() {
    this.$nextTick(() => {
      this.map?.clearData();
    });
  },
  mounted() {
    this.$nextTick(function () {
      this.MapViewerComponent = require('../assets/js/map/mapviewer-component')
      const coreComponent = document.getElementById('map-container');
      const conf = JSON.parse(JSON.stringify(config));
      if(this.center || this.$route.query?.center) {
        conf.map.leafletOptions.center = this.center || this.$route.query?.center?.map(x => parseFloat(x));
        conf.map.leafletOptions.zoom = 9;
      }

      this.map = new this.MapViewerComponent(coreComponent, conf,this.correctDataFormat.features.length !== 0 ? this.correctDataFormat : {
        "type": "FeatureCollection",
        "features": [

        ]
      });
      this.map.on('init', (el) => {
      });
      const routeToPath = (path) => this.$router.push(path);
      this.map.on('featureLink', (el) => {
        if(el) routeToPath(el)
      });
      this.map.on('featureSelected', (el) => {
      });
      this.map.on('mapStateChanged', (el) => {
        if (el) {
        }
      });
    });
  },
};
</script>

<style>
@import "@/assets/js/map/mapviewer-component.css";

</style>
