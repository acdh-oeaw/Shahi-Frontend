<template>
  <v-menu
    v-model="open"
    :close-on-content-click="false"
    offset-y
    bottom
    left
    content-class="elevation-0 rounded-0 pa-5 pt-2"
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
      <v-card-text>
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
      <!--Normal Search-->
      <v-card-text v-if="!globalSearch">
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
                      <v-text-field @keydown.enter="search" v-model="item.value" :label="item.en"/>
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
      <v-card-text
        v-else
        class="pa-5 hidden"
        style="overflow: auto; max-height: 370px; width: 732px"
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
              <span>{{ item.en }} </span>

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
      <v-btn absolute right bottom color="grey" @click="search">
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
  props: {globalSearch: {default: '', type: String}, openWindow: {type: Boolean}},
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
    };
  },
  computed: {
    ...mapGetters('app', ['getFilterObject', 'getSystemClassForFilter']),
    ...mapGetters('query', ['getQuery']),
    propertySelectedClassAndSelectedAndSearchKeyword() {
      return `${this.selectedClass}|${this.selected}|${this.searchKeyword}|${this.reloadItems}`;
    },
    ...mapGetters('query', ['getCurrentSystemClass', 'getFiltersFlat']),
  },
  watch: {
    openWindow() {
      this.open = !this.open;
    },
    globalSearch() {
      if (this.globalSearch) {
        this.open = true;
        this.searchedTypes = this.filterElements[this.selectedClass].items
          .reduce((dict, item) => [...dict, ...item.values], [])
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
        this.filterElements
          .find((x) => x.systemClass === this.getCurrentSystemClass)?.items.forEach((item) => {
          item.values.forEach((value) => {
            const match = this.getFiltersFlat.find((setFilter) => setFilter.id === value.id);
            if (match) value.value = match.value;
            else value.value = value.type == "type" ? false : '';
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
      setCodes: 'query/setCodes'
    }),
    async loadAllTypesFromBackend() {


      const p = await this.$api.Nodes.get_api_0_2_type_tree_();
      const {typeTree} = p.body;
      this.filterElements.forEach((filterElement) => {
        filterElement.items.forEach((item) => {
          if (item.id) {
            const allTypes = typeTree.filter((x) => x[Object.keys(x)[0]].root
              .includes(parseInt(item.id, 10)));

            const mapFunction = (x) => {
              const element = x[Object.keys(x)[0]];
              return {
                en: element.name,
                id: element.id,
                description: element.description,
                value: this.$route.query.type_id === element.id || this.$route.query.type_id
                  ?.includes(element.id.toString()) || false,
                count: element.count,
                concatOperator: 'and',
                logicalOperator: 'eq',
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
      if(this.$route.name.startsWith('data-'))
        this.updateFiltersFromUrl(this.$route.query);
    },
    selectItem(item) {
      item.value = !item.value;

      this.filterElements[this.selectedClass].items
        .reduce((dict, element) => [...dict, ...element.values], []).find((x) => x.id === item.id)
        .value = item.value;
    },
    search() {
      const filters = this.filterElements[this.selectedClass].items
        .flatMap((x) => x.values)
        .filter((x) => x.value)
        .map((x) => ({
          id: x.id, en: x.en, value: x.value, type: x.type,
        }));
      this.setCodes(this.filterElements[this.selectedClass].systemClass)
      this.setSearch(filters);

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
</style>
