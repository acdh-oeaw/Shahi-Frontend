<template>
  <div>
    <collection-header :id="$route.params.q" :items="items"/>
    <list
      :items="items"
      :total-items="totalItems"
      :not-found="notFound"
    />
  </div>
</template>

<script>
import list from "~/components/lists/list";

export default {
  name: "q_.vue",
  components: {list},
  async fetch() {
    this.loading = true;
    const {
      sortBy, sortDesc, page, itemsPerPage,
    } = this.options;
    try {
      // eslint-disable-next-line no-underscore-dangle
      const p = await this.$api.Entities.get_api_0_3_type_entities__id__({
        id_: this.$route.params.q,

        limit: itemsPerPage,
        page: page,
        sort: sortDesc[0] ? 'desc' : 'asc',
      });
      // eslint-disable-next-line prefer-destructuring
      this.items = [];

      this.items = p.body.results;
      this.notFound = false;

      this.itemIndex = p.body.pagination.index;
      this.totalItems = p.body.pagination.entities;
    } catch (err) {
      console.log(err);
      this.notFound = true;
    }
    this.loading = false;
  },
  data() {
    return {
      view: 'list',
      loading: false,
      items: [],
      notFound: false,
      totalItems: 0,
      itemIndex: [],

    }
  },
  mounted() {
    this.$fetch();
  },
  watch: {
    '$route.query': {
      handler(s) {
        console.log(this.options)
        this.$fetch();
      },
      immediate: true,
      deep: true,
    },

  },
  computed: {
    options() {
      return {
        sortBy: [],
        sortDesc: [],
        page: this.$route.query.page || 1,
        itemsPerPage: this.$route.query.itemsperpage || 10,
      }

    }
  }

}
</script>

<style scoped>

</style>
