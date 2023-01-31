<template>
  <div>
    <section class="header secondary darken-1 mb-10">
      <div class="page-content  d-flex align-center">
        <p class="title-1">
          Sourcebook
        </p>
      </div>
    </section>

    <section>
      <div class="sourcebook-body mb-15">
        <p class="text-body-1">
          The Shahi project team has produced this collection of Sourcebook entries to inform each other of developments
          in their own respective research and provide information pertaining to the cultural history of the Shahi
          kingdoms to a wider audience. Each concise entry attempts to more precisely define a research problem or
          summarize key sources and includes relevant bibliographic and digital references that can be cross-referenced
          in the Shahi Kingdoms Database, Bibliographic Database, and scientific publication series of the project.
        </p>
        <p class="text-body-2">
          *The Shahi Kingdoms Digital Research Platform employs two transliteration systems. To
          ensure accessibility across scholarly disciplines and for general audiences, simplified phonetic
          transcriptions are used for frequently-used terms on the platform (e.g., Shahi). Diacritics are employed in
          individual scholars' contributions, such as Sourcebook entries (e.g., Śāhi).
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
  async fetch(){
    const p = await this.$api.Entities.get_api_0_3_entity__id__({
      id_: 2267,
    });
    this.sourcebook = p.body.features[0];
  },
  data() {
    return {
      tab: null,
      sourcebook: undefined,
    };
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
