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
  async asyncData({ params, error, payload, query }) {
    console.log('asyncData')

    if (payload) {
      return { items: payload }
    }
    else return { items: {} }
  },
  computed: {
    filteredBaseItems: function () {
      const items = this.items;
      const query = this.$route.query;
      const view_classes = query?.view_classes;
      if (view_classes) {
        return items.filter(item => {
          for (const systemClass of view_classes) {
            if (item.features[0].systemClass === systemClass) return true;
            return false;
          }
        });
      }
      else return items;
    }
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
