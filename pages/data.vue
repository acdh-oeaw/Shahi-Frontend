<template>
  <div>
    <collection-header v-if="$route.query.collection" :id="$route.query.collection" :items="items" />

    <div class="p-sticky" style="position:sticky;top:calc( 100vh - 36px);z-index: 9999" >
      <view-toggler v-model="view"/>
    </div>
    <div style="position:relative; top:-36px; min-height: calc(100vh - 110px)">
    <nuxt-child style="min-height: calc(100vh - 140px)" :items="items" :total-items="totalItems" :not-found="notFound" />
    </div>
  </div>
</template>

<script>
import favorites from '@/mixins/favorites';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'DataVue',
  mixins: [favorites],
  async fetch() {
    this.loading = true;
    const {
      sortBy, sortDesc, page, itemsPerPage,
    } = this.options;
    try {
      // eslint-disable-next-line no-underscore-dangle
      const p = await this.$api.Entities.get_api_0_3_query_({
        limit: itemsPerPage,
        first: this.itemIndex[page - 1] ? this.itemIndex[page - 1].startId : null,
        view_classes: this.query?.view_classes,
        search: this.query?.search,
        entities:this.query?.entities,
        column: sortBy ? this.getSortColumnByPath(sortBy[0]) : null,
        sort: sortDesc[0] ? 'desc' : 'asc',
      });
      // eslint-disable-next-line prefer-destructuring
      this.items = [];

      this.items = p.body.results;
      this.notFound = false;

      this.itemIndex = p.body.pagination.index;
      this.totalItems = p.body.pagination.entities;
    } catch (err) {
      console.log(err);
      this.notFound = true;
    }
    this.loading = false;
  },
  data() {
    return {
      navBarItems: this.$store.state.app.menuitems,
      items: [],
      loading: true,
      notFound: false,
      totalItems: 0,
      itemIndex: [],
      query: {},
      view:'list',
    };
  },
  watch: {
    '$route.query': {
      handler(s) {
        if (this.options.page === 1) this.itemIndex = [];
        this.query = s;
      },
      immediate: true,
      deep: true,
    },
    options: {
      handler(o, n) {

        // if (o.sortBy !== n.sortBy || o.sortDesc !== n.sortDesc) this.itemIndex = [];
        // this.$fetch();
      },
      deep: true,
    },
    query: {
      handler() {
        // this.itemIndex = [];
        // this.options.page = 1;
        this.$fetch();
      },
      deep: true,
    },
    view(){
      this.$router.push({
        name:`data-${this.view || 'list'}-q`,
        query: this.$route.query,
      });
    }
  },
  mounted() {
    window.scrollTo({ top: 0 });
  },
  methods: {
    ...mapActions({
      searchByFilterId: 'query/searchByFilterId',
      setCodes: 'query/setCodes',
    }),


  },
  computed: {
    ...mapGetters('query', ['getQuery']),
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
      'getSortColumnByPath',
    ]),
  },
};
</script>
