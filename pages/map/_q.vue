<template>
  <div>
de    <maplist :filter="query" />
  </div>
</template>

<script>
import maplist from '~/components/lists/maplist.vue';
import queries from '~/mixins/queries';

export default {
  components: {
    maplist,
  },
  mixins: [queries],
  data() {
    return {
      query: {},
      view: 'list',
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
