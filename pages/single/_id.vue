<template>
  <div>
  <div v-if="item">
    <single-page-layout  :item="item.features[0]"></single-page-layout>
  </div>
</div>
</template>

<script>


import {dtoToEntity, useGetType} from "@/composable/model";

export default {
  name: "_id.vue",
  async fetch() {
    this.loading = true;
    // eslint-disable-next-line no-underscore-dangle
    const p = await this.$api.Entities.get_api_0_3_entity__id__({
      id_: this.$route.params.id,
    });
    // eslint-disable-next-line prefer-destructuring
    this.item = p.body;

    // await this.fetchRelated();
    this.loading = false;
  },
  data() {
    return {
      item: undefined,
      loading: false,
    };
  },
  computed:{
    itemType(){
      return useGetType(this.item);
    }
  }
};
</script>
