<template>

  <v-combobox
    v-model="filterArray"

    solo-inverted
    flat
    hide-details
    prepend-inner-icon="mdi-magnify"
    append-icon=""
    multiple
    @keydown.enter="updateQuery(filterstring)"
    @change="updateFilterstring"

  >
    <template v-slot:append>
      <FilterWindow/>
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
          @click="updateFilter(0,item.group,{[item.id]: null})"
        >
          $delete
        </v-icon>
      </v-chip>
    </template>


  </v-combobox>
</template>

<script>
import FilterWindow from '@/components/FilterWindow';

export default {
  components: { FilterWindow },
  data() {
    return {
      filterstring: '',
      filterArray: [],
    };
  },
  watch: {
    '$route.params': {
      handler(s) {
        this.updateString(s.q);
      },
      immediate: true,
      deep: true,
    },
    '$store.state.app.filterelements': {
      handler() {
        this.updateArray();
      },
      immediate: true,
      deep: true,
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
      this.filterArray = this.$store.state.app.filterelements[0].items.map((x,index) => {
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
    updateQuery(a) {
      let name = 'list-q';
      if (this.$route.name === 'list-q' || this.$route.name === 'map-q') name = this.$route.name;
      this.$router.push({
        name,
        params: {
          q: a,
        },
      });
    },
    updateFilter(selectedClass, selectedProperty, value) {
      this.$store.commit('app/updateFilterValue', {
        selectedClass,
        selectedProperty,
        value
      });
    },
    updateFilterstring() {
      const newFilterString = this.filterArray.map((e) => `"${Object.entries(e)[0][0]}" : "${Object.entries(e)[0][1]}"`)
        .join();
      this.filterstring = `{ ${newFilterString}}`;
      this.updateQuery(this.filterstring);
    },
  },

};
</script>
