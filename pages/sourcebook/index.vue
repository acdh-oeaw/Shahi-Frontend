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
      <div class="d-flex">
        <sourcebook v-if="!!sourcebook" class="sourcebook-page" :page="sourcebook.depictions[page]">
          <div class="navigator black d-flex justify-space-between  ">
            <div v-if="page !== 0" class="pagination secondary clickable text-body-1" @click="page=page-1">
              <v-icon large>
                mdi-chevron-left
              </v-icon>
            </div>
            <div v-else class="pagination  grey text-body-1">
              <v-icon large>
                mdi-chevron-left
              </v-icon>
            </div>

            <div style="height:100%;width:2px;" class="secondary darken-1" />

            <div class="secondary text-body-1 d-flex justify-center align-center px-15 text-center">
              {{ sourcebook.depictions[page].title }}
            </div>

            <div style="height:100%;width:1px;" class="secondary darken-1" />

            <div
              v-if="page !== sourcebook.depictions.length -1"
              class="pagination secondary clickable text-body-1"
              @click="page=page+1"
            >
              <v-icon large>
                mdi-chevron-right
              </v-icon>
            </div>
            <div v-else class="pagination grey lighten-1 text--disabled text-body-1">
              <v-icon large>
                mdi-chevron-right
              </v-icon>
            </div>
          </div>
        </sourcebook>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      sourcebook: undefined,
      page: 0,
    };
  },
  async mounted() {
    const p = await this.$api.Entities.get_api_0_2_entity__id__({
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
  max-width: 750px;

}

.title-1 {
  padding-left: 20px;
}

.sourcebook-page {
  max-width: 750px;
  height: 800px;
}

.navigator {
  max-width: 750px;
  height: 60px;
  left: 0;
  right: 0;
  position: absolute;
  z-index: 4000;
}

.pagination {
  user-select: none;

  min-width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 100ms ease;

}

.clickable:hover {
  filter: opacity(0.9);

}
</style>
