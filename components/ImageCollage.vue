<template>
  <v-slide-x-reverse-transition>
  <div v-if="!loading" class="text-right image-collage" style="width: 800px">
    <div class="image-overlay"></div>
    <img height="180" class="pa-0 img d-inline-block" v-for="image in items" :src="`${image}?image_size=thumbnail`.replace('http://','https://')"/>

  </div>
  </v-slide-x-reverse-transition>
</template>

<script>
export default {
  name: 'ImageCollage',
  props: ['collectionId'],
  async fetch() {
    this.loading = true;
    try {
      // eslint-disable-next-line no-underscore-dangle
      const p = await this.$api.Entities.get_api_0_3_type_entities__id__({
        id_: this.collectionId,
        limit: 0,
        show: 'depictions'
      });
      // eslint-disable-next-line prefer-destructuring
      this.items = [];
      this.items = p.body.results.map(x => x.features[0]?.depictions?.[0]?.url).filter(Boolean).slice(0, 17);
      this.totalItems = p.body.pagination.entities;
    } catch (err) {
      console.log(err);
    }

    await new Promise(resolve => setTimeout(resolve, 1000))
    this.loading = false;
  },
  data() {
    return {
      items: [],
      totalItems: 0,
      loading:true,
    };
  },

};
</script>

<style scoped>
img {
  scale: 0.95;
  transition: all ease-in-out 100ms;
}

img:hover {
  scale: 1
}

.image-overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 5;
  background: rgb(156, 164, 124);
  background: linear-gradient(90deg, rgba(156, 164, 124, 1) 0%, rgba(0, 212, 255, 0) 100%);
}
</style>
