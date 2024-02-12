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
      <dataMap :items="items" />
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
import axios from "axios";

export default {
  name: "q_.vue",
  components: {GalleryList, Otherlist, list},
  async fetch() {
    this.loading = true;
    const {
      sortBy, sortDesc, page, itemsPerPage,
    } = this.options;
    try {
      // eslint-disable-next-line no-underscore-dangle
      const p = await this.$api.Entities.get_api_type_entities__id__({
        id_: this.$route.params.q,
        limit: 0,
      });

      this.items = p.body.results;

      const depictionsInfo = (await axios.get('https://shahi.openatlas.eu/api/0.4/licensed_file_overview/')).data;
      
      this.sortItems(sortDesc);

      const descriptions = await Promise.all(
        this.items.map(async item => {
            const returnObj = {};
            const depictionID = item.features[0].depictions?.[0]['@id'].split('/').pop();
            if(!depictionID) return null;

            if (depictionsInfo[depictionID] && depictionsInfo[depictionID].extension) {
              const extension = depictionsInfo[depictionID].extension;
              returnObj.url = `/entity_files/${depictionID + extension}`
            } else {
              log(`Can't read depiction ${depictionID}`);
              log(depictionsInfo[depictionID]);
            }

            try {              
              const description = await this.$api.Entities.get_api_entity__id__({
                id_: depictionID,
                show: 'description'
              });
              returnObj.description = description?.body?.features?.[0]?.descriptions?.[0]?.value || null;
            } catch (error) {
              if (error.response && error.response.status === 502) {
                console.log(`Bad Gateway error for id: ${depictionID}`);
              } else {
                console.log(`Error for id: ${depictionID}`)
                console.log(error);
              }
              returnObj.description = null;
            }
            return returnObj;
        })
      );

      if(descriptions.length !== this.items.length) {
        console.log('descriptions length', descriptions.length);
        console.log('items length', this.items.length);
        throw new Error('descriptions length !== items length');
      }

      // Map descriptions to items
      descriptions.forEach((item, index) => {
        if(item?.description) {
          this.items[index].features[0].depictions[0].description = item?.description;
        }
        if(item?.url) {
          this.items[index].features[0].depictions[0].url = item.url;
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
  methods: {
    sortItems(sortDesc) {
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
    },
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

