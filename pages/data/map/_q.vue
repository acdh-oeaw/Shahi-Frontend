<template>
  <div class="data_map">
    <dataMap />
  </div>
</template>

<script>
import dataMap from '~/components/DataMap';
import queries from '~/mixins/queries';

export default {
  components: {
    dataMap,
  },
  props:['items', 'totalItems'],
  mixins: [queries],
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
