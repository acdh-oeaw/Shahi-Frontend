<template>
  <div class="page-content pt-10 pa-5">
    <p class="title-1 pb-5">
      Bibliography
    </p>
    <p class="title-2 mt-n5">
      for the cultural history of the Shahi Kingdoms
    </p>
    <p class="text-body-1">
      This is an online resource of the Austrian Science Fund (FWF) project ‘Cultural Formation and Transformation:
      Shahi Art and Architecture from Afghanistan to the West Tibetan Frontier at the Dawn of the Islamic Era’ (P-
      31246) directed by Univ.-Prof. Dr. Deborah Klimburg-Salter in collaboration with National Research Partner HR
      Doz. Dr. Michael Alram. The following list includes publications relevant for the study of the cultural history of
      the Shahi Kingdoms compiled by the project core team and expanded through the contributions of Prof. Dr. Minoru
      Inaba, Dr. Noémie Verdon (primary literary sources) and other project consultants.
      Last update 08.11.2021
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
