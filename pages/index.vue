<template>
  <div>
    <div>
      <v-layout column justify-center align-center>
        <div class="text-center splashtext pa-5" style="z-index:401" :class="{ closed: close}">
          <transition name="fade">
            <div>
              <p class="text-h4 text-sm-h2">
                Shahi Art and Architecture
              </p>
              <div v-html="body" />
              <p class="text-body-1 ma-sm-auto mt-10" style="max-width:650px">
                The goal of the project "Cultural Formation and Transformation: Shahi Buddhist Art and Architecture from
                Afghanistan to the West Tibetan Frontier at the Dawn of the Islamic Era" is to define a narrative
                cultural history of the Shahi kingdom (7th to 10th century).
                <br>
                <v-btn to="/information" text @click="close=true">
                  more Information
                </v-btn>
                <br>
                <v-btn class="mt-5" x-large color="success" @click="close = !close">
                  Disover Shahi Kingdom
                  <v-icon>mdi-map</v-icon>
                </v-btn>
              </p>
              <div v-if="close" style="position:absolute; left:0; top:0; right:0;bottom:0;" @click="close = !close" />
            </div>
          </transition>
          <transition name="fade">
            <div v-if="showContent" />
          </transition>
        </div>
      </v-layout>
      <div class="bgmap">
        <qmap
          v-if="!loading"
          :geojsonitems="items"
          :options="{ zoomControl: false }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import qmap from '~/components/map.vue';

export default {
  components: {
    qmap,
  },
  data() {
    return {
      items: [],
      body: 'loading...',
      loading: true,
      close: false,
    };
  },
  async mounted() {
    this.showContent = false;
    const p = await this.$api.Entities.get_api_0_2_code__code_({
      limit: 100,
      show: ['geometry'],
      code: 'place',
    });
    this.items = p.body.results;
    const content = await this.$api.Content.get_api_0_2_content_({});
    this.body = content.body.intro;
    this.loading = false;
  },

};
</script>
<style>
body,
html {
  height: 100%;
}

.splashtext {
  position: relative;
  background-color: rgba(255, 255, 255, 0.8);
  top: 15vh;
  width: 100%;
  transition: all 100ms linear;
}

.closed {
  top: 84vh;
  background-color: rgba(255, 255, 255, 1);

  cursor: pointer;
}

.closed:hover {
  top: 77vh;
}

.bgmap {
  height: calc(100vh - 64px);
  width: 100%;
  position: absolute;
  top: 0;
}

.container {
  max-width: 1500px;
}

</style>
