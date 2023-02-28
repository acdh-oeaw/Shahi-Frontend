<template>
  <div>
    <div class="p-sticky" style="position:sticky;top:calc( 100vh - 36px);z-index: 9999" >
      <view-toggler :value="$route.path.split('/').at(-1)" @input="viewChange"  />
    </div>
    <div style="position:relative; top:-36px; min-height: calc(100vh - 110px)">
    <nuxt-child style="min-height: calc(100vh - 140px)" :items="items" :total-items="items.length" :not-found="false" />
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
      loading: true,
      view:'list',
    };
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
};
</script>
