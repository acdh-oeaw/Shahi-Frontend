<template>
  <v-sheet>
    <v-sheet class="secondary darken-1 ">
      <div class="page-content pa-5 ">
        <v-row no-gutters>
          <v-col cols="12" sm="7" class="pa-3 d-flex flex-column">
              <p class="title-2 mb-0">
                {{ item.properties.title }}
              </p>
              <p v-if="types.Period" class="text-overline text--secondary ">
                {{ types.Period[0].label }}
              </p>
              <p v-else class="text-overline text--secondary mt-0 pt-0 pl-1 ">
                <span v-if="item.when.timespans[0].start.earliest">
                  {{
                    item.when.timespans[0].start.earliest
                      .split("-")[0]
                      .replace(/^0+/, "")
                  }}</span>
                <span v-if="item.when.timespans[0].end.earliest">
                  - {{
                    item.when.timespans[0].end.earliest
                      .split("-")[0]
                      .replace(/^0+/, "")
                  }}</span>
              </p>
            <div>
              <v-row>
                <v-col v-if="getType(item, 'Place of production')" cols="auto"
                  class="d-block d-flex flex-column mb-3 flex-wrap">
                  <span class="text-body-2 text--secondary">Place of production</span>
                  <span class="text-body-1 font-weight-bold">{{ getType(item,'Place of production').label }}</span>
                </v-col>

                <v-col v-if="getRelation(item, 'crm:P52 has current owner')" cols="6"
                  class="d-block d-flex flex-column mb-3">
                  <span class="text-body-2 text--secondary ">Current location</span>
                  <span class="text-body-1 font-weight-bold">{{
                    getRelation(item,'crm:P52 has current owner')?.label
                  }} <span v-if="getInventoryNumber(item)?.relationDescription"
                      class="text--secondary text-body-1">({{
                        getInventoryNumber(item)?.relationDescription
                      }})</span> <a v-if="externalReference" :href="externalReference" target="_blank"><v-icon
                        small>mdi-open-in-new</v-icon></a></span>
                </v-col>
              </v-row>
            </div>
            <div v-if="!!relatedArtifacts && relatedArtifacts.length !== 0" class="mt-auto">

              <span class="d-block text-body-2 text--secondary mb-1" role="button" @click="expanded = !expanded">
                Related Artifacts <v-icon :style="`rotate:${expanded ? '90deg' : '0deg'}`">mdi-chevron-right</v-icon>
              </span>
              <v-expand-transition>
                <div v-if="expanded">
                  <v-chip label small color="secondary mr-2 mb-2" v-for="i in relatedArtifacts" :key="i.relationTo">
                    <nuxt-link class=" text-body-2 go-to-map-button" :to="'/single/' + i.relationTo.split('/').at(-1)">
                      {{ i.label }}
                    </nuxt-link>
                  </v-chip>
                </div>
              </v-expand-transition>
            </div>


            <p class="text-body-1" style="white-space: pre-line">
              {{ item.descriptions[0]?.value }}
            </p>

            <div class="mt-auto">
              <div v-if="!!seeAlso && seeAlso.length !== 0">
                <span class="text-body-2 text--secondary ">
                  See Also
                </span>
                <nuxt-link class="text-body-2 d-block go-to-map-button" v-for="i in seeAlso" :key="i.relationTo"
                  :to="'/single/' + i.relationTo.split('/').at(-1)">
                  {{ i.label }}
                </nuxt-link>
              </div>


            </div>
          </v-col>
          <v-col cols="auto" class="mt-sm-15">
              <ImageViewer v-if="!!images && images.length !== 0" :images="images" />
          </v-col>
        </v-row>
      </div>
    </v-sheet>
    <v-sheet class="page-content mt-5 mb-10 px-5">
      <div>
      <p class="title-3">Details</p>
      <div :class="!!item.types ? 'type-columns' : ''" no-gutters>
        <div v-for="(type, index) in types" :key="index" cols="12" sm="5">
          <div v-if="type[0].supertype !== 'Material composition' || type.every(x => x.value !== 0)"
            class="type-column">
            <span class="text--secondary text-overline">{{ type[0].supertype }}:</span>
            <div class="mb-2 mt-n2">
              <div class="ma-0 pa-0 text-body-1" v-for="t in type" :key="type.identifier">
                {{ t.label }}<span v-if="!!t.value">: {{ t.value }} {{ t.unit }}</span>
                <span v-if="type[0].supertype === 'Material composition'">%</span>
                <tooltip-icon v-if="type[0].hierarchy === 'Category of Authenticity'"
                  :text="$store.state.app.tableheaders['artifact'].find(x => x.text === 'Category of Authenticity').description" />
              </div>
            </div>

          </div>
        </div>

        <div class="single-map" v-if="!!item.geometry && !!item.geometry.coordinates">
          <qmap :center="mapCenter" :geojsonitems="[item]" />
          <v-btn text class="primary--text go-to-map-button ml-0 pl-0" @click=backToMap()>
            Back to Map
            <v-icon class="ml-n1">
              mdi-chevron-right
            </v-icon>
          </v-btn>
        </div>
      </div>
      <div v-if="!!bibliography && bibliography.length !== 0">
        <p class="title-3 mb-1">Bibliography</p>
        <div class="my-1" v-for="b in bibliography" :key="b.relationTo">
          <bibliography-paragraph :id="b.relationTo.split('/').at(-1)" v-slot="{ item }">
            {{ item }}
          </bibliography-paragraph>
        </div>
      </div>
    </div>
    </v-sheet>
  </v-sheet>
