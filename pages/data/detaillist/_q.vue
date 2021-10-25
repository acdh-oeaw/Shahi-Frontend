<template>
  <div>
  <otherlist :filter="query" :items="items" :total-items="totalItems" :not-found="notFound"></otherlist>
  </div>
</template>

<script>
import otherlist from '@/components/lists/otherlist';
import queries from '@/mixins/queries';

export default {
  components: { otherlist },
  mixins: [queries],
  props:['items','totalItems','notFound'],
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
