<template>
  <div>
    <collection-header :id="$route.params.q" :items="items"/>
      <view-toggler v-model="view"/>
    <list
      v-if="view==='list'"
      :items="items"
      :total-items="totalItems"
      :not-found="notFound"
    />
    <otherlist
      v-if="view==='detaillist'"
      :items="items"
      :total-items="totalItems"
      :not-found="notFound"
    />
    <div class="data_map"
         v-if="view==='map'">
      <dataMap :customQuery="customQuery" />
    </div>
    <gallery-list
      v-if="view==='gallery'"
      :items="items"
      :total-items="totalItems"
      :not-found="notFound"
    />
    <view-toggler v-model="view"/>



  </div>
</template>

<script>
import list from "~/components/lists/list";
import Otherlist from "@/components/lists/otherlist";
import GalleryList from "@/components/lists/galleryList";

export default {
  name: "q_.vue",
  components: {GalleryList, Otherlist, list},
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
        this.$fetch();
      },
      immediate: true,
      deep: true,
    },

  },
  computed: {
    customQuery(){
      return {
        view_classes:"artifact",
        search:`{"typeIDWithSubs":[{"operator":"equal","logicalOperator":"or","values":[${this.$route.params.q}]}]}`
      }
    },
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
.data_map{
  width:100%;
  height:calc(100vh - 110px);
  position:relative;
}
</style>

