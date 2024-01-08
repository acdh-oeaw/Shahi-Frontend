<template>
  <div class="collection-container secondary">
    <div class="collection-content d-flex flex-column align-self-stretch justify-self-stretch justify-space-between">
      <div class="px-2" style="max-width: 600px">
        <p class="title-2">
          {{ collection.name }}
        </p>
        <div class="description">
          <p v-if="!moreInfo && !!collection.description" style="white-space: pre-line"
             class="collection-description text-body-1">
            {{ collection.description.split('\r\n\r\n')[0] }}
          </p>
        </div>
        <div
          @click="routeToCollection()"
        >
          <p
            class=" primary--text go-to-map-button mt-3"
          >
            Explore Collection
            <v-icon class="ml-n1">
              mdi-chevron-right
            </v-icon>
          </p>
        </div>
        <div>
        </div>
      </div>
      <div v-if="image" class="text-right text-caption text--secondary pl-2" >
        <p class="ma-0 pa-0 font-weight-bold">{{ image.license }}</p>
        <p class="ma-0 pa-0">{{ licenseDescription }}</p>
      </div>
    </div>

    <div class="collection-image primary" :style="{'--background-image':`url(${image})`}">
      <v-img height="100%" v-if="image" :src="image.url.replace('http://','https://')"/>
    </div>
  </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex';
import * as collection from 'postcss-selector-parser';

export default {

  name: 'CollectionBox',
  props: ['collection'],
  data() {
    return {
      moreInfo: false,
      collectionDetails: undefined,
      licenseDescription: '',
    };
  },

  async mounted() {
    const p = await this.$api.Entities.get_api_entity__id__({
      id_: this.collection.id,
    });
    this.collectionDetails = p.body.features[0];
  },
  methods: {
    ...mapActions('query', ['searchByFilterId', 'setCodes']),
    routeToCollection() {
      this.$router.push(`/collections/${this.collection.id}`);
    },
  },
  computed: {
    ...mapGetters('query', ['getQuery']),
    image() {
      return this.collectionDetails?.depictions?.[0];
    },
  },
  watch: {
    collectionDetails: {
      async handler() {
        if (!this.image) return;

        const q = await this.$api.Entities.get_api_entity__id__({
          id_: this.image['@id'].split('/').at(-1),
          show: 'description'
        });
        this.licenseDescription = q?.body?.features?.[0]?.descriptions?.[0]?.value
      },
      deep: true,
    }
  }
};
</script>

<style scoped>
.collection-container {

  display: flex;
  margin-bottom: 40px;
  justify-content: space-between;
  align-items: center;
}

.collection-image {
  height: 500px;
  width: 500px;
  min-width: 500px;
}

.collection-content {
  margin: 10px;
  width:100%;
}

</style>
