<template>
  <div>
    <div class="d-flex justify-end px-2">
      <v-select
        style="max-width: 600px"
        v-if="items.length !== 0"
        v-model="selectedHeaders"
        class="mt-5"
        dense
        :items="$store.state.app.tableheaders[getCurrentSystemClass]"
        label="Select Columns"
        multiple
        outlined
        return-object
      >
        <template v-slot:selection="{ item, index }">
          <v-chip v-if="index < 2" small>
            <span>{{ item.text }}</span>
          </v-chip>
          <span
            v-if="index === 2"
            class="grey--text caption"
          >(+{{ selectedHeaders.length - 2 }} others)</span>
        </template>
      </v-select>
    </div>
    <p v-if="notFound" class="text-body-1 ma-5">
      No records found.
    </p>
    <v-data-table
      v-else-if="items.length !== 0"
      :headers="showHeaders"
      :items="itemsWithType"
      :options.sync="options"
      :server-items-length="filteredBaseItems.length"
      @update:options="updateQuery"
      :loading="loading"
      :items-per-page="20"
      :calculate-widths="true"
      :footer-props="{
        showFirstLastPage: true,
        'items-per-page-options': itemsPerPageOptions,
      }"
    >
      <template v-slot:header.features[0].typeDict.categoryofauthenticity="{ header }">
        {{ header.text }}
        <tooltip-icon :text="header.description"/>
      </template>

      <template v-slot:top="{ pagination, options,updateOptions }">
        <v-data-footer
          @update:options="updateOptions"

          :pagination="pagination"
          :options="options"
          :items-per-page-options="itemsPerPageOptions"
          show-first-last-page
        />
      </template>
      <template v-slot:item.features[0].systemClass="{ item }">
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              {{getIconBySystemClass(item.features[0].systemClass).trim()}}
            </v-icon>
          </template>
          <span>
              {{ getLabelBySystemClass({ c: item.features[0].systemClass, l: 'en' }) }}
            </span>
        </v-tooltip>
      </template>
      <template v-slot:item.features[0].properties.title="{ item }">
        <nuxt-link
          :to="`/single/${item.features[0]['@id'].split('/').splice(-1)[0]}/`"
        >
          {{ item.features[0].properties.title }}
        </nuxt-link>
      </template>

      <template v-slot:item.features[0].descriptions[0].value="{ item }">
        <div v-if="item.features[0].descriptions" class="tablecolumndesc">
          {{ item.features[0].descriptions[0].value }}
        </div>
        <div v-else>
          n/a
        </div>
      </template>
      <template v-slot:item.features[0].when.timespans[0].start.earliest="{ item }">
        <span v-if="!!item.features[0].when.timespans[0].start.earliest">
          {{
            item.features[0].when.timespans[0].start.earliest
              ?.split("-")[0]
              ?.replace(/^0+/, "")
          }}
        </span>
      </template>
      <template v-slot:item.features[0].when.timespans[0].end.earliest="{ item }">
        <span v-if="!!item.features[0].when.timespans[0].end.earliest">
          {{
            item.features[0].when.timespans[0].end.earliest
              .split("-")[0]
              .replace(/^0+/, "")
          }}
        </span>
      </template>
      <template
        v-for="slot in $store.state.app.tableheaders[getCurrentSystemClass].filter((x) =>
          x.value.startsWith('features[0].typeDict')
        )"
        v-slot:[`item.${slot.value}`]="{ item }"
      >
        <div v-if="!!item.features[0].typeDict">
          <span
            v-for="(type, index) in item.features[0].typeDict[slot.value.split('.')[2]]"
            :key="index"
            class="clickable"
            @click="searchType(parseInt(type.identifier
              .split('/').splice(-1)[0]))"
          >
            {{ type.label }}
            <span
              v-if="!!type.value"
            >({{ type.value }}<span v-if="type.unit"> {{ type.unit }}</span>)</span>
            <br>
          </span>
        </div>
      </template>

      <template v-slot:item.favorites="{ item }">
        <favorite-icon :id="id(item)" />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import filterItemsMixin from '~/mixins/filterItemsMixin';

export default {
  mixins: [filterItemsMixin],
  props: {
    items: {
      type: Array,
      default: () => [],
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
      selectedHeaders: [],

    };
  },
  computed: {
    options: {
      get() {
        return {
          sortBy: [],
          sortDesc: [],
          page: this.$route.query?.page ?? 1,
          itemsPerPage: this.$route.query?.itemsperpage ?? 10,
        };
      },
      set(newValue) {
        let page;
        if (newValue.page !== 1) page = newValue.page;

        this.$router.replace({
          name: this.$route.name,
          query: {
            ...this.$route.query,
            page,
          },
        });
      },
    },
    ...mapGetters('app', [
      'getIconBySystemClass',
      'getLabelBySystemClass',
      'getCRMClassBySystemClass',
      'getSortColumnByPath',
      'getSystemClassForFilter',
      'getFilterList']),
    ...mapGetters('query', ['getQuery', 'getCurrentSystemClass']),
    itemsWithType() {

      const localItems = this.filteredBaseItems;
      if (!localItems || localItems.length === 0 || !Array.isArray(localItems)) return [];

      const mappedItems = localItems.map((item) => {
        item.features[0].typeDict = item.features[0].types
          ?.map((x) => {
            [x.supertype] = x.hierarchy.split(' > ');
            return x;
          })
          .reduce((r, a) => {
            const key = a.supertype.toLowerCase().replace(/\s+/g, '');
            r[key] = [...(r[key] || ''), a];
            return r;
          }, {});
        return item;
      });

      if (this.options.page && this.options.itemsPerPage) {
        return mappedItems.slice((this.options.page - 1) * this.options.itemsPerPage, (this.options.page - 1) * this.options.itemsPerPage + this.options.itemsPerPage);
      }
      else return mappedItems;
    },
    showHeaders() {
      return this.$store.state.app.tableheaders[this.getCurrentSystemClass]
        .filter((s) => this.selectedHeaders.includes(s));
    },
  },
  watch: {
    getCurrentSystemClass() {
      this.selectedHeaders = this.$store.state.app.tableheaders[this.getCurrentSystemClass]
        .filter((x) => x.visible);
    },
  },
  created() {
    this.selectedHeaders = this.$store.state.app.tableheaders[this.getCurrentSystemClass]
      .filter((x) => x.visible);
  },
  methods: {
    ...mapActions({
      searchByFilterId: 'query/searchByFilterId',
    }),
    id(item) {
      return item.features[0]['@id'].split('/').splice(-1)[0];
    },
    searchType(id) {
      this.searchByFilterId(id);
      let name = 'data-list-q';
      if (this.$route.name.startsWith('data-')) name = this.$route.name;

      this.$router.push({
        name,
        query: this.getQuery,
      });
    },
    updateQuery(options){
      const query = {
        page: options.page,
        itemsPerPage: options.itemsPerPage,
        sortBy:options.sortBy.map(x => this.getSortColumnByPath(x)),
        sort:options.sortDesc.map(x => x ? 'desc' : 'asc')


      }
      this.$router.replace({ name: this.$route.name, query: {...this.$route.query, ...query}})

    }
  },

};
</script>
