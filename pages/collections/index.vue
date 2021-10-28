<template>
    <div>
        <section class="header secondary darken-1 mb-10">
            <div class="page-content  d-flex align-center">
            <p class="title-1">Collections</p>
       </div>
        </section>
        <section class="page-content">
            <div class="collection-container secondary" v-for="item in getCollections.values" :key="item.id">
                <div class="collection-content"><p class="title-2">{{item.en}}</p>
                <p class="text-body-1">{{item.description}}</p>
                <div
                @click="$router.push(`data/list?codes=artifact&type_id=${item.id}&m=c`)"
                ><p
                class="primary--text go-to-map-button"
                text
            
              >
                Explore Collection
                <v-icon class="ml-n1">
                  mdi-chevron-right
                </v-icon>
              </p></div>
              </div>
                <div class="collection-image primary"></div>
            </div>
        </section>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {

    computed:{
    ...mapGetters('app', [
      'getCollections',
    ]),}
    
}
</script>

<style scoped>
.collection-container{

    display: flex;
    margin-bottom: 40px;
    justify-content: space-between;
align-items: center;
}

.collection-image{
    height: 500px;
    width: 500px;
}

.collection-content{
    margin: 20px;
    margin-top: -10%;
    max-width: 500px;
    
}
.header {
  height: 600px;
}
.page-content{
    height: 100%;
}
.title-1{
    padding-left:20px;
    margin-top: -10%;
}
</style>
