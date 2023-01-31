<template>
  <section  >
    <div class="collection-header secondary darken-1" style="position: relative;">
      <image-collage :collection-id="id" class="images" style="z-index: 0" />
      <v-container style="height: 100%">
      <v-sheet height="100%" color="transparent" max-width="max(50%,500px)" class="ma-0 page-content d-flex align-center">
            <p v-if="!!item" class="title-1" style="z-index: 1;">
              {{ item.properties.title }}
            </p>
      </v-sheet>
      </v-container>
    </div>

    <div class="page-content" v-if="!!item">
      <v-container>
      <p v-if="!!item.descriptions" class="title-2">
        Description
      </p>
      <p v-if="!!item.descriptions" style="white-space: pre-line" class="text-body-1">
        {{ item.descriptions[0].value }}
      </p>
      <p class="title-2">
        Artifacts
      </p>
      </v-container>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  async fetch(){
    const i = await this.$api.Entities.get_api_0_3_entity__id__({
        id_: this.$route.params.q,
        show:'none'
      });
      this.item = i.body?.features[0]
  },
  name: 'CollectionHeader',
  props: ['items','id'],
  data(){
    return{
      item:undefined
    }
  },
  computed: {
    ...mapGetters('app', [
      'getTypeById',
    ]),
  },
};
</script>

<style scoped>
.collection-header {
  height: 600px;
  overflow: hidden;
}
.page-content{
}

.collection-header-left{
  max-width: 500px;
}

.collection-header-right{
  position: absolute;
  width: calc(100% - 500px);
}

.images{
  position:absolute;
  right:0;
  top:50%;
  translate:0 -50%;
}

</style>
