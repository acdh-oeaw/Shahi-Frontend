<template>
  <div>
    <gallery :filter="query" />

  </div>
</template>

<script>
import Gallery from '~/components/lists/galleryList.vue';
import queries from '~/mixins/queries';

export default {
  components: {
    Gallery
  },
  mixins: [queries],
  data() {
    return {
      query: {},
      view: 'gallery',
    };
  },
  watch: {
    '$route.params': {
      handler(s) { this.parseQuery(s.q); },
      immediate: true,
      deep: true,
    },
  },
  methods: {
  },
};
</script>
