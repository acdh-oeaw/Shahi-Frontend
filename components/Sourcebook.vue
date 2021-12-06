<template>
  <div class="pdf-viewer">
    <slot></slot>

    <div id="pdf-viewer" 
      style="width:100%;height:100%"></div>
  </div>
</template>

<script>
import axios from 'axios';
import PDFObject from 'pdfobject';
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

      PDFObject.embed(this.pdf, "#pdf-viewer");
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

.pdfobject-container { height: 30rem; border: 1rem solid rgba(0,0,0,.1); }

</style>
