<template>
  <div v-if="item">
    <single-artifact  :item="item"></single-artifact>
  </div>
</template>

<script>


import {dtoToEntity, useGetType} from "@/composable/model";

export default {
  async fetch() {
    this.loading = true;
    // eslint-disable-next-line no-underscore-dangle
    const p = await this.$api.Entities.get_api_entity__id__({
      id_: this.$route.params.id,
    });
    // eslint-disable-next-line prefer-destructuring
    this.item = dtoToEntity(p.body);

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

<style>

</style>
