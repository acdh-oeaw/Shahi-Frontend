<template>
  <div>
    <section class="header secondary darken-1 mb-10">
      <div class="page-content  d-flex align-center">
        <p class="title-1">
          Sourcebook for the Shahi Kingdoms
        </p>
      </div>
    </section>

    <section>
      <div class="sourcebook-body mb-15">
        <p class="text-body-1">
          Edited by Natasha Kimmet and Deborah Klimburg-Salter with peer review by <nuxt-link to="/team" class="go-to-map-button primary--text">contributors</nuxt-link> to the Shahi Project.
        </p>
        <p class="text-body-1">
          The <i>Sourcebook for the Shahi Kingdoms</i> is a compilation of short research entries. The <i>Sourcebook</i> developed out of the annual
          project workshops in which the international contributing scholars informed each other of developments in their own respective research
          and discussed the primary source materials underpinning their work. The resultant <i>Sourcebook</i> entries each attempt to more precisely define
          a research problem or summarize key sources pertinent to the development of an integrated understanding of the cultural history of the Shahi
          Kingdoms. The entries include relevant bibliographic and digital references that can be cross-referenced in the Shahi Kingdoms Database,
          bibliography, and final digital publication.
        </p>

        <v-tabs
          v-model="tab"
          align-with-title
        >
          <v-tabs-slider color="secondary" />
          <v-tab>
            All Entries
          </v-tab>
          <v-tab>
            Viewer
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab" class="overflow-visible" >
          <v-tab-item>
            <v-list v-if="!!sourcebook">
              <v-list-item v-for="(item,index) in sourcebook.depictions" :key="index" class="mb-5">
                <div>
                  <p class="text-body-1 mb-0">
                    <a :href="item.url" target="_blank">{{ item.title }}</a>
                  </p>
                  <v-list-item-subtitle>Page {{ index + 1 }}</v-list-item-subtitle>
                </div>
              </v-list-item>
            </v-list>
          </v-tab-item>

          <v-tab-item
            class="pa-5"
          >
            <sourcebook v-if="!!sourcebook" class="sourcebook-page" :pages="sourcebook.depictions" />
          </v-tab-item>
        </v-tabs-items>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      tab: null,
      sourcebook: undefined,
    };
  },
  async mounted() {
    const p = await this.$api.Entities.get_api_entity__id__({
      id_: 2267,
    });
    this.sourcebook = p.body.features[0];
  },
};
</script>

<style scoped>
.header {
  height: 200px;
}

.page-content {
  height: 100%;
  max-width: 850px;

}

.title-1 {
  padding-left: 20px;
}

.sourcebook-page {
  max-width: 850px;
  height: 800px;
}

.sourcebook-body {
  max-width: min(850px, 100vw);
  margin: auto;
  min-height: 850px;
}

.sourcebook-body a:hover {
  opacity: 0.8;
}
</style>
