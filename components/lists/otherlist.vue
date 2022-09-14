<template>
  <div class="mt-4">
    <p v-if="notFound" class="text-body-1 ma-5">
      No records found.
    </p>
    <div v-else>
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
                  class="artifact-title secondary darken-3 d-block white--text"
                  :class="hover ? 'lighten-1' : ''"
                >
                  <p class="ma-0 pa-0">
                    {{ item.features[0].properties.title }}
                  </p>
                  <favorite-icon :id="id(item)" class="float-right" />
                  <p v-if="!!getFirstTypeByKeyword(item.features[0].types, 'Artifact')" class="text-caption pa-0 ma-0">
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
                    v-if="!!item.features[0].depictions && !!item.features[0].depictions.length !== 0"

                    max-width="100%"
                    :src="item.features[0].depictions[0].url"
                    alt="IMAGE"
                  />
                  <p v-else class="text-body-1 ma-auto">
                    No image available
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" sm="8" md="9" class="px-5">
                <v-card v-if="item.features[0].descriptions" outlined class="my-3">
                  <v-card-text class="text-caption py-2">
                    <tooltip-icon :text="$store.state.app.tableheaders['wide'].find(x => x.text === 'Category of Authenticity').description" />

                    Category of Authenticity:
                    <span
                      v-if="!!getFirstTypeByKeyword(item.features[0].types, 'Category of Authenticity')"
                      class="clickable"
                      @click="searchByFilterId(parseInt(getFirstTypeByKeyword(item.features[0].types,'Category of Authenticity').identifier.split('/').splice(-1)[0]))"
                    >
                      {{ getFirstTypeByKeyword(item.features[0].types, 'Category of Authenticity').label }}
                    </span>

                  </v-card-text>
                  <v-card-text  class="text-body-1 py-2">
                    {{item.features[0].descriptions[0].value}}
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
                        class="text-subtitle-2 justify-center secondary"
                      >
                        {{ typeGroup[0].type }}
                      </v-card-title>
                      <v-card-text>
                        <p
                          v-for="(type, idx) in typeGroup"
                          :key="idx"
                          class="ma-0 ml-5 pa-0"
                        >
                          <span
                            class="clickable"
                            @click="searchType(parseInt(type.id))"
                          >
                            {{ type.label }}
                          </span>
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
        :value="parseInt(options.page)"
        :length="Math.floor(totalItems / options.itemsPerPage)"
        :total-visible="7"
        @input="newPage"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    filter: {
      type: Object,
      default: () => {
      },

    },
    items: {
      type: Array,
      default: [],
    },
    totalItems: {
      type: Number,
      default: () => 0,
    },
    notFound: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      loading: true,

      demoImageLinks: [
        'https://shahi-img.acdh-dev.oeaw.ac.at/iiif/images/artefacts/1/1.jp2/full/500,/0/default.jpg',
        'https://shahi-img.acdh-dev.oeaw.ac.at/iiif/images/artefacts/2/1.jp2/full/500,/0/default.jpg',
      ],
      demoThumbnailLinks: [
        'https://shahi-img.acdh-dev.oeaw.ac.at/iiif/images/artefacts/1/1.jp2/full/200,/0/default.jpg',
        'https://shahi-img.acdh-dev.oeaw.ac.at/iiif/images/artefacts/2/1.jp2/full/200,/0/default.jpg',
      ],
      itemsPerPageOptions: [10, 20, 50, 100],
      itemIndex: [],
    };
  },
  computed: {
    options: {
      get() {
        return {
          sortBy: [],
          sortDesc: [],
          page: this.$route.query.page || 1,
          itemsPerPage: this.$route.query.itemsperpage || 10,
        };
      },
    },
    ...mapGetters('app', [
      'getTypesBySystemClass',
      'getIconBySystemClass',
      'getLabelBySystemClass',
      'getCRMClassBySystemClass',
      'getSortColumnByPath',
      'getSystemClassForFilter',
      'getFilterList',
    ]),
    ...mapGetters('query', ['getQuery']),
    cssVars() {
      let colCount = 2;
      if (this.$vuetify.breakpoint.name === 'xs') colCount = 1;

      return {
        '--column-count': colCount,
      };
    },
  },
  watch: {
    items() {
      window.scrollTo({ top: 0 });
    },
  },
  methods: {
    ...mapActions({
      searchByFilterId: 'query/searchByFilterId',
    }),
    id(item) {
      return item.features[0]['@id'].split('/').splice(-1)[0];
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
      const type = types?.find((x) => x.hierarchy.split(' > ')[0] === keyword);

      if (type === undefined) return;

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
    newPage(page) {
      this.$router.replace({ name: this.$route.name, query: { ...this.$route.query, page } });
    },
    searchType(id) {
      this.searchByFilterId(id);
      let name = 'data-list-q';
      if (this.$route.name.startsWith('data-')) name = this.$route.name;

      this.$router.push({
        name,
        query: this.getQuery,
      });
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
