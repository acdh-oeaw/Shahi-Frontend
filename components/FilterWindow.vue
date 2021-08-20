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
      <v-icon v-bind="attrs" v-on="on"> mdi-tune </v-icon>
    </template>
    <div class="all">
      <div class="tik" />

      <v-card
        elevation="4"
        class="content"
        max-height="800px"
        @keydown.enter="search"
      >
        <v-card-text>
          <v-btn
            v-for="(systemClass, index) in filterElements"
            :key="index"
            :color="index === selectedClass ? 'grey' : ''"
            elevation="0"
            @click="selectedClass = index"
          >
            {{ systemClass.en }}
          </v-btn>
        </v-card-text>
        <v-card-text>
          <v-row no-gutters>
            <v-col cols="auto" style="min-width: 200px">
              <v-list max-width="200px" class="grey lighten-4">
                <v-list-item-group v-model="selected">
                  <v-expand-transition
                    v-for="(item, index) in filterElements[selectedClass].items"
                    :key="item.systemClass"
                    appear
                  >
                    <div>
                      <v-list-item
                        :value="index"
                        :class="hasSetValue(item) ? 'font-weight-bold' : ''"
                      >
                        {{ item.en }}
                      </v-list-item>
                    </div>
                  </v-expand-transition>
                </v-list-item-group>
              </v-list>
            </v-col>
            <v-expand-x-transition>
              <v-col v-if="selected != undefined" style="width: 500px">
                <v-card v-if="selectedClass != undefined" flat>
                  <v-card-title>
                    {{ filterElements[selectedClass].items[selected].en }}
                    <v-tooltip
                      v-if="
                        !!filterElements[selectedClass].items[selected]
                          .description
                      "
                      right
                      max-width="400px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          class="ml-1"
                          color="primary"
                          v-bind="attrs"
                          v-on="on"
                          >mdi-help-circle-outline</v-icon
                        >
                      </template>
                      {{
                        filterElements[selectedClass].items[selected]
                          .description
                      }}
                    </v-tooltip>
                  </v-card-title>
                  <v-card-subtitle
                    v-if="
                      filterElements[selectedClass].items[selected].type ==
                      'multiple'
                    "
                  >
                    <v-text-field
                      label="Suche"
                      v-model="searchKeyword"
                    ></v-text-field>
                  </v-card-subtitle>

                  <v-card-text
                    class="pb-10 hidden"
                    style="overflow: auto; max-height: 370px"
                  >
                    <v-row not gutters>
                      <v-col
                        cols="12"
                        sm="6"
                        v-for="(item, index) in searchedTypes"
                        v-if="
                          filterElements[selectedClass].items[selected].type ==
                          'multiple'
                        "
                        :key="item.id"
                      >
                        <div
                          class="filter-element"
                          :class="item.value ? 'filter-element-clicked' : ''"
                          @click="selectItem(item)"
                        >
                          <span>{{ item.en }}</span>

                          <v-icon
                            small
                            @click.stop="item.showSubtypes = !item.showSubtypes"
                            v-if="!!item.child"
                            class="expand-icon"
                            style="float: right"
                            :class="
                              item.showSubtypes ? 'expand-icon-expanded' : ''
                            "
                            >mdi-chevron-down</v-icon
                          >
                          <v-icon style="float: right" v-if="item.value" small
                            >mdi-close</v-icon
                          >
                        </div>

                        <v-expand-transition>
                          <div v-if="item.showSubtypes">
                            <div
                              v-for="(subtype, index) in item.child"
                              :key="index"
                              @click="subtype.value = !subtype.value"
                              class="filter-element ml-2"
                              :class="
                                subtype.value ? 'filter-element-clicked' : ''
                              "
                            >
                              <span>{{ subtype.en }}</span>

                              <v-icon
                                style="float: right"
                                v-if="subtype.value"
                                small
                                >mdi-close</v-icon
                              >
                            </div>
                          </div>
                        </v-expand-transition>
                      </v-col>

                      <v-col
                        v-for="item in filterElements[selectedClass].items[
                          selected
                        ].values"
                        v-if="
                          filterElements[selectedClass].items[selected].type ==
                          'text'
                        "
                        :key="item.id"
                        cols="12"
                      >
                        <v-text-field v-model="item.value" :label="item.en" />
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-expand-x-transition>
          </v-row>
        </v-card-text>
        <v-btn absolute right bottom color="grey" @click="search">
          <v-icon>mdi-magnify</v-icon>
          Search
        </v-btn>
      </v-card>
    </div>
  </v-menu>
</template>

<script>
import filterelements from "assets/filterElements.json";
import { mapGetters } from "vuex";

