<template>
  <div>
    <div v-if="notFound">
      No records found.
    </div>
    <div v-else-if="!loading" class="mt-15 mx-5 gallery-columns" :style="cssVars">
      <div v-for="(item, index) in items" :key="index" class="gallery-column">
        <div class="gallery-content">
          <p class="text-center">
            {{ item.features[0].properties.title }}
          </p>

          <v-img
            v-if="!!item.features[0].depictions && !!item.features[0].depictions.length !== 0"
            class="ma-3"
            height="100%"
            :src="item.features[0].depictions[0].url"
            alt="IMAGE"
          />
        </div>
        <favorite-icon :id="id(item)" />
        <nuxt-link
          :to="`/single/${item.features[0]['@id'].split('/').splice(-1)[0]}`"
        >
          <div class="gallery-background" />
        </nuxt-link>
      </div>
    </div>
    <div v-else style="width: 100vw; height: 60vh">
      <v-progress-circular
        style="position: absolute; top: 0; right: 0; bottom: 0; left: 0"
        class="ma-auto"
        :size="150"

        indeterminate
      />
    </div>
    <v-pagination
      class="ma-6"
      :value="parseInt(options.page)"
      :length="Math.floor(totalItems / options.itemsPerPage)"
      :total-visible="7"
      @input="newPage"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import favorites from '@/mixins/favorites.js';
import favoriteIcon from '@/components/FavoriteIcon.vue';

export default {
  components: { favoriteIcon },
  mixins: [favorites],
  props: {
    filter: {
      type: Object,
      default: () => {
      },
    },
    items: {
      type: Array,
      default: [],
    },
    totalItems: {
      type: Number,
      default: () => 0,
    },

    notFound: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      loading: false,
      itemsPerPageOptions: [10, 20, 50, 100],
      itemIndex: [],
      demoImageLinks: [
        'https://shahi-img.acdh-dev.oeaw.ac.at/iiif/images/artefacts/1/1.jp2/full/400,/0/default.png',
        'https://shahi-img.acdh-dev.oeaw.ac.at/iiif/images/artefacts/2/1.jp2/full/400,/0/default.png',
      ],
      demoThumbnailLinks: [
        'https://shahi-img.acdh-dev.oeaw.ac.at/iiif/images/artefacts/1/1.jp2/full/200,/0/default.png',
        'https://shahi-img.acdh-dev.oeaw.ac.at/iiif/images/artefacts/2/1.jp2/full/200,/0/default.png',
      ],
    };
  },

  methods: {
    id(item) {
      return item.features[0]['@id'].split('/').splice(-1)[0];
    },
    getValueFromType(item, type) {
      if (!item.features[0].types) {
        return '-';
      }

      return item.features[0].types
        .filter((t) => t.hierarchy === type)
        .map((x) => x.label)
        .join(', ');
    },
    newPage(page) {
      this.$router.replace({ name: this.$route.name, query: { ...this.$route.query, page } });
    },
  },
  computed: {
    options: {
      get() {
        return {
          sortBy: [],
          sortDesc: [],
          page: this.$route.query.page || 1,
          itemsPerPage: this.$route.query.itemsperpage || 20,
        };
      },
    },
    ...mapGetters('app', [
      'getTypesBySystemClass',
      'getIconBySystemClass',
      'getLabelBySystemClass',
      'getCRMClassBySystemClass',
      'getSortColumnByPath',
      'getSystemClassForFilter',
      'getFilterList',
    ]),

    cssVars() {
      let colCount = 3;
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          colCount = 1;
          break;
        case 'sm':
          colCount = 2;
          break;
        case 'md':
          colCount = 3;
          break;
        case 'lg':
          colCount = 4;
          break;
        case 'xl':
          colCount = 4;
          break;
      }
      return {
        '--column-count': colCount,
      };
    },
  },
};
</script>
<style scoped>
.gallery-columns {
  -moz-column-count: var(--column-count);
  -webkit-column-count: var(--column-count);
  column-count: var(--column-count);
}

.gallery-column {
  margin-bottom: 20px;
  -webkit-column-break-inside: avoid; /* Chrome, Safari */
  page-break-inside: avoid; /* Theoretically FF 20+ */
  break-inside: avoid-column; /* IE 11 */
  position: relative;
}

.gallery-content {
  position: relative;
  padding-bottom: 20px;
  z-index: 20;
  pointer-events: none;
}

.gallery-background {
  z-index: 10;
  border: 1px solid #ccc;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: all 100ms linear;

}

.gallery-background:hover {
  transform: scale(1.05);
  background-color: lightgray;
}
</style>
