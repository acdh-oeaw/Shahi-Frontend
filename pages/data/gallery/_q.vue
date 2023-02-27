<template>
  <div>
    <gallery :filter="query" :total-items="totalItems" :not-found="notFound" :items="items" class="pb-4"/>
  </div>
</template>

<script>
import Gallery from '~/components/lists/galleryList.vue';
import queries from '~/mixins/queries';

export default {
  async asyncData ({ params, error, payload }) {
    //if (payload) return { items: payload }
    //else return { items: {} }  
  },
  components: {
    Gallery
  },
  props:['items','totalItems','notFound'],
  mixins: [queries],
  data() {
    return {
      query: {},
      view: 'gallery',
    };
  },
  watch: {
    '$route.query': {
      handler(s) { this.query = s },
      immediate: true,
      deep: true,
    },
  },
  methods: {
  },
};
</script>
