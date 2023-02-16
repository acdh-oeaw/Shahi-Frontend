<template>
  <div>
    {{ items }}
    <collection-header v-if="$route.query.collection" :id="$route.query.collection" :items="items" />

    <div class="p-sticky" style="position:sticky;top:calc( 100vh - 36px);z-index: 9999" >
      <view-toggler :value="$route.path.split('/').at(-1)" @input="viewChange"  />
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
  async asyncData ({ params, error, payload }) {
    if (payload) return { items: payload }
    else return { items: {} }  
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
        if(this.$route.name === "data-map-q") return;
        //this.$fetch();
      },
      deep: true,
    },
  },
  mounted() {
    window.scrollTo({ top: 0 });
  },
  methods: {
    ...mapActions({
      searchByFilterId: 'query/searchByFilterId',
      setCodes: 'query/setCodes',
    }),
    viewChange(target){
      this.$router.push({
        name:`data-${target || 'list'}-q`,
        query: this.$route.query,
      });
    }
  },
  computed: {
    ...mapGetters('query', ['getQuery']),
    options: {
      get() {
        return {
          sortBy:  this.$route.query.sortBy || [],
          sort: this.$route.query.sort || [],
          page: this.$route.query.page || 1,
          itemsPerPage: this.$route.query.itemsPerPage || 10,
        };
      },
    },
    ...mapGetters('app', [
      'getSortColumnByPath',
    ]),
  },
};
</script>
