<template>
  <div style="height: 100%;width: 100%">
    <div v-if="loading" class="loadScreen d-flex align-center justify-center">
      <v-progress-circular
        :size="200"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>

    <qmap :geojsonitems="visibleArtifacts" />

    <div  class="timeline elevation-4 relative" :class="{show:useTimeline}">
      <v-btn v-if="useTimeline" icon @click="useTimeline = false">
        <v-icon size="23">
          mdi-close
        </v-icon>
      </v-btn>
      <v-btn v-else icon @click="useTimeline = true" title="configure timeline">
        <v-icon size="23">
          mdi-timeline-clock-outline
        </v-icon>
      </v-btn>
      <transition name="timelineTransition">
        <v-row v-if="useTimeline" no-gutters>
          <v-col cols="12">
            <p class="text-center text-body-1 ma-0 mt-7 pa-0">
              {{ timeLabels[time] }}
            </p>
            <v-slider

              v-model="time"
              :max="12"
              step="1"
              ticks="always"
              tick-size="3"
            />
          </v-col>
        </v-row>
      </transition>
    
    </div>
    <div :title="showPolygons ? 'hide polygons' : 'show polygons'" @click="showPolygons = !showPolygons" class="showploygons elevation-4" :class="{active: !showPolygons}">
    <v-icon size="23">
          mdi-vector-polygon
        </v-icon>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ImageButton from '@/components/ImageButton';
import qmap from '~/components/map';

export default {
  components: {
    qmap,
  },
  data() {
    return {
      showPolygons:true,
      useTimeline: false,
      loading: false,
      toggler: 1,
      time: 1,
      timeLabels: ['2nd Century',
        '3rd Century',
        '4th Century',
        '5th Century',
        '6th Century',
        '7th Century',
        '8th Century',
        '9th Century',
        '10th Century',
        '11th Century',
        '12th Century',
        '13th Century',
        '14th Century',
      ],
      items: [],
    };
  },
  mounted() {
    this.loadArtifacts();
    // this.loadAllArtifacts();
    // this.loadAllPlaces();
  },
  methods: {
    ...mapActions('entity', ['addToPlaces', 'addToArtifacts', 'setArtifactsLoaded', 'setPlacesLoaded']),
    dateStringToYear(date) {
      return parseInt(date.split('-')[0], 10);
    },
    async loadArtifacts() {
      this.loading = true;
      let localItems = [];
      const p = await this.$api.Entities.get_api_0_3_query_({
        codes: this.getQuery?.codes,
        search: this.getQuery?.search,
        page: 1,
      });

      await Promise.all(Array.from({ length: p.body.pagination.totalPages }, async (x, i) => {
        const q = await this.$api.Entities.get_api_0_3_query_({
          codes: this.getQuery?.codes,
          search: this.getQuery?.search,
          page: i,
        });
        localItems = [...localItems, ...q.body.results.map((x) => x.features[0])];
      }));
      this.loading = false;
      this.items = localItems;
      console.log(this.items)
    },
  },
  computed: {
    ...mapGetters('entity', ['getPlaces', 'getArtifacts', 'getArtifactsLoaded', 'getPlaceLoaded']),
    ...mapGetters('query', ['getQuery']),
    visibleArtifacts() {
      const year = (this.time + 1) * 100;
      let localItems = this.items.filter(x => this.showPolygons || x?.geometry?.type !== 'Polygon')
      if (!this.useTimeline) return localItems;
      return localItems
        .filter((x) => this.dateStringToYear(x.when?.timespans?.[0]?.start.earliest) <= year)
        .filter((x) => this.dateStringToYear(x.when?.timespans?.[0]?.end.earliest) >= year);
    },
  },

  watch: {
    getQuery: {
      handler(s) {
        this.loadArtifacts();
      },
      immediate: true,
      deep: true,
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
.showploygons{
  position: absolute;
  padding: 5px;
  background-color: white;
  width:35px;
  height:35px;
  z-index: 400;
  right:10px;
  top:55px;
  cursor:pointer;
  transition:all linear 100ms;
}
a.showploygons{
  top:0;
  left:0;
  right:0;
  bottom:0;
  position: absolute;
  background-color: green;
}
.showploygons.active{
  filter: brightness(90%);
}
.showploygons:hover{
filter: brightness(95%);
}


.timeline {
  position: absolute;
  background-color: white;
  padding: 5px;
  top: 10px;
  right: 10px;
  z-index: 401;
  width:35px;
  height:35px;
  transition: all ease-in-out 100ms;
}

.show{

  height: 120px;
  width: 400px;
}
.timeline button {
  position: absolute;
  top:0;
  right:0;
}

.timelineTransition-enter-active {
  animation: finished 200ms reverse;
}
.timelineTransition-leave-active {
  animation: finished 100ms;
}
@keyframes finished {
  0% { opacity: 1;}
  100% { opacity: 0;}
}

.loadScreen{
  position: absolute;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.2);
  z-index:4991;
}

</style>
