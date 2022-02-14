<template>
  <v-combobox
    :value="getFiltersFlat"
    single-line
    flat
    solo
    background-color="grey lighten-2"
    hide-details
    prepend-inner-icon="mdi-magnify"
    append-icon=""
    multiple
    :search-input.sync="globalSearch"
    @click="open = !open || !globalSearch"

    @keydown.enter.stop="searchKeydownEnter = !searchKeydownEnter"
    ref="searchField"
  >
    <template v-slot:append>
      <logical-operator-editor v-if="getFiltersFlat.length > 1" class="mr-4"/>
      <FilterWindow :search-keydown-enter="searchKeydownEnter" :global-search="globalSearch" :open-window="open"/>
    </template>
    <template v-slot:selection="{ attrs, item, parent, selected }">
      <v-chip
        v-if="item === Object(item)"
        class="text-capitalize grey lighten-3"
        label
        small
      >
        <span v-if="item.value !== true & item.value !== false" class="text-body-1">
          {{ item.value }}

        </span>
        <span v-else class="text-body-1">

          {{ item.en }}
        </span>
        <v-icon
          v-if="!item.codes"
          class="pl-2"
          small
          @click="removeItem(item.id)"
        >
          $delete
        </v-icon>
      </v-chip>
    </template>
  </v-combobox>
</template>

<script>
import FilterWindow from '@/components/FilterWindow';
import {mapActions, mapGetters} from 'vuex';

export default {
  components: {FilterWindow},
  data() {
    return {
      open: false,
      globalSearch: '',
      filterString: '',
      filterArray: [],
      searchKeydownEnter: false,
    };
  },
  computed: {
    ...mapGetters('app', [
      'getFilterObject',
      'getCurrentFilters',
    ]),
    ...mapGetters('query', [
      'getFiltersFlat',
      'getQuery',
    ]),
  },
  watch: {
    '$store.state.app.filters': {
      handler() {
        this.updateArray();
      },
      immediate: true,
      deep: true,
    },
    '$route.query': {
      handler() {
        this.globalSearch = '';
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    this.updateArray();
    window.addEventListener('keydown', this._keyListener);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this._keyListener);
  },
  methods: {
    ...mapActions({
      removeFilter: 'query/removeFilter',
    }),
    _keyListener(e) {


      if (this.open && this.globalSearch) {

        if (e.key === 'Enter')
          this.searchKeydownEnter = !this.searchKeydownEnter;
        this.$nextTick(() => this.$refs.searchField.focus());
      }
    },
    removeItem(id) {
      this.removeFilter(id);
      let name = 'data-list-q';
      if (this.$route.name.startsWith('data-')) name = this.$route.name;

      this.$router.push({
        name,
        query: this.getQuery,
      });
    },
    updateString(query) {
      if (!query) {
        this.filterString = '';
      } else {
        this.filterString = query;
      }
    },
    updateArray() {
      this.filterArray = this.getFiltersFlat;
    },

    updateFilter(selectedProperty, value) {
      this.$store.commit('app/updateFilterValue', {
        selectedProperty,
        value,
      });
      const {name} = this.$route;
      this.$router.push({
        name,
        query: this.getFilterObject,
      });
    },
  }
  ,

}
;
</script>

<style>
.v-select__slot .v-select__selections {

  height: 50px;
  overflow: auto;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
}

.v-select__slot ::-webkit-scrollbar {
  display: none; /* for Chrome, Safari, and Opera */
}
</style>