export default {
  name: "FilterWindow",
  data() {
    return {
      color: "lightgrey",
      open: false,

      selected: 0,
      selectedClass: 0,
      filterElements: [{}],
      query: {},
      searchKeyword: "",
      searchedTypes: [],
    };
  },
  watch: {
    selectedClass() {
      this.selected = 0;
      this.searchKeyword = "";
    },
    selected() {
      this.searchKeyword = "";
    },
    "$store.state.app.filterelements": {
      handler() {
        this.filterElements = JSON.parse(
          JSON.stringify(this.$store.state.app.filterelements)
        );
      },
      immediate: true,
      deep: true,
    },
    propertySelectedClassAndSelectedAndSearchKeyword() {
      console.log("geändert");
      if (!this.searchKeyword)
        this.searchedTypes =
          this.filterElements[this.selectedClass].items[this.selected].values;
      else
        this.searchedTypes = this.filterElements[this.selectedClass].items[
          this.selected
        ].values.reduce((result, element) => {
          const e = { ...element };

          if (
            element.en.toLowerCase().includes(this.searchKeyword.toLowerCase())
          )
            result.push(e);
          else {
            e.child = element.child?.filter((x) =>
              x.en.toLowerCase().includes(this.searchKeyword.toLowerCase())
            );
            if (e.child?.length) result.push(e);
          }

          return result;
        }, []);
    },
  },
  async beforeMount() {
    this.filterElements = JSON.parse(
      JSON.stringify(this.$store.state.app.filterelements)
    );

    const p = await this.$api.Nodes.get_api_0_2_type_tree_();
    const typeTree = p.body.typeTree;
    this.filterElements.forEach((element) => {
      element.items.forEach((item) => {
        if (item.id) {
          console.log(item.id);
          const types = typeTree
            .filter((x) => x[Object.keys(x)[0]].root[0] == item.id)
            .reduce((dict, element) => {
              dict[Object.keys(element)[0]] = element[Object.keys(element)[0]];
              return dict;
            }, {});

          const typesWithAllSubtypes = typeTree.reduce((dict, element) => {
            const el = element[Object.keys(element)[0]];
            if (dict.hasOwnProperty(el.root[0]))
              dict[el.root[0]].child = [...(dict[el.root[0]].child || []), el];
            return dict;
          }, types);
          console.log("jetzte");
          console.log(Object.values(typesWithAllSubtypes));

          const mapFunctionSubs = (element) => {
            let type = {
              en: element.name,
              id: element.id,
              value: false,
              count: element.count,
              concatOperator: "and",
              logicalOperator: "eq",
            };

            return type;
          };

          const mapFunction = (element) => {
            let type = {
              en: element.name,
              id: element.id,
              value: false,
              count: element.count,
              concatOperator: "and",
              logicalOperator: "eq",
              child: element.child?.map(mapFunctionSubs),
              showSubtypes: false,
            };

            return type;
          };

          item.values = Object.values(typesWithAllSubtypes).map(mapFunction);
          console.log("lol");
          console.log(item.values);
        }
      });
    });

    this.$store.commit("app/setFilterElements", this.filterElements);
  },
  methods: {
    chunk(arr, size) {
      return arr.reduce(
        (acc, e, i) => (
          i % size ? acc[acc.length - 1].push(e) : acc.push([e]), acc
        ),
        []
      );
    },
      selectItem(item){
        item.value = ! item.value

        this.filterElements[this.selectedClass].items[this.selected].values.every((type) => {
          if(type.id === item.id){
            type.value = item.value;
            return false;
          }
          const stayInLoop = true
          type.child?.every((subtype)=>{
            if(subtype.id === item.id){
            subtype.value = item.value;
            stayInLoop = false;
            return false;
          }
          })

          return stayInLoop;
        })
        


      },

    search() {
      this.filterElements.forEach((item) => (item.selected = false));
      this.filterElements[this.selectedClass].selected = true;

      this.$store.commit(
        "app/setFilterElements",
        JSON.parse(JSON.stringify(this.filterElements))
      );

      this.open = false;
      const name = "detaillist-q";

      this.$router.push({
        name,
        params: {
          q: `{"codes": "${this.getSystemClassForFilter}" ${this.getFilterQuery}}`,
        },
      });
    },
    updateFilter(selectedClass, selectedProperty, value) {
      this.$store.commit("app/updateFilterValue", {
        selectedClass,
        selectedProperty,
        value,
      });
    },
    hasSetValue(item) {
      let returnValue = false;
      item.values.forEach((x) => {
        if (x.value) returnValue = true;
      });
      return returnValue;
    },
  },
  computed: {
    ...mapGetters("app", ["getFilterQuery", "getSystemClassForFilter"]),
    propertySelectedClassAndSelectedAndSearchKeyword() {
      return `${this.selectedClass}|${this.selected}|${this.searchKeyword}`;
    },
  },
};
</script>

<style>
.all {
  padding-top: 5px;
  position: relative;
}

.tik {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 15px;
  height: 15px;
  transform: rotateY(0deg) rotate(45deg);

  box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.1);
  clip-path: polygon(-50% 150%, 150% -50%, -50% -50%);
  z-index: 4;
}

.content {
  position: relative;
  margin-top: 6px;
  box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.4);
  z-index: -0;
}

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
