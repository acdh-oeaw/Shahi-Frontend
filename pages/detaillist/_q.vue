<template>
  <otherlist :filter="query"></otherlist>
</template>

<script>
import otherlist from '@/components/lists/otherlist';
import queries from '@/mixins/queries';

export default {
  components: { otherlist },
  mixins: [queries],
  data() {
    return {
      query: {},
      view: 'list'
    };
  },
  watch:{
    '$route.params':{
      handler(s){ this.parseQuery(s.q)},
      immediate: true,
      deep: true
    }
  }
};
</script>

<style scoped>

</style>
