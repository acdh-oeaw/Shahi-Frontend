<template>
      <div class="collection-header secondary darken-1">
        <div class="page-content">
          <div class="d-flex justify-space-around">
            <div class="collection-header-left">
              <p class="title-1">{{collection.en}}</p>
              <p>{{ collection.description }}</p>
            </div>
            <div class="collection-header-right">
              <image-collage :items="items"></image-collage>
            </div>index
          </div>
        </div>
      </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: 'CollectionHeader',
  props:['items'],
  computed:{
    collection(){
      return this.getTypeById(this.$route.query.type_id)
    },
    ...mapGetters('app',[
      'getTypeById'
    ])
  }
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
  max-width: 400px;
}

.collection-header-right{
  width: calc(100% - 500px);
}

</style>

