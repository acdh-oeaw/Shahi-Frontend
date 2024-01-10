<template>
  <div>
    <section class="header secondary darken-1 mb-10">
      <div class="page-content  d-flex align-center">
        <p class="title-1">
          Collections
        </p>
      </div>
    </section>
    <section class="page-content">
      <CollectionBox v-for="item in collections" :key="item.id" :collection="item" />
    </section>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {

  async fetch(){
    const p = await this.$api.Nodes.get_api_type_tree_();
    const typeTree  = Object.values(p.body.typeTree);
    this.collections = typeTree.filter((x) => x?.root?.[0] === 1969);
  },
  data() {
    return {
      collections: [],
    };
  },
  async mounted() {
    //this.$fetch()
  },
  computed: {
    ...mapGetters('app', [
      'getCollections',
    ]),
  },

};
</script>

<style scoped>

.header {
  height: 200px;
}

.page-content {
  height: 100%;
}

.title-1 {
  padding-left: 20px;
}

</style>
