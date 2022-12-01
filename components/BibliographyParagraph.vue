<template>
  <div>
    <slot :item="bib">{{ bib }}</slot>
  </div>
</template>

<script>
export default {
  name: "BibliographyParagraph",
  props: ['id'],
  async fetch() {
    try {
      // eslint-disable-next-line no-underscore-dangle
      const p = await this.$api.Entities.get_api_0_3_entity__id__({
        id_: this.id,
      });
      // eslint-disable-next-line prefer-destructuring
      this.bib = p.body?.features[0]?.descriptions?.[0]?.value
    } catch (err) {
      console.log(err);
    }
  },
  data() {
    return {
      bib: "",
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
