<template>

  <div style="height: 95vh">
    <v-layout column justify-center align-center>
      <div class="text-center splashtext pa-5" style="z-index:401" :class="{ closed: closed}">
        <div>
          <p class="text-h4 text-sm-h2">
            Shahi Kingdoms Database
          </p>
          <v-expand-transition>

            <div v-if="!closed">
              <p class="text-body-1 ma-sm-auto mt-10" style="max-width:1500px">
                The Shahi Kingdoms Database presents comprehensive primary source material--archaeological sites,
                artifacts, coins, inscriptions--for the Shahi kingdoms (c. 7th-10th centuries) which played a pivotal
                role in the history of Central, Inner, and South Asia. The primary source material records are
                cross-referenced with an interactive geo-referenced map, bibliographic references, and digital
                scientific articles.
              </p>
              <p class="text-body-1  my-10 mx-auto" style="max-width:1500px">
                The database is an initiative of the interdisciplinary Austrian Science Fund (FWF) project P-31246
                ‘Cultural Formation and Transformation: Shahi Art and Architecture from Afghanistan to the West Tibetan
                Frontier at the Dawn of the Islamic Era’ in cooperation with technical experts at the Austrian Academy
                of Sciences’ Austrian Centre for Digital Humanities and Cultural Heritage (ACDH-CH) and cartographers at
                the University of Vienna’s Department of Geography and Regional Research. It is co-financed by the FWF
                Shahi project, Austrian Archaeological Institute, and Holzhausen-Legat.
              </p>
              <v-row class="mx-3 mx-sm-15">
                <v-col>
                  <ImageButton icon="mdi-map-marker" @click="closed = !closed">
                    Discover the Kingdoms
                  </ImageButton>
                </v-col>
                <v-col>
                  <ImageButton to="/information" icon="$artifact">
                    Enter Database
                  </ImageButton>
                </v-col>
                <v-col>
                  <ImageButton to="/team" icon="mdi-account-group">
                    Meet the Team
                  </ImageButton>
                </v-col>
              </v-row>
            </div>
          </v-expand-transition>
          <div v-if="closed" style="position:absolute; left:0; top:0; right:0;bottom:0;" @click="closed = !closed"/>

        </div>

      </div>
    </v-layout>
    <div class="bgmap">
      <qmap
        :class="{ 'darkened': !closed}"
        v-if="!loading"
        :geojsonitems="items"
        :options="{ zoomControl: false }"
      />
    </div>
  </div>

</template>

<script>
import ImageButton from '@/components/ImageButton.vue';
import qmap from '~/components/map.vue';

export default {
  components: {
    qmap,
    ImageButton,
  },
  data() {
    return {
      items: [],
      body: 'loading...',
      loading: true,
      closed: false,
    };
  },
  async mounted() {
    this.closed = this.$route.params.showMap;
    this.showContent = false;
    const p = await this.$api.Entities.get_api_0_2_code__code_({
      limit: 100,
      show: ['geometry'],
      code: 'artifact',
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
  transition: all 200ms linear;
}

.closed {
  top: 0;
  background-color: rgba(255, 255, 255, 1);

  cursor: pointer;
}

.closed:hover {
  filter: brightness(85%);

}

.bgmap {
  height: calc(100vh - 64px);
  width: 100%;
  position: absolute;
  top: 0;

  transition: all 100ms linear;

}

.darkened {
  filter: brightness(85%);

}

.container {

  max-width: 1500px;
}

</style>
