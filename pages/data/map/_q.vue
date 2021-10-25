<template>
  <div>
    <maplist :items="items" :total-items="totalItems" />
  </div>
</template>

<script>
import maplist from '~/components/lists/maplist.vue';
import queries from '~/mixins/queries';

export default {
  components: {
    maplist,
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
