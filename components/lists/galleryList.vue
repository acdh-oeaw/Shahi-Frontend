<template>
  <div style="position: relative;">
    <div id="list-anchor" style="position: absolute; top: -200px; left: 0"></div>
    <div v-if="notFound">
      No records found.
    </div>
    <div v-else-if="!loading" class="mt-15 mx-5 gallery-columns" :style="cssVars">
      <div v-for="(item, index) in filteredItems" :key="index" class="gallery-column">
        <div class="gallery-content px-1">
          <p class="text-center text-h6">
            {{ item.features[0].properties.title }}
          </p>

          <image-card :item="item"></image-card>

        </div>
        <favorite-icon :id="id(item)" zIndex="15"/>
        <nuxt-link
          :to="`/single/${item.features[0]['@id'].split('/').splice(-1)[0]}`"
        >
          <div class="gallery-background"/>
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
      :length="Math.ceil(filteredBaseItems.length / options.itemsPerPage)"
      :total-visible="7"
      @input="newPage"
    />
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import favorites from '@/mixins/favorites.js';
import favoriteIcon from '@/components/FavoriteIcon.vue';
import filterItemsMixin from '~/mixins/filterItemsMixin';


export default {
  components: {favoriteIcon},
  mixins: [favorites, filterItemsMixin],
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
      this.$router.replace({name: this.$route.name, query: {...this.$route.query, page}});
      document.getElementById("list-anchor").scrollIntoView({block: 'start'});

    },
  },
  computed: {
    options: {
      get() {
        return {
          sortBy: [],
          sortDesc: [],
          page: this.$route.query?.page ?? 1,
          itemsPerPage: this.$route.query?.itemsperpage ?? 20,
        };
      },
    },
    filteredItems(){
      const localItems = this.filteredBaseItems;
      return localItems.slice((this.options.page - 1) * 20, (this.options.page - 1) * 20 + 20)
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
