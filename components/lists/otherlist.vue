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
            <nuxt-link
                :to="`/single/${
                  item.features[0]['@id'].split('/').splice(-1)[0]
                }`"
              >
              <v-hover v-slot="{hover}">
          <v-card-title class="artifact-title brown d-block white--text " :class="hover ? 'lighten-1' : ''">
            <p class="ma-0 pa-0">

                {{ item.features[0].properties.title }}
            </p>
            <p class="text-caption pa-0 ma-0">
              {{getFirstTypeByKeyword(item.features[0].types,'Artifact').label}}
              <span v-if="!!getFirstTypeByKeyword(item.features[0].types,'Artifact').subtype">({{getFirstTypeByKeyword(item.features[0].types,'Artifact').subtype}})</span>
            </p>
            <p class="text-caption pa-0 ma-0">
              <span v-if="item.features[0].when.timespans[0].start.earliest">
                from
                {{
                  item.features[0].when.timespans[0].start.earliest
                    .split("-")[0]
                    .replace(/^0+/, "")
                }}
              </span>

              <span
                v-if="
                  item.features[0].when.timespans[0].end.latest ||
                  item.features[0].when.timespans[0].end.earliest
                "
                >to
                {{
                  item.features[0].when.timespans[0].end.latest
                    ? item.features[0].when.timespans[0].end.latest
                        .split("-")[0]
                        .replace(/^0+/, "")
                    : item.features[0].when.timespans[0].end.earliest
                        .split("-")[0]
                        .replace(/^0+/, "")
                }}
              </span>
            </p>
          </v-card-title>
          </v-hover>
              </nuxt-link>

          <v-card-text class="text-body-1">
            <v-card outlined class="my-3" v-if="item.features[0].description">
              <v-card-text class="text-body-1">
                Category of Authenticity:    <nuxt-link
                :to='`/detaillist?codes=artifact&type_id=${getFirstTypeByKeyword(item.features[0].types,"Category of Authenticity").identifier.split("/").splice(-1)[0]}`'
              >{{getFirstTypeByKeyword(item.features[0].types,'Category of Authenticity').label}}</nuxt-link>
              </v-card-text>
              <v-card-text class="text-body-1">{{
                item.features[0].description[0].value
              }}</v-card-text>
            </v-card>
            <div class="card-columns" :style="cssVars">
              <div
                v-if="typeGroup[0].type !== 'Artifact' && typeGroup[0].type !== 'Category of Authenticity'"
                class="card-column"
                v-for="(typeGroup, index) in getOrderedTypes(
                  item.features[0].types
                )"
                :key="index + 2000"
              >
                <v-card class="mb-5" outlined>
                  <v-card-title
                    class="text-subtitle-2 justify-center brown lighten-3"
                    >{{ typeGroup[0].type }}
                  </v-card-title>
                  <v-card-text>
                    <p
                      v-for="(type, index) in typeGroup"
                      :key="index"
                      class="ma-0 ml-5 pa-0"
                    >
                      <nuxt-link
                                 :to='`/detaillist?codes=artifact&type_id=${type.id}`'
                      >
                        {{ type.label }}
                      </nuxt-link>
                      <span v-if="!!type.value"
                        >: {{ type.value }} {{ type.unit }}</span
                      >
                    </p>
                  </v-card-text>
                </v-card>
              </div>
            </div>
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
      filter: this.filter,
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
    getFirstTypeByKeyword(types,keyword) {
      let type = types.find((x) => x.hierarchy.split(" > ")[0] === keyword)

      type.supertype = type.hierarchy.split(" > ")[0];
      type.subtype = type.hierarchy.split(" > ")[1];
      return type;
    }
    ,
    getOrderedTypes(types) {
      if (!types) return {};
      const newTypes = types
        .map((type) => {
          var t = {};
          t.type = type.hierarchy.split(" > ")[0];
          t.subtype = type.hierarchy.split(" > ")?.[1];
          t.id = type.identifier.split("/").splice(-1)[0];
          t.label = type.label;
          t.value = type.value;
          t.unit = type.unit;
          return t;
        })
        .reduce((accumulator, element) => {
          if (!(element.type in accumulator))
            accumulator[element.type] = [element];
          else accumulator[element.type].push(element);
          return accumulator;
        }, {});
      return newTypes;
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
      let colCount = 2;
      if (this.$vuetify.breakpoint.name === "xs") colCount = 1;

      return {
        "--column-count": colCount,
      };
    },
  },
};
</script>
<style scoped>
.list-element:hover {
}
.list-element {
  transition: all 0.1s;
}

.card-columns {
  -moz-column-count: 4;
  -webkit-column-count: 4;
  column-count: var(--column-count);
}

.card-column {
  -webkit-column-break-inside: avoid; /* Chrome, Safari */
  page-break-inside: avoid; /* Theoretically FF 20+ */
  break-inside: avoid-column; /* IE 11 */
}
.artifact-title{
  transition: all 100ms linear !important;
}


</style>
