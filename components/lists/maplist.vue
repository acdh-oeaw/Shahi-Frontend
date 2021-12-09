<template>
  <v-row no-gutters>
    <v-col xs="0" lg="9">
      <div class="fullheight">
        <qmap v-if="!this.loading" :geojsonitems="items" />
      </div>
    </v-col>
    <v-col xs="12" lg="3">
      <v-data-table
        :headers="$store.state.app.tableheaders.narrow"
        :items="items"
        :options.sync="options"
        :server-items-length="totalItems"
        :loading="loading"
        :calculate-widths="true"
        :hide-default-footer="true"
      >
        <template v-slot:top="{ pagination, options, updateOptions }">
          <v-data-footer
            :pagination="pagination"
            :options="options"
            :items-per-page-options="itemsPerPageOptions"
            show-first-last-page
            @update:options="updateOptions"
          />
        </template>
        <template v-slot:item.features[0].systemClass="{ item }">
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
              >
                {{ getIconBySystemClass(item.features[0].systemClass) }}
              </v-icon>
            </template>
            <span>
              {{ getCRMClassBySystemClass(item.features[0].systemClass) }}
              -
              {{ getLabelBySystemClass({ c: item.features[0].systemClass, l: 'en' }) }}
            </span>
          </v-tooltip>
        </template>
        <template v-slot:item.features[0].properties.title="{ item }">
          <nuxt-link :to="`/single/${item.features[0]['@id'].split('/').splice(-1)[0]}`">
            {{ item.features[0].properties.title }}
          </nuxt-link>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex';
import qmap from '~/components/map.vue';

export default {
  components: {
    qmap,
  },
  props: {
    filter: {
      type: Object,
      default: () => {},
    },
    items:{
      type: Array,
      default:[],
    },
    totalItems: {
      type: Number,
      default: () => 0,
    },
  },

  data() {
    return {
      loading: false,
      options: {
        sortBy: [],
        sortDesc: [],
        page: 1,
        itemsPerPage: 50,
      },
      itemsPerPageOptions: [10, 20, 50],
      itemIndex: [],
    };
  },
  watch: {
  },
  computed: {
    ...mapGetters('app', [
      'getIconBySystemClass',
      'getLabelBySystemClass',
      'getCRMClassBySystemClass',
      'getSortColumnByPath',
       'getSystemClassForFilter',
      'getFilterList',
    ]),
  },
};
</script>
<style>
.fullheight {
  height: calc(100vh - 140px);
}
</style>
