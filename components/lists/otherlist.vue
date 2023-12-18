<template>
  <div class="mt-4" style="position: relative;">
    <div id="list-anchor" style="position: absolute; top: -200px; left: 0"></div>
    <p v-if="notFound" class="text-body-1 ma-5">
      No records found.
    </p>
    <div v-else>
      <v-card v-for="(item, index) in filteredItems" :key="index" outlined max-width="1500px" class="ma-5"
        style="overflow: hidden">
        <v-row no-gutters>
          <v-col cols="12">
            <nuxt-link :to="`/single/${item.features[0]['@id'].split('/').splice(-1)[0]
              }`">
              <v-hover v-slot="{ hover }">
                <v-card-title class="artifact-title secondary darken-3 d-flex justify-space-between white--text"
                  :class="hover ? 'lighten-1' : ''">
                  <div>
                    <p class="ma-0 pa-0">
                      {{ item.features[0].properties.title }}
                    </p>
                    <p v-if="!!getFirstTypeByKeyword(item.features[0].types, 'Artifact')" class="text-caption pa-0 ma-0">
                      {{ getFirstTypeByKeyword(item.features[0].types, 'Artifact').label }}
                      <span v-if="!!getFirstTypeByKeyword(item.features[0].types, 'Artifact').subtype">({{
                        getFirstTypeByKeyword(item.features[0].types, 'Artifact').subtype }})</span>
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

                      <span v-if="
                        item.features[0].when.timespans[0].end.latest ||
                        item.features[0].when.timespans[0].end.earliest
                      ">to
                        {{
                          item.features[0].when.timespans[0].end.earliest
                            .split("-")[0]
                            .replace(/^0+/, "")
                        }}
                      </span>
                    </p>
                  </div>
                  <favorite-icon :id="id(item)" class="" />
                </v-card-title>
              </v-hover>
            </nuxt-link>
            <v-row no-gutters>
              <v-col cols="12" sm="4" md="3">
                <image-card color="grey lighten-2" :item="item"></image-card>
              </v-col>
              <v-col class="px-5">
                <v-card v-if="item.features[0].descriptions" flat class="my-3">
                  <v-card-text class="text-caption py-2"
                    v-if="!!getFirstTypeByKeyword(item.features[0].types, 'Category of Authenticity')">
                    <tooltip-icon
                      :text="$store.state.app.tableheaders['artifact'].find(x => x.text === 'Category of Authenticity').description" />

                    Category of Authenticity:
                    <span class="clickable"
                      @click="searchByFilterId(parseInt(getFirstTypeByKeyword(item.features[0].types, 'Category of Authenticity').identifier.split('/').splice(-1)[0]))">
                      {{ getFirstTypeByKeyword(item.features[0].types, 'Category of Authenticity').label }}
                    </span>

                  </v-card-text>
                  <v-card-text class="text-body-1 py-2">
                    {{ item.features[0].descriptions[0].value }}
                  </v-card-text>
                  <v-card-text class="text-body-1 py-2">


                    <div class="card-columns" :style="cssVars">
                      <div v-for="(typeGroup, i) in getOrderedTypes(
                        item.features[0].types
                      )" v-if="typeGroup[0].type !== 'Artifact' && typeGroup[0].type !== 'Category of Authenticity'"
                        :key="i + 2000" class="card-column">
                        <p class="text-body-1 font-weight-bold justify-center mb-0 mt-3">
                          {{ typeGroup[0].type }}
                        </p>
                        <p v-for="(type, idx) in typeGroup" :key="idx" class="ma-0 pa-0">
                          <span class="clickable" @click="searchType(parseInt(type.id))">
                            {{ type.label }}
                          </span>
                          <span v-if="!!type.value">: {{ type.value }} {{ type.unit }}</span>
                        </p>

                      </div>
                    </div>
                  </v-card-text>

                </v-card>

              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
      <v-pagination :value="parseInt(options.page)" :length="Math.ceil(filteredBaseItems.length / options.itemsPerPage)"
        :total-visible="7" @input="newPage" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import filterItemsMixin from '~/mixins/filterItemsMixin';

export default {
  mixins: [filterItemsMixin],
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
    filteredItems(){
      const localItems = this.filteredBaseItems;
      const currentPage = this.options.page - 1;
      const ipp = this.options.itemsPerPage;
      return localItems.slice(currentPage * ipp, currentPage * ipp + ipp)
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
      document.getElementById("list-anchor").scrollIntoView({ block: 'start' });

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
.list-element {
  transition: all 0.1s;
}

.card-columns {
  -moz-column-count: var(--column-count);
  -webkit-column-count: var(--column-count);
  column-count: var(--column-count);

}

.card-column {
  -webkit-column-break-inside: avoid;
  /* Chrome, Safari */
  page-break-inside: avoid;
  /* Theoretically FF 20+ */
  break-inside: avoid-column;
  /* IE 11 */
  overflow: hidden;
  /* Firefox */

}

.artifact-title {
  transition: all 100ms linear !important;
}

.borderBottom {
  border-bottom: 1px solid grey !important
}
</style>
