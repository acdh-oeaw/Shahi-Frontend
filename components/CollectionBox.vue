<template>
  <div class="collection-container secondary">
    <div class="collection-content">
      <p class="title-2">
        {{ collection.name }}
      </p>
      <p style="white-space: pre-line" class="collection-description text-body-1">
        {{ collection.description }}
      </p>
      <div
        @click="routeToCollection()"
      >
        <p
          class=" primary--text go-to-map-button"
          text
        >
          Explore Collection
          <v-icon class="ml-n1">
            mdi-chevron-right
          </v-icon>
        </p>
      </div>
    </div>
    <div class="collection-image primary" />
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';
import * as collection from 'postcss-selector-parser';

export default {

  name: 'CollectionBox',
  async asd() {
    console.log(this.collection.id);
    // eslint-disable-next-line no-underscore-dangle

    // eslint-disable-next-line prefer-destructuring
  },
  props: ['collection'],

  async mounted() {
    const p = await this.$api.Entities.get_api_0_2_entity__id__({
      id_: this.collection.id,
    });
  },
  methods: {
    ...mapActions('query', ['searchByFilterId']),
    routeToCollection() {
      this.searchByFilterId(this.collection.id);
      this.$router.push({
        name: 'data-list-q',
        query: { ...this.getQuery, collection: this.collection.id },
      });
    },
  },
  computed: {
    ...mapGetters('query', ['getQuery']),
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
