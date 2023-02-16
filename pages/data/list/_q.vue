<template>
  <div>
    <list
      :items="items"
      :total-items="totalItems"
      :not-found="notFound"
    />
  </div>
</template>

<script>
import list from '~/components/lists/list.vue';
import queries from '~/mixins/queries';

export default {
  components: {
    list,
  },
  mixins: [queries],
  props: ['items','totalItems','notFound'],
  data() {
    return {
      query: {},
      view: 'list',
    };
  },
  watch: {
    '$route.query': {
      handler(s) {
        this.query = s;
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {},
};
</script>
