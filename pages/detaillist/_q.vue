<template>
  <div>
  <navigation-buttons></navigation-buttons>
  <otherlist :filter="query"></otherlist>
  </div>
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
    '$route.query':{
      handler(s){ this.query = s},
      immediate: true,
      deep: true
    }
  }
};
</script>

<style scoped>

</style>
