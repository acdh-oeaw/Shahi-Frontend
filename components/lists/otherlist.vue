<template>
  <div class="mt-4">
    <v-card
      v-for="(item, index) in items"
      :key="index"
      outlined
      rounded="lg"
      class="ma-2 mr-5"
      style="overflow: hidden"
    >
      <v-row no-gutters>
        <v-col cols="12" sm="3" md="2">
          <v-img
            max-width="100%"
            :src="
              'http://localhost:8182/iiif/3/' +
              ['sculpture', 'plate'][Math.floor(Math.random() * 2)] +
              '1.jpg/full/400,/0/default.jpg'
            "
          ></v-img>
        </v-col>
        <v-col cols="12" sm="9" md="10">
          <v-card-title
            ><router-link
              :to="`/single/${
                item.features[0]['@id'].split('/').splice(-1)[0]
              }`"
            >
              {{ item.features[0].properties.title }}
            </router-link></v-card-title
          >
          <v-card-text style="min-width: 100vw" class="text-body-1">
            <p
              class="mb-1"
              v-if="item.features[0].when.timespans[0].start.earliest"
            >
              from {{ item.features[0].when.timespans[0].start.earliest }}
            </p>

            <p
              class="mb-1"
              v-if="item.features[0].when.timespans[0].end.latest"
            >
              to {{ item.features[0].when.timespans[0].end.latest }}
            </p>

            <div v-if="item.features[0].description">
              {{ item.features[0].description[0].value }}
            </div>
            <v-row>
              <v-col
                cols="6"
                v-for="(type, index) in item.features[0].types"
                :key="index"
              >
                {{ type.hierarchy }} : {{ type.label }}
              </v-col>
            </v-row>
          </v-card-text>
        </v-col></v-row
      >
    </v-card>

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
    window.scrollTo(0, 0);
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
}
.list-element {
  transition: all 0.1s;
}
</style>
