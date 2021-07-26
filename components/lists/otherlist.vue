<template>
  <div>
    <v-list>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        class="ma-5 list-element"
      >
        <v-img
          class="ma-2 mr-5"
          max-width="120px"
          :src="
            'http://localhost:8182/iiif/3/' +
            ['sculpture', 'plate'][Math.floor(Math.random() * 2)] +
            '1.jpg/full/120,/0/default.jpg'
          "
        ></v-img>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1 pink--text">
            <router-link
              :to="`/single/${
                item.features[0]['@id'].split('/').splice(-1)[0]
              }`"
            >
              {{ item.features[0].properties.title }}
            </router-link>
          </v-list-item-title>
          <v-list-item-title class="title mb-1"
            >{{ item.features[0].when.timespans[0].start.earliest }} -
            {{ item.features[0].when.timespans[0].end.latest }}
          </v-list-item-title>

          <v-row>
            <v-col
              cols="6"
              v-for="(type, index) in item.features[0].types"
              :key="index"
            >
              {{ type.hierarchy }} : {{ type.label }}
            </v-col>
          </v-row>
          <div v-if="item.features[0].description">
            {{ item.features[0].description[0].value }}
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="options.page++"> Load more </v-list-item>
    </v-list>
    <v-pagination
      v-model="options.page"
      :length="Math.floor(totalItems / options.itemsPerPage)"
      :total-visible="7"
    ></v-pagination>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    filter: {
      type: Object,
      default: () => {},
    },
  },
  async fetch() {
    this.loading = true;
    const { sortBy, sortDesc, page, itemsPerPage } = this.options;
    // eslint-disable-next-line no-underscore-dangle
    const p = await this.$api.Entities.get_api_0_2_query_({
      limit: itemsPerPage,
      first: this.itemIndex[page - 1] ? this.itemIndex[page - 1].startId : null,
      codes: this.getSystemClassForFilter,
      filter: this.getFilterList,
      column: sortBy ? this.getSortColumnByPath(sortBy[0]) : null,
      sort: sortDesc[0] ? "desc" : "asc",
    });
    // eslint-disable-next-line prefer-destructuring
    console.log(p.body);
    this.items = p.body.results;
    this.itemIndex = p.body.pagination.index;
    this.totalItems = p.body.pagination.entities;
    this.loading = false;
  },
  data() {
    return {
      items: [],
      loading: true,
      options: {
        sortBy: [],
        sortDesc: [],
        page: 1,
        itemsPerPage: 10,
      },
      itemsPerPageOptions: [10, 20, 50, 100],
      totalItems: 0,
      itemIndex: [],
    };
  },
  watch: {
    options: {
      handler(o, n) {
        if (o.sortBy !== n.sortBy || o.sortDesc !== n.sortDesc)
          this.itemIndex = [];
        this.$fetch();
      },
      deep: true,
    },
    filter: {
      handler() {
        this.$fetch();
      },
      deep: true,
    },
  },
  methods: {
    getValueFromType(item, type) {
      if (!item.features[0].types) {
        return "-";
      }
      console.log(type);

      return item.features[0].types
        .filter((t) => t.hierarchy === type)
        .map((x) => x.label)
        .join(", ");
    },
  },
  computed: {
    ...mapGetters("app", [
      "getTypesBySystemClass",
      "getIconBySystemClass",
      "getLabelBySystemClass",
      "getCRMClassBySystemClass",
      "getSortColumnByPath",
      "getSystemClassForFilter",
      "getFilterList",
    ]),
  },
};
</script>
<style scoped>
.list-element:hover {
  transform: scale(1.005);
}
.list-element {
  transition: all 0.1s;
}
</style>
