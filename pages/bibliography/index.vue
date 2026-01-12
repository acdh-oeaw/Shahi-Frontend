<template>
  <div class="page-content pt-10 pa-5">
    <p class="title-1 pb-5">
      Bibliography
    </p>
    <p class="title-2 mt-n5">
      for the cultural history of the Shahi Kingdoms
    </p>
    <p class="text-body-1">
      The following bibliography offers a comprehensive list of publications relevant for the study of the cultural history of the Shahi Kingdoms. Developed by the Shahi Project team and collaborating consultants, the bibliography is multidisciplinary in scope and encompasses primary literary sources in relevant languages and secondary literature.
    </p>
    <div class="text-h6 mt-2">External Digital Resources</div>
    <p class="text-body-1">
      These scholastically rigorous, accessible digital resources allow for further exploration of material relevant to the Shahi Kingdoms: <br>
      <v-list>
        <v-list-item style="min-height: 0;"><v-list-item-content class="pb-0"><a href="https://data1.geo.univie.ac.at/projects/dasantlitzdesfremden/index.html%3Flanguage=en.html" target="_blank">The Countenance of the Other: The Coins of the Huns and Western Turks in Central Asia and India (online project of the Kunsthistorisches Museum Wien)</a></v-list-item-content></v-list-item>
      <v-list-item style="min-height: 0;"><v-list-item-content class="pb-0"><a href="https://ghazni.bdus.cloud/" target="_blank">Ghazni | Italian Archaeological Mission in Afghanistan: Buddhist and Islamic Archaeological Data from Ghazni, Afghanistan</a></v-list-item-content></v-list-item>
      <v-list-item style="min-height: 0;"><v-list-item-content class="pb-0"><a href="https://haddaarcheodb.com/" target="_blank">Hadda Archéo Database</a></v-list-item-content></v-list-item>
      <v-list-item style="min-height: 0;"><v-list-item-content class="pb-0"><a href="https://cirdis.univie.ac.at/documentation/western-himalaya-archive-vienna-whav" target="_blank">Western Himalaya Archive Vienna (WHAV)</a></v-list-item-content></v-list-item>
      </v-list>
    </p>
    <v-row  align="center">
      <v-col cols="12" sm="">
    <v-text-field v-model="search" class="search" label="Search" />
    </v-col>
    <v-col cols=12 sm="auto" >
      <v-btn href="primary_sources.pdf" color="primary" small outlined>Primary Sources</v-btn>
    </v-col>
    </v-row>
    <p />
    <div v-for="item in filteredList.slice(page,page+20)" :key="item.id" class="text-body-1 mb-4">
      <p v-if="!!item.author" class="ma-0 font-weight-bold">
        {{ item.author.map(x => [x.family, x.given, x.literal].filter(Boolean).join(', ')).join('; ') }}
        <span v-if="!!item.issued && !!item.issued['date-parts']" class="text--secondary">
          {{ item.issued['date-parts'][0][0] }}
        </span>
      </p>
      <div class="ml-3 text--secondary">
        <p class="ma-0">
          <span class="bib-title font-weight-bold">{{ item.title }}</span>
          <span v-if="!!item['collection-title']">In: {{ item['collection-title'] }},</span>
          <span v-if="!!item['collection-title']">In: {{ item['collection-title'] }},</span>
          <span v-if="!!item['container-title']">In: {{ item['container-title'] }},</span>
          <span v-if="!!item['editor'] && item['editor'].length !== 0">
            edited by {{ item['editor'].map(x => x.family ? `${x.family} ${x.given}` : x.literal).join(',')  }}
          </span>
        </p>
        <p class="ma-0">
          {{
            [
              item.volume ? `Volume: ${item.volume}` : null,
              item.page ? `Page(s): ${item.page}` : null,
              item.publisher ? `Publisher: ${item.publisher}` : null,
            ].filter(Boolean).join(', ')
          }}
        </p>
        <p class="text-body-2 ma-0">{{item['event-place']}}</p>

      </div>
    </div>

    <v-pagination
      v-model="page"
      :length="Math.floor(filteredList.length / 20)"
      :total-visible="7"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import bib from '../../assets/bib.json';

export default {
  name: 'Bibliography',
  data() {
    return {
      bib:bib,
      search: '',
      page: 1,
    };
  },
  methods: {
    normalizeString(s) {
      if (!s) return undefined;
      if (s === '') return '';
      return s.normalize('NFD').replace(/[\u0300-\u036F]/g, '').toLowerCase();
    },
  },
  computed: {
    filteredList() {
      const search = this.normalizeString(this.search) || '';
      const a = this.bib
        .filter((x) => this.normalizeString(x?.title)?.includes(search)
          || this.normalizeString(x?.publisher)?.includes(search)
          || x?.author?.some((a) => this.normalizeString(a?.family)?.includes(search))
          || this.normalizeString(x['collection-title'])?.includes(search)
          || this.normalizeString(x['container-title'])?.includes(search)
          || x?.author?.some((a) => this.normalizeString(a?.literal)?.includes(search))
          || x?.author?.some((a) => this.normalizeString(a?.given)?.includes(search)));
      return a;
    },
  },
};
</script>

<style scoped>
p {
  margin: 0;
  padding: 0;
}

.bib-title::before {
  content: "‘";
}

.bib-title::after {
  content: "’";
}

.search{
  position: sticky;
  top:64px;
  background-color: white;
}
</style>
