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
                  </v-card-title>
                  <v-card-text class="pb-10">
                    <v-row not gutters>
                      <v-col
                        v-for="(item, index) in filterElements[selectedClass]
                          .items[selected].values"
                        v-if="
                          filterElements[selectedClass].items[selected].type ==
                          'multiple'
                        "
                        :key="item.id"
                      >
                        <v-btn
                          :outlined="!item.value"
                          color="grey"
                          @click="item.value = !item.value"
                        >
                          {{ item.en }}
                          <v-icon v-if="item.value" class="pl-2" small>
                            $delete
                          </v-icon>
                        </v-btn>
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
    };
  },
  watch: {
    selectedClass() {
      this.selected = 0;
    },
    computed: {},
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
          const types = typeTree.filter(
            (x) => x[Object.keys(x)[0]].root[0] == item.id
          );
          item.values = types.map((x) => {
            const element = x[Object.keys(x)[0]]
            let type = {
              en: element.name,
              id: element.id,
              value: false,
              count: element.count,
              concatOperator: "and",
              logicalOperator: "eq",
            };

            return type;
          });
        }
      });
    });
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

    search() {
      this.filterElements.forEach((item) => (item.selected = false));
      this.filterElements[this.selectedClass].selected = true;

      this.$store.commit(
        "app/setFilterElements",
        JSON.parse(JSON.stringify(this.filterElements))
      );

      this.open = false;
      const name = "list-q";
      let filterString = "";
      if (this.getFilterList.length != 0)
        filterString = `, "filter":["${this.getFilterList.join('","')}"]`;

      this.$router.push({
        name,
        params: {
          q: `{"codes": "${this.getSystemClassForFilter}" ${filterString}}`,
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
    ...mapGetters("app", ["getFilterList", "getSystemClassForFilter"]),
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
</style>
