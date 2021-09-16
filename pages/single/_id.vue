<template>
  <div>
    <v-layout v-if="!loading" class="mt-5 mx-sm-15 ">
      <v-row no-gutters>
        <v-col cols="12" md="6" class="d-flex align-center">
          <v-card max-width="500px" flat class="ml-10">
            <v-card-title class="text-h4">
              {{ item.features[0].properties.title }}
            </v-card-title>
            <v-card-subtitle v-if="types.Period" class="text-h5">
              {{ types.Period[0].label }}
            </v-card-subtitle>
            <v-card-subtitle v-else>
              <span v-if="item.features[0].when.timespans[0].start.earliest">
                from {{ item.features[0].when.timespans[0].start.earliest
                  .split("-")[0]
                  .replace(/^0+/, "") }}</span>
              <span v-if="item.features[0].when.timespans[0].end.earliest">
                to {{ item.features[0].when.timespans[0].end.earliest
                  .split("-")[0]
                  .replace(/^0+/, "") }}</span>
            </v-card-subtitle>
            <v-card-text v-if="item.features[0].description">
              {{ item.features[0].description[0].value }}
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card class="ml-sm-15" flat>
            <v-tabs centered grow>
              <v-tab>Image</v-tab>

              <v-tab>Map</v-tab>
              <v-tab-item>
                <ImageViewer style="height: calc(100vh - 154px)" />
              </v-tab-item>
              <v-tab-item>
                <qmap
                  v-if="!loading"
                  :geojsonitems="[item]"
                  style="height: calc(100vh - 154px)"
                />
              </v-tab-item>
            </v-tabs>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card class="ml-10" flat>
            <v-card-title class="text-overline">
              Details
            </v-card-title>
            <v-card-text>
              <v-row v-if="!!item.features[0].types" no-gutters>
                <v-col v-for="i in [0,1]" :key="i" cols="12" sm="5">
                  <v-row
                    v-for="(typeGroup, index) in cutInHalf(Object.values(types))[i]"
                    :key="index"
                    no-gutters
                  >
                    <v-col cols="auto" class="mr-1">
                      <p v-if="typeGroup[0].supertype === 'Material'" class="font-weight-bold">
                        Materials:
                      </p>
                      <p v-else class="font-weight-bold">
                        {{ typeGroup[0].supertype }}:
                      </p>
                    </v-col>
                    <v-col cols="auto">
                      <p style="max-width: 400px">
                        {{ typeGroup.map(x => x.label).join(', ') }}
                      </p>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-title>
              <div class="text-overline">
                Relations
              </div>
            </v-card-title>
            <v-card-text>
              <v-row
                v-for="(relation,index) in item.features[0].relations
                  .filter(x => x.relationType !== 'crm:P2 has type')"
                :key="index"
                no-gutters
              >
                {{ relation.relationType.split(' ').slice(1).join(' ') }}:
                {{ relation.label }}
                {{ relation.relationType }}
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ImageViewer from '@/components/ImageViewer';
import qmap from '~/components/map.vue';

export default {
  components: {
    qmap,
    ImageViewer,
  },
  async fetch() {
    this.loading = true;
    // eslint-disable-next-line no-underscore-dangle
    const p = await this.$api.Entities.get_api_0_2_entity__id__({
      id_: this.$route.params.id,
    });
    // eslint-disable-next-line prefer-destructuring
    this.item = p.body;
    // await this.fetchRelated();
    this.loading = false;
  },
  data() {
    return {
      item: {},
      related: [],
      expanded: [],
      loading: false,
      isClamped: true,
    };
  },
  computed: {
    ...mapGetters('app', [
      'getIconBySystemClass',
      'getLabelBySystemClass',
      'getCRMClassBySystemClass',
      'getSortColumnByPath',
      'hasTime',
      'hasSex',
    ]),
    relationTypes() {
      // eslint-disable-next-line max-len
      if (Array.isArray(this.item.features[0].relations)) {
        return [
          ...new Set(
            this.item.features[0].relations.map((item) => item.relationType),
          ),
        ];
      }
      return [];
    },
    genderFromClass() {
      if (Array.isArray(this.item.features[0].relations)) {
        if (
          this.item.features[0].relations.filter((r) => r.label === 'Male')
            .length > 0
        ) return 'Male';
        if (
          this.item.features[0].relations.filter((r) => r.label === 'Female')
            .length > 0
        ) return 'Female';
      }
      return 'n/a';
    },
    types() {
      if (!this.item.features[0].types) return [];
      return this.item.features[0].types
        .map((x) => {
          [x.supertype] = x.hierarchy.split(' > ');
          return x;
        })
        .reduce((r, a) => {
          r[a.supertype] = [...(r[a.supertype] || []), a];
          return r;
        }, {});
    },
  },
  watch: {
    '$route.params': {
      handler() {
        this.$fetch();
      },
      immediate: true,
      deep: true,
    },
  },
  created() {
    this.closeAll();
  },
  methods: {
    async fetchRelated() {
      // eslint-disable-next-line no-restricted-syntax
      for (const id of this.item.features[0].relations) {
        // eslint-disable-next-line no-await-in-loop,no-underscore-dangle
        const ri = await this.$api.Entities.get_api_0_2_entity__id__({
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
    cutInHalf(list) {
      const halfwayThrough = Math.floor(list.length / 2);
      const arrayFirstHalf = list.slice(0, halfwayThrough);
      const arraySecondHalf = list.slice(halfwayThrough, list.length);
      return [arrayFirstHalf, arraySecondHalf];
    },
  },

};
</script>
