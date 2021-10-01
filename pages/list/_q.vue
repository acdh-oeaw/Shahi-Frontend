<template>
  <div>
    <list :filter="query" />

  </div>
</template>

<script>
import list from '~/components/lists/list.vue';
import queries from '~/mixins/queries';

export default {
  components: {
    list
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
