<template>
  <div class="collection-container secondary">
    <div class="collection-content">
      <p class="title-2">
        {{ collection.name }}
      </p>
      <div class="description">
        <p v-if="!moreInfo && !!collection.description" style="white-space: pre-line" class="collection-description text-body-1">
          {{ collection.description.split('\r\n\r\n')[0] }}
        </p>
      </div>
      <div
        @click="routeToCollection()"
      >
        <p
          class=" primary--text go-to-map-button mt-3"
          text
        >
          Explore Collection
          <v-icon class="ml-n1">
            mdi-chevron-right
          </v-icon>
        </p>
      </div>
    </div>

    <div class="collection-image primary" :style="{'--background-image':`url(${image})`}">
      <v-img height="100%" v-if="image" :src="image" />
    </div>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';
import * as collection from 'postcss-selector-parser';
import axios from 'axios';

export default {

  name: 'CollectionBox',
  props: ['collection'],
  data() {
    return {
      moreInfo: false,
      collectionDetails: undefined,
    };
  },

  async mounted() {
    const p = await this.$api.Entities.get_api_0_3_entity__id__({
      id_: this.collection.id,
    });
    this.collectionDetails = p.body.features[0];
  },
  methods: {
    ...mapActions('query', ['searchByFilterId', 'setCodes']),
    routeToCollection() {
      this.setCodes('artifact');
      this.searchByFilterId(this.collection.id);
      this.$router.push({
        name: 'data-list-q',
        query: { ...this.getQuery, collection: this.collection.id },
      });
    },
  },
  computed: {
    ...mapGetters('query', ['getQuery']),
    image() {
      return this.collectionDetails?.depictions?.[0]?.url;
    },
  },
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
}

.collection-content {
  margin: 20px;
  max-width: 600px;
}

</style>
