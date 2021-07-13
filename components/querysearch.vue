<template>
  <v-text-field
    v-model="filterstring"
    solo-inverted
    flat
    hide-details
    prepend-inner-icon="mdi-magnify"
    @keydown.enter="updateQuery(filterstring)"
  >
    <template v-slot:append>
      <FilterWindow></FilterWindow>




    </template>
  </v-text-field>
</template>

<script>
import FilterWindow  from '@/components/FilterWindow';
export default {
  components:{FilterWindow},
  data() {
    return {
      filterstring: '',
    };
  },
  watch: {
    '$route.params': {
      handler(s) { this.updateString(s.q); },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    updateString(query) {
      if (!query) this.filterstring = '';
      else this.filterstring = query;
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
  },
};
</script>
