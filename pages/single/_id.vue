<template>
  <v-sheet v-if="!loading">
    <v-sheet class="secondary darken-1 ">
      <div class="page-content pa-5 pa-sm-10">
        <v-row no-gutters class="d-flex justify-center align-center">
          <v-col cols="12" md="6" class="d-flex align-center">
            <v-sheet max-width="400px" color="transparent">
              <p class="title-1">
                {{ item.features[0].properties.title }}
              </p>
              <p v-if="types.Period" class="text-h5 text--secondary mt-n3">
                {{ types.Period[0].label }}
              </p>
              <p v-else class="text--secondary mt-n3">
                <span v-if="item.features[0].when.timespans[0].start.earliest">
                  from {{
                    item.features[0].when.timespans[0].start.earliest
                      .split("-")[0]
                      .replace(/^0+/, "")
                  }}</span>
                <span v-if="item.features[0].when.timespans[0].end.earliest">
                  to {{
                    item.features[0].when.timespans[0].end.earliest
                      .split("-")[0]
                      .replace(/^0+/, "")
                  }}</span>
              </p>
              <p v-if="item.features[0].description">
                {{ item.features[0].description[0].value }}
              </p>
              <p
                class="primary--text go-to-map-button"
                text
                @click="scrollMeTo('map')"
              >
                Discover on Map
                <v-icon class="ml-n1">
                  mdi-chevron-right
                </v-icon>
              </p>
            </v-sheet>
          </v-col>
          <v-col cols="12" md="6" class="d-flex justify-center">
            <ImageViewer />
          </v-col>
        </v-row>
      </div>
    </v-sheet>
    <v-sheet class="page-content mt-10 px-5 pa-sm-10">
      <p class="text-overline">
        Details
      </p>
      <v-row v-if="!!item.features[0].types" no-gutters class="text--secondary">
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
      <p class="text-overline">
        Relations
      </p>
      <v-row
        v-for="(relation,index) in item.features[0].relations
          .filter(x => x.relationType !== 'crm:P2 has type')"
        :key="index"
        class="text--secondary"
        no-gutters
      >
        {{ relation.relationType.split(' ').slice(1).join(' ') }}:
        {{ relation.label }}
        {{ relation.relationType }}
      </v-row>
    </v-sheet>
    <v-sheet class="px-10" />

    <v-sheet class="page-content map pa-5 pa-sm-10">
      <qmap
        v-if="!loading"
        :geojsonitems="[item]"
        style="height: 500px"
      />
    </v-sheet>
  </v-sheet>
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
    scrollMeTo(refName) {
      const el = this.$el.getElementsByClassName(refName)[0];
      const y = el.getBoundingClientRect().top - 100;

      if (el) {
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    },
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

<style>
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
</style>
