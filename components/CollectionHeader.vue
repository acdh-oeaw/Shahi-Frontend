<template>
  <section v-if="collection">
    <div class="collection-header secondary darken-1">
      <div class="page-content">
        <div class="d-flex justify-space-around">
          <div class="collection-header-left d-flex align-center">
            <p class="title-1 mt-n15">
              {{ collection.en }}
            </p>
          </div>
          <div class="collection-header-right">
            <image-collage :items="items" />
          </div>
        </div>
      </div>
    </div>

    <div class="page-content">
      <p class="title-2">
        Description
      </p>
      <p style="white-space: pre-line" class="text-body-1">
        {{ collection.description }}
      </p>
      <p class="title-2">
        Artifacts
      </p>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CollectionHeader',
  props: ['items'],
  computed: {
    collection() {
      return this.getTypeById(this.$route.query.collection);
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
  width: 100vw;
  overflow: hidden;
}
.page-content{
}
.collection-header >>> .title-1{
  margin-top: 160px;
}
.collection-header-left{
  max-width: 500px;
}

.collection-header-right{
  width: calc(100% - 500px);
}

</style>
