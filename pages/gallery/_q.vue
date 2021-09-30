<template>
  <div>
    <navigation-buttons></navigation-buttons>
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
