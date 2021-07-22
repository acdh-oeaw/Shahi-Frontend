<template>
  <div>
    <ImageNavigation></ImageNavigation>

    <v-container>
    <p class="text-h3">Title</p>
    <p class="text-body-1">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
      invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
      et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor
      sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
      erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
      sea takimata sanctus est Lorem ipsum dolor sit amet.</p>

    <p class="text-h3">Discover Shahi kingdom</p>
    <p class="text-body-1">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
      invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
      et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor
      sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
      erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
      sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
<div class="full-width" style="height:500px;">
        <qmap/>
        </div>


    <p class="text-h3">Artifacts</p>
    <v-row>
      <v-col v-for="item in [1,2,3]" :key="item">
      <v-skeleton-loader
        class="mx-5"
        v-bind="attrs"
        type="card"
      ></v-skeleton-loader>
      </v-col>
    </v-row>
    </v-container>
    <v-parallax
      height="100"
      src="https://shahimaterialculture.univie.ac.at/fileadmin/_processed_/csm_1__Gilgit_MS_Banner_2ba90c6442.jpg"
    ></v-parallax>
    <v-container>
    <p class="text-h3">Artifacts</p>
    <v-row>
      <v-col v-for="item in [1,2,3]" :key="item">
        <v-skeleton-loader
          class="mx-5"
          v-bind="attrs"
          type="card"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    </v-container>
    <v-parallax
      height="100"

      src="https://shahimaterialculture.univie.ac.at/fileadmin/_processed_/csm_1__Gilgit_MS_Banner_2ba90c6442.jpg"
    ></v-parallax>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue';
import qmap from '~/components/map.vue';

export default {
  components: {
    qmap
  },
  data() {
    return {
      items: [],
      body: 'loading...',
      loading: true,
    };
  },
  async mounted() {
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

.splashtext {
  position: relative;
  background-color: rgba(255, 255, 255, 0.8);
  top: 15vh;
  width: 100%;
}

.bgmap {
  height: calc(100vh - 64px);
  width: 100%;
  position: absolute;
  top: 0px;
}

.container {
  max-width: 1500px;
}


</style>
