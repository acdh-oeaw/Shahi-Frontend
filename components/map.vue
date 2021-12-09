<template>
  <div style="width: 100%; height: 100%" id="map-container"></div>
</template>

<script>
import MapViewerComponent from "@/assets/js/map/mapviewer.js";
export default {
  props: {
    options: {
      type: Object,
      default: () => {},
    },
    geojsonitems: {
      type: Array,
      default: () => [],
    },
    markeritems: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      loading: false,
      show: true,
      enableTooltip: true,
      zoom: 6,
      center: [32.962949, 67.954916],
      url: "https://tile.jawg.io/jawg-light/{z}/{x}/{y}.png?access-token=TUhizWedCN04NDjuRQtXfgE0HSuYwHzro3NRUDa3LMUlLbymREaTyUW2lpuoNnMz",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    };
  },
  watch: {
    geojsonitems: {
      handler() {
        this.setBounds();
      },
      deep: true,
      immediate: true,
    },
  },
  beforeDestroy() {
    this.$nextTick(() => {
      // this.$refs.map.mapObject.remove();
    });
  },
  mounted() {
    const configData = {
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
    };
    const jsonData = [
      {
        type: "Feature",
        properties: {
          ID: "Point 1",
        },
        geometry: {
          type: "Point",
          coordinates: [69.205, 33.5653],
        },
      },
      {
        type: "Feature",
        properties: {
          ID: "Point 2",
        },
        geometry: {
          type: "Point",
          coordinates: [70.2075, 34.5253],
        },
      },
      {
        type: "Feature",
        properties: {
          ID: "Point 3",
        },
        geometry: {
          type: "Point",
          coordinates: [69.2175, 34.5553],
        },
      },
    ];
    this.$nextTick(function () {
      const coreComponent = document.getElementById("map-container");
      const map = new MapViewerComponent(coreComponent, configData, jsonData);
    });
  },
  methods: {
    setBounds() {
      this.$nextTick(() => {
        if (this.$refs.features) {
          const bounds = this.$refs.features.mapObject.getBounds();
          // eslint-disable-next-line no-underscore-dangle
          if (bounds._northEast) this.$refs.map.mapObject.fitBounds(bounds);
        }
      });
    },
  },
};
</script>

<style>
@import "@/assets/js/map/mapviewer.css";

.mapcontainer {
  width: 100%;
  height: 100%;
  position: relative;
}

#vizTreeV circle {
  fill: #fff;
  stroke: #54a8ff;
  stroke-width: 3px;
}

#vizTreeV .node text {
  font: 12px sans-serif;
}

#vizTreeV .link {
  fill: none;
  stroke: #ccc;
  stroke-width: 2px;
}

.demo-text {
  position: absolute;
  color: red;
  z-index: 400;
  font-size: 40px;
  margin: 10px;
  opacity: 70%;
  top: 0;
  left: 0;
}
</style>
