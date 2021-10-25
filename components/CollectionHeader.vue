<template>
      <div class="collection-header secondary darken-1">
        <div class="page-content">
          <div class="d-flex justify-space-around">
            <div class="collection-header-left">
              <p class="title-1">Collection of Clay Items</p>
              <p>This collection contains Artifacts wich are completele made out of clay.</p>
            </div>
            <div class="collection-header-right">
              <image-collage :items="items"></image-collage>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  name: 'CollectionHeader',
  props:['items'],

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

