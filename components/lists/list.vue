<template>
  <div>
    <v-row no-gutters>
      <v-spacer />
      <v-spacer />
      <v-select
        v-if="items.length !== 0"
        v-model="selectedHeaders"
        class="mt-5"
        dense
        :items="$store.state.app.tableheaders.wide"
        label="Select Columns"
        multiple
        outlined
        return-object
      >
        <template v-slot:selection="{ item, index }">
          <v-chip v-if="index < 2" small>
            <span>{{ item.text }}</span>
          </v-chip>
          <span
            v-if="index === 2"
            class="grey--text caption"
          >(+{{ selectedHeaders.length - 2 }} others)</span>
        </template>
      </v-select>
    </v-row>
    <p v-if="notFound" class="text-body-1 ma-5">
      No records found.
    </p>
    <v-data-table
      v-if="items.length !== 0"
      :headers="showHeaders"
      :items="itemsWithType"
      :options.sync="options"
      :server-items-length="totalItems"
      :loading="loading"
      :calculate-widths="true"
      :footer-props="{
        showFirstLastPage: true,
        'items-per-page-options': itemsPerPageOptions,
      }"
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
      <template v-slot:item.features[0].properties.title="{ item }">
        <nuxt-link
          :to="`/single/${item.features[0]['@id'].split('/').splice(-1)[0]}`"
        >
          {{ item.features[0].properties.title }}
        </nuxt-link>
      </template>

      <template v-slot:item.features[0].description[0].value="{ item }">
        <div v-if="item.features[0].description" class="tablecolumndesc">
          {{ item.features[0].description[0].value }}
        </div>
        <div v-else>
          n/a
        </div>
      </template>
      <template v-slot:item.features[0].when.timespans[0].start.earliest="{ item }">
        <span v-if="!!item.features[0].when.timespans[0].start.earliest">
          {{ item.features[0].when.timespans[0].start.earliest
            .split("-")[0]
            .replace(/^0+/, "") }}
        </span>
      </template>
      <template v-slot:item.features[0].when.timespans[0].end.earliest="{ item }">
        <span v-if="!!item.features[0].when.timespans[0].end.earliest">
          {{ item.features[0].when.timespans[0].end.earliest
            .split("-")[0]
            .replace(/^0+/, "") }}
        </span>
      </template>
      <template
        v-for="slot in $store.state.app.tableheaders.wide.filter((x) =>
          x.value.startsWith('features[0].type')
        )"
        v-slot:[`item.${slot.value}`]="{ item }"
      >
        <div v-if="!!item.features[0].type">
          <nuxt-link
            v-for="(type, index) in item.features[0].type[slot.value.split('.')[2]]"
            :key="index"

            :to="`/list?codes=artifact&type_id=${type.identifier.split('/').splice(-1)[0]}`"
          >
            {{ type.label }}
            <span
              v-if="!!type.value"
            >({{ type.value }}<span v-if="type.unit"> {{ type.unit }}</span>)</span>
            <br>
          </nuxt-link>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    filter: {
      type: Object,
      default: () => {},
    },
  },
  async fetch() {
    this.loading = true;
    this.notFound = false;
    this.items = [];
    const {
      sortBy, sortDesc, page, itemsPerPage,
    } = this.options;
    try {
      // eslint-disable-next-line no-underscore-dangle
      const p = await this.$api.Entities.get_api_0_2_query_({
        limit: itemsPerPage,
        first: this.itemIndex[page - 1] ? this.itemIndex[page - 1].startId : null,
        filter: this.filter,
        column: sortBy ? this.getSortColumnByPath(sortBy[0]) : null,
        sort: sortDesc[0] ? 'desc' : 'asc',
      });
      // eslint-disable-next-line prefer-destructuring
      this.items = p.body.results;
      this.itemIndex = p.body.pagination.index;
      this.totalItems = p.body.pagination.entities;
    } catch (err) {
      this.notFound = true;
    }
    this.loading = false;
  },
  data() {
    return {
      items: [],
      loading: true,
      notFound: false,
      options: {
        sortBy: [],
        sortDesc: [],
        page: 1,
        itemsPerPage: 10,
      },
      itemsPerPageOptions: [10, 20, 50, 100],
      totalItems: 0,
      itemIndex: [],
      selectedHeaders: [],

    };
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
    itemsWithType() {
      if (this.items.length === 0) return [];

      return this.items.map((item) => {
        item.features[0].type = item.features[0].types
          ?.map((x) => {
            [x.supertype] = x.hierarchy.split(' > ');
            return x;
          })
          .reduce((r, a) => {
            const key = a.supertype.toLowerCase().replace(/\s+/g, '');
            r[key] = [...(r[key] || ''), a];
            return r;
          }, {});
        return item;
      });
    },
    showHeaders() {
      return this.$store.state.app.tableheaders.wide.filter((s) => this.selectedHeaders.includes(s));
    },
  },
  watch: {
    options: {
      handler(o, n) {
        if (o.sortBy !== n.sortBy || o.sortDesc !== n.sortDesc) this.itemIndex = [];
        this.$fetch();
      },
      deep: true,
    },
    filter: {
      handler() {
        this.itemIndex = [];
        this.totalItems = 0;
        this.options.page = 1;
        this.$fetch();
      },
      deep: true,
    },
    '$store.state.app.filterelements': {
      handler() {
        this.itemIndex = [];
        this.totalItems = 0;
        this.$fetch();
      },
      immediate: true,
      deep: true,
    },
  },
  created() {
    this.selectedHeaders = this.$store.state.app.tableheaders.wide.filter((x) => x.visible);
  },

};
</script>
