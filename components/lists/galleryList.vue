<template>
  <div>
    <div v-if="!loading" class="mt-15 mx-5 gallery-columns" :style="cssVars">
      <div class="gallery-column" v-for="(item, index) in items" :key="index">
        <div class="gallery-content +">
          <p class="text-center">{{ item.features[0].properties.title }}</p>

          <div
            class="grey lighten-3 ma-2"
            :style="'height:' + (Math.ceil(Math.random() * 2) + 1) + '00px;'"
          >
            #{{ index }}
          </div>
        </div>
        <nuxt-link
          :to="`/single/${item.features[0]['@id'].split('/').splice(-1)[0]}`"
        >
          <div class="gallery-background"></div>
        </nuxt-link>
      </div>
    </div>
    <div v-else style="width: 100vw; height: 60vh">
      <v-progress-circular
        style="position: absolute; top: 0; right: 0; bottom: 0; left: 0"
        class="ma-auto"
        :size="150"
        
        indeterminate
      ></v-progress-circular>
    </div>
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
    window.scrollTo(0, 0);
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
        itemsPerPage: 20,
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

    cssVars() {
      let colCount = 3;
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          colCount = 1;
          break;
        case "sm":
          colCount = 2;
          break;
        case "md":
          colCount = 3;
          break;
        case "lg":
          colCount = 4;
          break;
        case "xl":
          colCount = 4;
          break;
      }
      return {
        "--column-count": colCount,
      };
    },
  },
};
</script>
<style scoped>
.gallery-columns {
  -moz-column-count: 4;
  -webkit-column-count: 4;
  column-count: var(--column-count);
}

.gallery-column {
  margin-bottom: 20px;
  -webkit-column-break-inside: avoid; /* Chrome, Safari */
  page-break-inside: avoid; /* Theoretically FF 20+ */
  break-inside: avoid-column; /* IE 11 */
  position: relative;
}
.gallery-content {
  position: relative;
  padding-bottom: 20px;
  z-index: 20;
  pointer-events: none;
}

.gallery-background {
  z-index: 10;
  border: 1px solid #ccc;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.gallery-background:hover {
  transform: scale(1.05);
  transition: all 100ms linear;
  background-color: lightgray;
}
</style>
