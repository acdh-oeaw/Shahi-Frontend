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
        <sourcebook v-if="!!sourcebook" class="sourcebook-page" :pages="sourcebook.depictions">
          
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

</style>
