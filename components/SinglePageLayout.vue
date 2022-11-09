<template>
  <v-sheet>
    <v-sheet class="secondary darken-1 ">
      <div class="page-content pa-5 ">
        <v-row no-gutters>
          <v-col cols="12" sm="7" class="pa-3 d-flex flex-column">
            <slot :item="item" name="title">
              <p class="title-2 mb-0">
                {{ item.properties.title }}
              </p>
            </slot>
            <slot :item="item" name="subtitle">
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
            </slot>
            <slot :item="item" name="description">
              <p v-if="item.descriptions" style="white-space: pre-line">
                {{ item.descriptions[0].value }}
              </p>
            </slot>
          </v-col>
          <v-col cols="auto" class="mt-sm-15">
            <slot :item="item" name="image">
              <ImageViewer v-if="!!images && images.length !== 0" :images="images"/>
            </slot>
          </v-col>
        </v-row>
      </div>
    </v-sheet>
    <v-sheet class="page-content mt-5 mb-10 px-5">
      <slot :item="item" name="details">
        <p class="title-3">Details</p>
        <div class="type-columns" v-if="!!item.types" no-gutters>
          <div v-for="(type, index) in types" :key="index" cols="12" sm="5">
            <div v-if="type[0].supertype !== 'Material composition' || type.every(x => x.value !== 0)"
                 class="type-column">
              <span class="text--secondary text-overline">{{ type[0].supertype }}:</span>
              <div class="mb-2 mt-n2">
                <p class="ma-0 pa-0 text-body-1" v-for="t in type" :key="type.identifier">
                  {{ t.label }}<span v-if="!!t.value">: {{ t.value }} {{ t.unit }}</span>
                  <span v-if="type[0].supertype === 'Material composition'">%</span>
                  <tooltip-icon
                    v-if="type[0].hierarchy === 'Category of Authenticity'"
                    :text="$store.state.app.tableheaders['artifact'].find(x => x.text === 'Category of Authenticity').description"/>
                </p>
              </div>

            </div>
          </div>
          <div class="single-map" v-if="!!item.geometry && !!item.geometry.coordinates">
            <qmap :geojsonitems="[item]"/>
            <nuxt-link class="primary--text go-to-map-button" to="/data/map?view_classes=place&view_classes=artifact">
              Discover on Map
              <v-icon class="ml-n1">
                mdi-chevron-right
              </v-icon>
            </nuxt-link>
          </div>
        </div>
      </slot>
      <slot name="bibliography">
        <div v-if="!!bibliography && bibliography.length !==0">
          <p class="title-3 mb-1">Bibliography</p>
          <p class="my-1" v-for="b in bibliography" :key="b.relationTo">
            <bibliography-paragraph :id="b.relationTo.split('/').at(-1)" v-slot="{item}">
              {{item}}
            </bibliography-paragraph>
          </p>
        </div>

      </slot>
    </v-sheet>
  </v-sheet>
</template>

<script>
import {mapGetters} from 'vuex';
import ImageViewer from '@/components/ImageViewer';
import qmap from '~/components/map.vue';
import {dtoToEntity} from "@/composable/model";

export default {
  components: {
    qmap,
    ImageViewer,
  },
  props: ['item'],
  computed: {
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
    bibliography(){
      return this.item?.relations.filter(x => x.relationSystemClass	=== "bibliography")
    }
  },

  created() {
    this.closeAll();
  },
  methods: {
    scrollMeTo(refName) {
      const el = this.$el.getElementsByClassName(refName)[0];
      el?.scrollIntoView({behavior: 'smooth', block: 'end'});
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
  -webkit-column-break-inside: avoid; /* Chrome, Safari */
  page-break-inside: avoid; /* Theoretically FF 20+ */
  break-inside: avoid-column; /* IE 11 */
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

.go-to-map-button:hover > .v-icon {
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

