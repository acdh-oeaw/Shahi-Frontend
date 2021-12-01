<template>
  <div class="pdf-viewer">
    <slot />
    <iframe
      v-if="pdf"
      frameBorder="0"
      class="pdf-viewer"
      :src="pdf"
      style="width:100%;height:100%"
    />
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Sourcebook',
  props: ['page'],
  data() {
    return {
      pdf: undefined,
    };
  },
  watch: {
    page() {
      this.getPdf();
    },
  },
  async mounted() {
    this.getPdf();
  },
  methods: {
    async getPdf() {
      console.log(this.page.url);

      const p = await axios.get(this.page.url, {
        responseType: 'blob',
      });
      this.pdf = URL.createObjectURL(p.data);
    },
  },
};
</script>

<style scoped>
.pdf-viewer {
  margin: auto;
  width:100%;
  min-height:500px;
  position: relative;
}
</style>
