<template>
  <v-menu
    v-model="open"
    :close-on-content-click="false"
    offset-y
    bottom
    left
    content-class="elevation-0 rounded-0 pa-5 pt-2 filter-window"
    transition="slide-y-transition"
    max-width="100vw"
    class="transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-icon v-bind="attrs" v-on="on">
        mdi-filter
      </v-icon>
    </template>
    <menu-window>
      <!--System Classes-->
      <v-card-text v-if="false">
        <v-btn
          v-for="(systemClass, index) in filterElements"
          :key="index"
          :color="index === selectedClass ? 'primary ' : ''"
          elevation="0"
          @click="selectedClass = index"
        >
          {{ systemClass.en }}
        </v-btn>
      </v-card-text>
      <!--Current Filters-->
      <v-expand-transition>
        <v-card-text
          v-if="currentFilters.length !=0"
          style="min-height: 72px; max-width:732px"
          class="mx-4 mb-0 pb-0 secondary rounded"
        >
          <p class="mb-1">
            Current filters:
          </p>
          <v-chip v-for="filter in currentFilters" :key="filter.id" label small class="mr-2 mb-2">
            <span class="text--secondary">{{ filter.superType }}:</span>
            <span v-if="filter.type==='name' || filter.type =='description'"
                  class="font-weight-bold ml-1">{{ filter.value }}</span>
            <span v-else class="font-weight-bold ml-1"> {{ filter.en }}</span>
            <v-icon
              class="pl-2"
              small
              @click="selectItem(filter)"
            >
              $delete
            </v-icon>
          </v-chip>
        </v-card-text>
      </v-expand-transition>
      <!--Normal Search-->
      <v-card-text v-if="!globalSearch" class="mt-1 pt-0">
        <v-row no-gutters>
          <!--Select Supertype-->
          <v-col cols="12" sm="auto" style="min-width: 200px">
            <v-btn
              v-if="$vuetify.breakpoint.xsOnly"
              outlined
              small
              class="text-caption mb-2"
              @click="showSupertype= !showSupertype"
            >
              {{ showSupertype ? 'Hide all Properties' : 'Show all Properties' }}
            </v-btn>
            <v-slide-y-transition mode="in-out" hide-on-leave>
              <v-list
                v-if="showSupertype || $vuetify.breakpoint.smAndUp"
                max-width="200px"
                class="grey lighten-4"
              >
                <v-list-item-group v-model="selected" mandatory class="d-inline-block">
                  <v-expand-transition
                    v-for="(item, index) in filterElements[selectedClass].items"
                    :key="item.systemClass"
                    appear
                  >
                    <div>
                      <v-list-item
                        :value="index"
                        :class="{'font-weight-bold' : hasSetValue(item)}"
                        @click="showSupertype=false"
                      >
                        {{ item.en }}
                      </v-list-item>
                    </div>
                  </v-expand-transition>
                </v-list-item-group>
              </v-list>
            </v-slide-y-transition>
          </v-col>
          <!--Select Subtypes-->
          <v-col v-if="selectedClass !== undefined &&selected !== undefined" style="width: 500px">
            <v-slide-y-transition mode="out-in">
              <v-card v-if="!showSupertype || $vuetify.breakpoint.smAndUp" flat>
                <v-card-title>
                  {{ filterElements[selectedClass].items[selected].en }}
                  <tooltip-icon
                    v-if="!!filterElements[selectedClass].items[selected]
                      .description"
                    :text="filterElements[selectedClass].items[selected]
                      .description"
                  />
                </v-card-title>
                <v-text-field
                  v-if="
                    filterElements[selectedClass].items[selected].type ===
                      'multiple'
                  "
                  v-model="searchKeyword"
                  class="px-3"
                  label="Search for keyword"
                />

                <v-card-text
                  style="overflow: auto; max-height: 370px"
                >
                  <!--Type search-->
                  <v-row
                    v-if="
                      filterElements[selectedClass].items[selected].type ===
                        'multiple'
                    "
                    no-gutters
                  >
                    <v-col
                      v-for="(item) in searchedTypes"
                      :key="item.id"
                      cols="12"
                      sm="6"
                    >
                      <div
                        class="filter-element"
                        :class="{'filter-element-clicked': item.value}"
                        @click="selectItem(item)"
                      >
                        <span>{{ item.en }}</span>

                        <v-icon
                          v-if="!!item.subs && item.subs.length !== 0"
                          small
                          class="expand-icon float-right"
                          :class="{'expand-icon-expanded' : item.showSubtypes}"
                          @click.stop="item.showSubtypes = !item.showSubtypes"
                        >
                          mdi-chevron-down
                        </v-icon>
                        <v-icon
                          v-if="item.value"
                          style="float: right"
                          small
                        >
                          mdi-close
                        </v-icon>
                      </div>

                      <v-expand-transition>
                        <div v-if="item.showSubtypes">
                          <div
                            v-for="(subtype, index) in searchedTypes.filter(x=>x.root
                              .includes(item.id))"
                            :key="index"
                            class="filter-element ml-2"
                            :class="{'filter-element-clicked' : subtype.value}"
                            @click="subtype.value = !subtype.value"
                          >
                            <span>{{ subtype.en }}</span>

                            <v-icon
                              v-if="subtype.value"
                              style="float: right"
                              small
                            >
                              mdi-close
                            </v-icon>
                          </div>
                        </div>
                      </v-expand-transition>
                    </v-col>
                  </v-row>
                  <!--String search-->
                  <v-row
                    v-if="
                      filterElements[selectedClass].items[selected].type ===
                        'text'
                    "
                  >
                    <v-col
                      v-for="item in filterElements[selectedClass].items[
                        selected
                      ].values"
                      :key="item.id"
                      cols="12"
                    >
                      <v-text-field v-model="item.value" :label="item.en" @keydown.enter="search"/>
                    </v-col>
                  </v-row>
                  <!--Time Search-->
                  <v-row
                    v-if="
                      filterElements[selectedClass].items[selected].type ===
                        'time'
                    "
                  >
                    <v-col
                      cols="12"
                    >
                      <filter-window-time-selection
                        v-model="filterElements[selectedClass].items[
                          selected
                        ].values"
                      />
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-slide-y-transition>
          </v-col>
        </v-row>
      </v-card-text>
      <!--Global Search-->
      <div v-else>
        <v-card-text>
          <p class="text-body-1">
            Hit enter to search by Name:
            <v-chip label small>
              "{{ globalSearch }}"
            </v-chip>
          </p>
          <v-divider color="secondary"/>
        </v-card-text>
        <v-card-text class="ma-0 py-0 d-flex justify-space-between">
          <p class="text-body-1">
            Search by types:
          </p>
          <div>
            <v-chip label small @click="selectAll">Select All</v-chip>
          </div>
        </v-card-text>
        <v-card-text
          class=" hidden"
          style="overflow: auto; max-height: 370px; width: 735px"
        >
          <v-row
            no-gutters
          >
            <v-col
              v-for="item in searchedTypes"
              :key="item.id"
              cols="12"
              sm="6"
            >
              <div
                class="filter-element"
                :class="item.value ? 'filter-element-clicked' : ''"
                @click="selectItem(item)"
              >
                <span><span class="text--secondary">{{ item.superType }}:</span> {{ item.en }} </span>

                <v-icon
                  v-if="item.value"
                  style="float: right"
                  small
                >
                  mdi-close
                </v-icon>
              </div>
            </v-col>
            <p v-if="searchedTypes.length === 0">
              Nothing found
            </p>
          </v-row>
        </v-card-text>
      </div>
      <v-btn absolute right bottom color="secondary" @click="search">
        <v-icon>mdi-magnify</v-icon>
        Search
      </v-btn>
    </menu-window>
  </v-menu>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'FilterWindow',
  props: {
    globalSearch: {default: '', type: String},
    openWindow: {type: Boolean},
    searchKeydownEnter: {type: Boolean, default: false},
  },
  data() {
    return {
      color: 'lightgrey',
      open: false,
      showSupertype: false,
      selected: 0,
      selectedClass: 0,
      filterElements: [{}],
      query: {},
      searchKeyword: '',
      searchedTypes: [],
      attachTo: "asd"
    };
  },
  computed: {
    ...mapGetters('app', ['getFilterObject', 'getSystemClassForFilter', 'getFilterById']),
    ...mapGetters('query', ['getQuery']),
    propertySelectedClassAndSelectedAndSearchKeyword() {
      return `${this.selectedClass}|${this.selected}|${this.searchKeyword}|${this.reloadItems}`;
    },
    ...mapGetters('query', ['getCurrentSystemClass', 'getFiltersFlat']),
    currentFilters() {
      return this.filterElements[this.selectedClass]?.items
        ?.flatMap((y) => y.values.map(x => ({
          id: x.id, en: x.en, value: x.value, type: x.type, operator: x.logicalOperator, superType: y.en
        })))
        .filter((x) => x.value)
    },
  },
  watch: {
    async searchKeydownEnter() {
      this.filterElements[this.selectedClass].items.find(x => x.label === 'name').values[0].value = this.globalSearch;
      await new Promise((resolve) => {
        setTimeout(resolve, 100);
      });
      this.search();
    },
    openWindow() {
      this.open = !this.open;
    },
    globalSearch() {
      if (this.globalSearch) {
        this.open = true;
        this.searchedTypes = this.filterElements[this.selectedClass].items
          .flatMap((x) => x.values.map(y => ({...y, superType: x.en})))
          .filter((element) => element.en.toLowerCase().includes(this.globalSearch.toLowerCase()))
          .map((element) => {
            const e = {...element};
            e.root = [];
            e.subs = [];
            return e;
          });
      }
    },
    selectedClass() {
      this.selected = 0;
      this.searchKeyword = '';
    },
    selected() {
      this.searchKeyword = '';
    },
    '$store.state.app.filterelements': {
      handler() {
        this.filterElements = JSON.parse(
          JSON.stringify(this.$store.state.app.filterelements),
        );
      },
      immediate: true,
      deep: true,
    },
    '$store.state.query.filters': {
      handler() {
        this.filterElements[0].items.forEach((item) => {
          item.values.forEach((value) => {
            const match = this.getFiltersFlat.find((setFilter) => setFilter.id === value.id);
            if (match) value.value = match.value;
            else value.value = value.type == 'type' ? false : '';
          });
        });
        this.$store.commit('app/setFilterElements', this.filterElements);
        this.searchedTypes = this.filterElements?.[this.selectedClass]
          .items?.[this.selected].values;
      },
      immediate: true,
      deep: true,
    },
    propertySelectedClassAndSelectedAndSearchKeyword() {
      if (!this.searchKeyword) {
        this.searchedTypes = this.filterElements?.[this.selectedClass]
          .items?.[this.selected].values;
      } else {
        this.searchedTypes = this.filterElements[this.selectedClass].items[
          this.selected
          ].values
          .filter((element) => element.en.toLowerCase()
            .includes(this.searchKeyword.toLowerCase()))
          .map((element) => {
            const e = {...element};
            e.root = [];
            e.subs = [];
            return e;
          });
      }
    },
  },
  async beforeMount() {
    this.filterElements = JSON.parse(
      JSON.stringify(this.$store.state.app.filterelements),
    );
    this.loadAllTypesFromBackend();
  },
  methods: {
    ...mapActions({
      updateFiltersFromUrl: 'query/updateFiltersFromUrl',
      setSearch: 'query/setSearch',
      setCodes: 'query/setCodes',
    }),
    async loadAllTypesFromBackend() {
      const p = await this.$api.Nodes.get_api_type_tree_();
      const typeTree = Object.values(p.body.typeTree);

      this.filterElements.forEach((filterElement) => {
        filterElement.items.forEach((item) => {
          if (item.id) {
            const thisType = typeTree.find((x) => x.id.toString() === item.id)
            if (thisType)
              item.en = thisType.name;
            const allTypes = typeTree.filter((x) => x.root
              .includes(parseInt(item.id, 10)));

            const mapFunction = (x) => {
              const element = x;
              return {
                en: element.name,
                id: element.id,
                description: element.description,
                value: this.$route.query.type_id === element.id || this.$route.query.type_id
                  ?.includes(element.id.toString()) || false,
                count: element.count,
                concatOperator: 'and',
                logicalOperator: 'equal',
                showSubtypes: false,
                root: element.root,
                subs: element.subs,
                type: 'type',
              };
            };

            item.values = allTypes.map(mapFunction);
          }
        });
      });
      await this.$store.commit(
        'app/setFilterElements',
        JSON.parse(JSON.stringify(this.filterElements)),
      );
      if (this.$route.name.startsWith('data-')) this.updateFiltersFromUrl(this.$route.query);
    },
    selectItem(item, value = undefined) {
      if (typeof item.value === 'string' || item.value instanceof String) item.value = '';

      else item.value = value || !item.value;

      this.filterElements[this.selectedClass].items
        .reduce((dict, element) => [...dict, ...element.values], []).find((x) => x.id === item.id)
        .value = item.value;
    },
    selectAll() {
      this.searchedTypes.forEach(x => this.selectItem(x, true));
    },
    search() {
      if (this.globalSearch && this.currentFilters?.length === 0) {
        this.filterElements[this.selectedClass].items.find(x => x.label === 'name').values[0].value = this.globalSearch
      }
      this.setCodes(['place', 'artifact']);
      this.setSearch(this.currentFilters);

      let name = 'data-list-q';
      if (this.$route.name.startsWith('data-')) name = this.$route.name;
      this.$router.push({
        name,
        query: this.getQuery,
      });
      this.open = false;
    },

    hasSetValue(item) {
      let returnValue = false;
      item.values.forEach((x) => {
        if (x.value) returnValue = true;
      });
      return returnValue;
    },
  },
};
</script>

<style>

.transition {
  width: auto;
  height: auto;
  transition: height 0.5s linear;
}

.filter-element {
  cursor: pointer;
  transition: 100ms all linear;
  padding: 5px;
}

.filter-element:hover {
  font-weight: bold;
}

.filter-element-clicked {
  font-weight: bold;
  background-color: lightgray;
}

.expand-icon-expanded {
  transform: rotate(180deg);
}

.filter-window {
  top: 50px !important;
  left: 0 !important;
  right: 0 !important;
  max-width: 850px !important;
  margin: auto;
}
</style>
