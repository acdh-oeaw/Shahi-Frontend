<template>
  <div class="mt-4">
    <p v-if="notFound" class="text-body-1 ma-5">
      No records found.
    </p>

    <v-card
      v-for="(item, index) in items"
      :key="index"
      outlined
      max-width="1500px"
      class="ma-5"
      style="overflow: hidden"
    >
      <v-row no-gutters>
        <v-col cols="12">
          <nuxt-link
            :to="`/single/${
              item.features[0]['@id'].split('/').splice(-1)[0]
            }`"
          >
            <v-hover v-slot="{hover}">
              <v-card-title
                class="artifact-title primary darken-2 d-block white--text"
                :class="hover ? 'lighten-1' : ''"
              >
                <p class="ma-0 pa-0">
                  {{ item.features[0].properties.title }}
                </p>
                <favorite-icon class="float-right" :id="id(item)" ></favorite-icon>
                <p class="text-caption pa-0 ma-0" v-if="!!getFirstTypeByKeyword(item.features[0].types, 'Artifact')">
                  {{ getFirstTypeByKeyword(item.features[0].types, 'Artifact').label }}
                  <span
                    v-if="!!getFirstTypeByKeyword(item.features[0].types,'Artifact').subtype"
                  >({{ getFirstTypeByKeyword(item.features[0].types, 'Artifact').subtype }})</span>
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
                      item.features[0].when.timespans[0].end.earliest
                          .split("-")[0]
                          .replace(/^0+/, "")
                    }}
                  </span>
                </p>
              </v-card-title>
            </v-hover>
          </nuxt-link>
          <v-row no-gutters>
            <v-col cols="12" sm="4" md="3">
              <v-card
                height="100%"
                rounded="0"
                class="d-flex align-center pa-sm-2"
                :class="{'borderBottom': $vuetify.breakpoint.xs}"
                elevation="0"
                color="grey lighten-2"
              >
                <v-img

                  max-width="100%"
                  :src="demoImageLinks[[Math.floor(Math.random()*demoImageLinks.length)]]"
                  alt="IMAGE"
                />
              </v-card>
            </v-col>
            <v-col cols="12" sm="8" md="9" class="px-5">
              <v-card v-if="item.features[0].description" outlined class="my-3">
                <v-card-text class="text-body-1">
                  Category of Authenticity:
                  <nuxt-link
                    v-if="!!getFirstTypeByKeyword(item.features[0].types, 'Category of Authenticity')"
                    :to="`/detaillist?codes=artifact&type_id=${getFirstTypeByKeyword(item.features[0].types,'Category of Authenticity').identifier.split(';').splice(-1)[0]}`"
                  >
                    {{ getFirstTypeByKeyword(item.features[0].types, 'Category of Authenticity').label }}
                  </nuxt-link>
                </v-card-text>
                <v-card-text class="text-body-1">
                  {{
                    item.features[0].description[0].value
                  }}
                </v-card-text>
              </v-card>
              <div class="card-columns" :style="cssVars">
                <div
                  v-for="(typeGroup, i) in getOrderedTypes(
                    item.features[0].types
                  )"
                  v-if="typeGroup[0].type !== 'Artifact' && typeGroup[0]
                    .type !== 'Category of Authenticity'"
                  :key="i + 2000"
                  class="card-column"
                >
                  <v-card class="mb-5" outlined>
                    <v-card-title
                      class="text-subtitle-2 justify-center primary lighten-1"
                    >
                      {{ typeGroup[0].type }}
                    </v-card-title>
                    <v-card-text>
                      <p
                        v-for="(type, idx) in typeGroup"
                        :key="idx"
                        class="ma-0 ml-5 pa-0"
                      >
                        <nuxt-link
                          :to="`/detaillist?codes=artifact&type_id=${type.id}`"
                        >
                          {{ type.label }}
                        </nuxt-link>
                        <span
                          v-if="!!type.value"
                        >: {{ type.value }} {{ type.unit }}</span>
                      </p>
                    </v-card-text>
                  </v-card>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <v-pagination
      v-model="options.page"
      :length="Math.floor(totalItems / options.itemsPerPage)"
      :total-visible="7"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    filter: {
      type: Object,
      default: () => {
      },
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
    window.scrollTo(0, 0);
  },
  data() {
    return {
      notFound: false,
      items: [],
      loading: true,
      options: {
        sortBy: [],
        sortDesc: [],
        page: 1,
        itemsPerPage: 10,
      },

      demoImageLinks: [
        'http://localhost:8080/iiif/images/shahi/1/1.jp2/full/400,/0/default.png',
        'http://localhost:8080/iiif/images/shahi/2/1.jp2/full/400,/0/default.png',
        'http://localhost:8080/iiif/images/shahi/3/1.jp2/full/400,/0/default.png',
      ],
      itemsPerPageOptions: [10, 20, 50, 100],
      totalItems: 0,
      itemIndex: [],
    };
  },
  computed: {
    ...mapGetters('app', [
      'getTypesBySystemClass',
      'getIconBySystemClass',
      'getLabelBySystemClass',
      'getCRMClassBySystemClass',
      'getSortColumnByPath',
      'getSystemClassForFilter',
      'getFilterList',
    ]),
    cssVars() {
      let colCount = 2;
      if (this.$vuetify.breakpoint.name === 'xs') colCount = 1;

      return {
        '--column-count': colCount,
      };
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
  },
  methods: {
    id(item){
      return item.features[0]['@id'].split('/').splice(-1)[0]
    },
    getValueFromType(item, type) {
      if (!item.features[0].types) {
        return '-';
      }

      return item.features[0].types
        .filter((t) => t.hierarchy === type)
        .map((x) => x.label)
        .join(', ');
    },
    getFirstTypeByKeyword(types, keyword) {
      const type = types.find((x) => x.hierarchy.split(' > ')[0] === keyword);

      if(type === undefined)
       return;

      [type.supertype, type.subtype] = type.hierarchy.split(' > ');

      return type;
    },
    getOrderedTypes(types) {
      if (!types) return {};
      return types
        .map((type) => {
          const t = {};
          [t.type, t.subtype] = type.hierarchy.split(' > ');
          [t.id] = type.identifier.split('/').splice(-1);
          t.label = type.label;
          t.value = type.value;
          t.unit = type.unit;
          return t;
        })
        .reduce((accumulator, element) => {
          if (!(element.type in accumulator)) accumulator[element.type] = [element];
          else accumulator[element.type].push(element);
          return accumulator;
        }, {});
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
  -moz-column-count: var(--column-count);
  -webkit-column-count: var(--column-count);
  column-count: var(--column-count);

}

.card-column {
  -webkit-column-break-inside: avoid; /* Chrome, Safari */
  page-break-inside: avoid; /* Theoretically FF 20+ */
  break-inside: avoid-column; /* IE 11 */
  overflow: hidden; /* Firefox */

}

.artifact-title {
  transition: all 100ms linear !important;
}

.borderBottom {
  border-bottom: 1px solid grey !important
}

</style>
