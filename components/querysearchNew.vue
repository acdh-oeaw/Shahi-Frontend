<template>

  <v-combobox
    v-model="filterArray"

    solo-inverted
    flat
    hide-details
    prepend-inner-icon="mdi-magnify"
    append-icon=""
    multiple
    :search-input.sync="globalSearch"
    @click="open = !open"
  >
    <template v-slot:append>
      <FilterWindow :global-search="globalSearch" :open-window="open"/>
    </template>
    <template v-slot:selection="{ attrs, item, parent, selected }">

      <v-chip
        v-if="item === Object(item)"
        class="text-capitalize"
        label
        small

      >

        <span class="text-body-1" v-if="item.value !== true & item.value !== false">
            {{item.value}}
        </span>

        <span class="text-body-1" v-else>
            {{item.en}}
        </span>
        <v-icon
          v-if="!item.codes"
          class="pl-2"
          small
          @click="updateFilter(item.group,{[item.id]: null})"
        >
          $delete
        </v-icon>
      </v-chip>
    </template>


  </v-combobox>
</template>

<script>
import FilterWindow from '@/components/FilterWindow';
import {mapGetters} from "vuex";
export default {
  components: { FilterWindow },
  data() {
    return {
      open: false,
      globalSearch: '',
      filterstring: '',
      filterArray: [],
    };
  },
  mounted(){
    this.updateArray();
  },
  watch: {
    '$store.state.app.filterelements': {
      handler() {
        console.log("wurde geändert")
        this.updateArray();
      },
      immediate: true,
      deep: true,
    },
    '$route.query':{
      handler(){
        this.globalSearch = '';
      },
      immediate:true,
      deep:true,
    },
  },
  methods: {
    updateString(query) {
      if (!query) {
        this.filterstring = '';
      } else {
        this.filterstring = query;
      }
    },
    updateArray() {
      this.filterArray = this.getCurrentFilters?.items.map((x, index) => {
        const filters = x.values.map((v) => {
          v.group = index;
          return v;
        });
        return filters;
      })
        .flat()
        .filter((x) => x.value);

      console
        .log(this.filterArray);
    },

    updateFilter(selectedProperty, value) {

      console.log(selectedProperty)
      console.log(value)
      this.$store.commit('app/updateFilterValue', {
        selectedProperty,
        value
      });
      const name = this.$route.name


      this.$router.push({
        name,
        query: this.getFilterObject,

      });
    },
  },
    computed: {
    ...mapGetters('app', [
      'getFilterObject',
      'getCurrentFilters'
    ]),
  },

};
</script>
