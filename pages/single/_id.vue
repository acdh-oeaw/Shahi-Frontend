<template>
  <div>
    <div v-if="item">
      <single-page-layout :item="item.features[0]"></single-page-layout>
    </div>
  </div>
</template>

<script>
import { dtoToEntity, useGetType } from "@/composable/model";

export default {
  name: "_id.vue",
  async asyncData({ params, error, payload }) {
    if (payload && Object.keys(payload).length !== 0) return { item: payload };
    else {
      //this.loading = true;
      const p = await this.$api.Entities.get_api_0_3_entity__id__({
        id_: this.$route.params.id,
      });
      //this.loading = false;
      return { item: p.body };
    }
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    itemType() {
      return useGetType(this.item);
    },
  },
};
</script>
