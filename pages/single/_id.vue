<template>
  <div v-if="item">
    <single-artifact v-if="itemType === 'stationary' || itemType === 'portable'" :item="item"></single-artifact>
    <single-page-layout v-else :item="item"></single-page-layout>
  </div>
</template>

<script>


import {dtoToEntity, useGetType} from "@/composable/model";

export default {
  async fetch() {
    this.loading = true;
    // eslint-disable-next-line no-underscore-dangle
    const p = await this.$api.Entities.get_api_0_3_entity__id__({
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
