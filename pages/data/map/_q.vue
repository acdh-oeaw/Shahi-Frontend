<template>
  <div class="data_map">
    <dataMap :items="filteredBaseItems" />
  </div>
</template>

<script>
import dataMap from '~/components/DataMap';
import queries from '~/mixins/queries';
import filterItemsMixin from '~/mixins/filterItemsMixin';

export default {
  components: {
    dataMap,
  },
  props:['items', 'totalItems'],
  mixins: [queries, filterItemsMixin],
  data() {
    return {
      query: {},
      view: 'list',
    };
  },
};
</script>
<style scoped>
.data_map{
  width:100%;
  height:calc(100vh - 146px);
  position:relative;
}
</style>
