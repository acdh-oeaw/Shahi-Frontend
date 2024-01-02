<template>
  <div>
    <collection-header :id="$route.params.q" :items="items"/>
      <view-toggler v-model="view"/>
    <list
      v-if="view==='list'"
      :items="items"
      :total-items="totalItems"
      :not-found="notFound"
    />
    <otherlist
      v-if="view==='detaillist'"
      :items="items"
      :total-items="totalItems"
      :not-found="notFound"
    />
    <div class="data_map"
         v-if="view==='map'">
      <dataMap :customQuery="customQuery" />
    </div>
    <gallery-list
      v-if="view==='gallery'"
      :items="items"
      :total-items="totalItems"
      :not-found="notFound"
    />
    <view-toggler v-model="view"/>



  </div>
</template>

<script>
import list from "~/components/lists/list";
import Otherlist from "@/components/lists/otherlist";
import GalleryList from "@/components/lists/galleryList";

export default {
  name: "q_.vue",
  components: {GalleryList, Otherlist, list},
  // async asyncData({ $api, route }) {
  //   const items = await $api.Entities.get_api_0_3_type_entities__id__({
  //     id_: route.params.q,
  //     limit: 0,
  //   });

  //   const sortedItems = items.body.results.sort((a, b) => {
  //     const aTitle = a.features[0]?.properties?.title;
  //     const bTitle = b.features[0]?.properties?.title;

  //     if(aTitle === undefined) return -1;
  //     if(bTitle === undefined) return 1;

  //     if (sortDesc[0]) {
  //       return aTitle < bTitle ? 1 : -1;
  //     } else {
  //       return aTitle > bTitle ? 1 : -1;
  //     }
  //   });

  //   // Fetch descriptions for all items
  //   const descriptions = await Promise.all(
  //     sortedItems.map(item =>
  //       $api.Entities.get_api_0_3_entity__id__({
  //         id_: item.features[0].depictions?.[0]['@id'].split('/').at(-1),
  //         show: 'description'
  //       })
  //     )
  //   );

  //   // Map descriptions to items
  //   sortedItems.forEach((item, index) => {
  //     if(item?.body?.features?.[0]?.descriptions?.[0]?.value) {
  //       item.description = item?.body?.features?.[0]?.descriptions?.[0]?.value;
  //     }
  //   });

  //   return {
  //     items: sortedItems,
  //     itemIndex: items.body.pagination.index,
  //     totalItems: sortedItems.length,
  //     notFound: false
  //   };
  // },
  async fetch() {
    this.loading = true;
    const {
      sortBy, sortDesc, page, itemsPerPage,
    } = this.options;
    try {
      // eslint-disable-next-line no-underscore-dangle
      const p = await this.$api.Entities.get_api_0_3_type_entities__id__({
        id_: this.$route.params.q,
        limit: 0,
      });

      this.items = p.body.results;

      this.items.sort((a, b) => {
        const aTitle = a.features[0]?.properties?.title;
        const bTitle = b.features[0]?.properties?.title;

        if(aTitle === undefined) return -1;
        if(bTitle === undefined) return 1;

        if (sortDesc[0]) {
          return aTitle < bTitle ? 1 : -1;
        } else {
          return aTitle > bTitle ? 1 : -1;
        }
      });


      const descriptions = await Promise.all(
        this.items.map(async item => {
            const depictionID = item.features[0].depictions?.[0]['@id'].split('/').at(-1);
            if(!depictionID) return null;
            try {
              
              const description = await this.$api.Entities.get_api_0_3_entity__id__({
                id_: depictionID,
                show: 'description'
              });
              return description;
            } catch (error) {
              if (error.response && error.response.status === 502) {
                console.log(`Bad Gateway error for id: ${depictionID}`);
              } else {
                console.log(`Error for id: ${depictionID}`)
                console.log(error);
              }
              return null;
            }
        })
      );

      if(descriptions.length !== this.items.length) {
        console.log('descriptions length', descriptions.length);
        console.log('items length', this.items.length);
        throw new Error('descriptions length !== items length');
      }

      // Map descriptions to items
      descriptions.forEach((item, index) => {
        if(item?.body?.features?.[0]?.descriptions?.[0]?.value) {
          this.items[index].features[0].depictions[0].description = item?.body?.features?.[0]?.descriptions?.[0]?.value;
        }
      });

      this.notFound = false;

      this.itemIndex = p.body.pagination.index;
      this.totalItems = this.items.length;
    } catch (err) {
      console.log(err);
      this.notFound = true;
    }
    this.loading = false;
  },
  data() {
    return {
      view: 'list',
      loading: false,
      items: [],
      notFound: false,
      totalItems: 0,
      itemIndex: [],
      typeTree: undefined,

    }
  },
  mounted() {
    //this.$fetch();
    console.log('items on mounted', this.items)
  },
  watch: {
    '$route.query': {
      handler(s) {
        //this.$fetch();
      },
      immediate: true,
      deep: true,
    },

  },
  computed: {
    customQuery(){
      return {
        view_classes:"artifact",
        search:`{"typeIDWithSubs":[{"operator":"equal","logicalOperator":"or","values":[${this.$route.params.q}]}]}`
      }
    },
    options() {
      return {
        sortBy: [],
        sortDesc: [],
        page: this.$route.query.page || 1,
        itemsPerPage: this.$route.query.itemsperpage || 10,
      }
    },
  }
}

</script>

<style scoped>
.data_map{
  width:100%;
  height:calc(100vh - 110px);
  position:relative;
}
</style>

