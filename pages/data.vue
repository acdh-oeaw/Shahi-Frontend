<template>
  <div>
    <div class="elevation-1 d-flex align-center justify-space-between  nav secondary darken-2">
      <div>
        <div
          v-for="(item,index) in navBarItems"
          :key="index"
          class="text-caption d-inline-block navigation-item"
          @click="clicked(item)"
        >
          {{ item.text }}
        </div>
        <div
          class="text-caption d-inline-block navigation-item ml-15"

          @click="toFavs"
        >
          Favorites
        </div>
      </div>
      <div>
        <view-toggler class="float-right mr-3" />
      </div>
    </div>

    <collection-header v-if="$route.query.m == 'c'" :items="items" />

    <nuxt-child :items="items" :totalItems="totalItems" :not-found="notFound" />
  </div>
</template>

<script>
import favorites from '@/mixins/favorites';
import { mapGetters } from 'vuex';

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
      const p = await this.$api.Entities.get_api_0_2_query_({
        limit: itemsPerPage,
        first: this.itemIndex[page - 1] ? this.itemIndex[page - 1].startId : null,
        filter: this.query,
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
    };
  },
  mounted(){
    window.scrollTo({top:0})
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
  },
  methods: {
    clicked(item) {
      this.$router.push(
        {
          name: this.$route.name,
          query: item.target.query,
        },
      );
    },
    toFavs() {
      this.$router.push({
        name: this.$route.name,
        query: {
          entities: this.getFavorites(),
        },
      });
    },
  },
  computed: {
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

<style scoped>
.nav {
  position: sticky;
  top: 64px;
  z-index: 500;

}
.navigation-item{
  height: 100%;
  font-size: 14px !important;
  padding: 13px 3px;
  margin: 0 7px;
  cursor: pointer;
  transition: all  ease 100ms;
}
.navigation-item:hover{
  background-color: rgba(0,0,0,0.1);
}
</style>