</template>

<script>
import { mapGetters } from 'vuex';
import ImageViewer from '@/components/ImageViewer';
import qmap from '~/components/map.vue';
import { dtoToEntity } from "@/composable/model";

export default {
  components: {
    qmap,
    ImageViewer,
  },
  props: ['item'],
  data(){
    return{
      expanded: false,
    }
  },
  computed: {
    externalReference() {
      return this.item?.relations?.find(x => x.relationSystemClass === "external_reference")?.label
    },
    partOf() {
      return this.item.relations?.filter(x => x.relationType.startsWith('crm:P46'));
    },
    seeAlso() {
      return this.partOf.filter(x => x.relationSystemClass !== 'artifact');
    },
    relatedArtifacts() {
      return this.partOf.filter(x => x.relationSystemClass === 'artifact');
    },
    types() {
      if (!this.item?.types) return [];
      return this.item.types
        ?.map((x) => {
          [x.supertype] = x.hierarchy.split(' > ');
          return x;
        })
        ?.reduce((r, a) => {
          r[a.supertype] = [...(r[a.supertype] || []), a];
          return r;
        }, {});
    },
    images() {
      return this.item.depictions;
    },
    bibliography() {
      return this.item?.relations.filter(x => x.relationSystemClass === "bibliography")
    },
    mapCenter() {
      if (!this.item?.geometry?.coordinates) return undefined;
      if (Array.isArray(this.item?.geometry?.coordinates[0])) return undefined;
      return [this.item?.geometry?.coordinates[1], this.item?.geometry?.coordinates[0]]

    }
  },

  created() {
    this.closeAll();
  },
  methods: {
    getInventoryNumber(item) {
      return item.relations.find(x => x.relationType === "crm:P67i is referred to by" && x.label === "Inventory number")
    },
    getType(item,hierarchy){
      return item.types?.find(x => x.hierarchy.split(' > ')[0] === hierarchy)
    },
    getRelation (item,relationType) {
     return item.relations?.find(x => x.relationType === relationType);
    },
    backToMap() {
      this.$router.push({
        path: "/data/map",
        query: {
          view_classes: ["place", "artifact"],
          center: this.mapCenter
        }
      })
    },
    scrollMeTo(refName) {
      const el = this.$el.getElementsByClassName(refName)[0];
      el?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    },
    async fetchRelated() {
      // eslint-disable-next-line no-restricted-syntax
      for (const id of this.item.relations) {
        // eslint-disable-next-line no-await-in-loop,no-underscore-dangle
        const ri = await this.$api.Entities.get_api_0_3_entity__id__({
          id_: id.relationTo.split('/').splice(-1, 1),
        });
        this.related.push(ri.body);
      }
    },
    closeAll() {
      Object.keys(this.$refs).forEach((k) => {
        if (this.$refs[k] && this.$refs[k].$attrs['data-open']) {
          this.$refs[k].$el.click();
        }
      });
    },
    openAll() {
      Object.keys(this.$refs).forEach((k) => {
        if (this.$refs[k] && !this.$refs[k].$attrs['data-open']) {
          this.$refs[k].$el.click();
        }
      });
    },
  },

};
</script>

<style>
.type-columns {
  --column-count: 2;
  -moz-column-count: 2;
  -webkit-column-count: 2;
  column-count: 2;
}

.type-column {
  -webkit-column-break-inside: avoid;
  /* Chrome, Safari */
  page-break-inside: avoid;
  /* Theoretically FF 20+ */
  break-inside: avoid-column;
  /* IE 11 */
  position: relative;
}

.page-content {
  max-width: 1200px;
  margin: auto;
}

.map {
  margin-top: 120px;
}

.go-to-map-button {
  transition: all ease 200ms;
  cursor: pointer;
}

.go-to-map-button:hover {
  opacity: 0.8;
}

.go-to-map-button:hover>.v-icon {
  transform: translateX(5px);
}


.single-map .leaflet-control {
  display: none !important;
}
</style>

<style>
.single-map {
  height: 400px;
  width: 400px;
  z-index: 0;
}
</style>

