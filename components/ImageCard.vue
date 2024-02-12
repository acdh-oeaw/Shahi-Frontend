<template>
  <v-card
    height="100%"
    rounded="0"
    class="d-flex align-center"
    :class="{'borderBottom': $vuetify.breakpoint.xs}"
    elevation="0"
    :color="color || 'transparent'"

  >
    <div v-if="!!item.features[0].depictions && !!item.features[0].depictions.length !== 0" style="max-width: 100%">
      <nuxt-img
        style="max-width: 100%;"
        :src="item.features[0].depictions[0].url"
        alt="IMAGE"
      />
      <p class="text-caption my-0 font-weight-bold">{{ item.features[0].depictions[0].license }}</p>
      <p class="text-caption my-0">{{ description }}</p>
    </div>
    <p v-else class="text-body-1 ma-auto">
      No image available
    </p>
  </v-card>
</template>

<script>
export default {
  name: "ImageCard",
  async fetch(){
    if(!this.item.features[0].depictions?.[0]) return

    // if(this.item.features[0].depictions?.[0].description){
    //   this.description = this.item.features[0].depictions?.[0].description
    //   return
    // }

    // const p = await this.$api.Entities.get_api_entity__id__({
    //   id_: this.item.features[0].depictions?.[0]['@id'].split('/').at(-1),
    //   show: 'description'
    // });
    // this.description = p?.body?.features?.[0]?.descriptions?.[0]?.value
  
  },
  props: ['item', 'color'],
  computed: {
    description(){
      return this.item.features[0].depictions?.[0].description || ''
    }
  },
  mounted() {
  },
}
</script>

<style scoped>

</style>
