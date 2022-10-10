<template>
  <section v-if="collection" >
    <div class="collection-header secondary darken-1" style="position: relative;">
      <image-collage :collection-id="id" :items="items" class="images" style="z-index: 0" />
      <v-container style="height: 100%">
      <v-sheet height="100%" color="transparent" max-width="max(50%,500px)" class="ma-0 page-content d-flex align-center">
            <p class="title-1" style="z-index: 1;">
              {{ collection.en }}
            </p>
      </v-sheet>
      </v-container>
    </div>

    <div class="page-content">
      <v-container>
      <p v-if="!!collection.description" class="title-2">
        Description
      </p>
      <p v-if="!!collection.description" style="white-space: pre-line" class="text-body-1">
        {{ collection.description }}
      </p>
      <p class="title-2">
        Artifacts
      </p>
      </v-container>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CollectionHeader',
  props: ['items','id'],
  computed: {
    collection() {
      return this.getTypeById(this.id);
    },
    ...mapGetters('app', [
      'getTypeById',
    ]),
  },
};
</script>

<style scoped>
.collection-header {
  height: 600px;
  overflow: hidden;
}
.page-content{
}

.collection-header-left{
  max-width: 500px;
}

.collection-header-right{
  position: absolute;
  width: calc(100% - 500px);
}

.images{
  position:absolute;
  right:0;
  top:50%;
  translate:0 -50%;
}

</style>
