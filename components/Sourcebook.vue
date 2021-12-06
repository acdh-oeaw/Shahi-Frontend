<template>
  <div class="pdf-viewer">
    <div class="navigator black d-flex justify-space-between">
      <div
        v-if="page !== 0"
        class="pagination secondary clickable text-body-1"
        @click="page = page - 1"
      >
        <v-icon large> mdi-chevron-left </v-icon>
      </div>
      <div v-else class="pagination grey text-body-1">
        <v-icon large> mdi-chevron-left </v-icon>
      </div>

      <div style="height: 100%; width: 2px" class="secondary darken-1" />
      <v-menu bottom 
      rounded="0"
      transition="slide-y-transition" 
        offset-y  content-class="menu-content elevation-0"
     >
        <template v-slot:activator="{ on, attrs }">
              
        <div
        v-on="on"
          class="
          clickable
            secondary
            text-body-1
            d-flex
            justify-center
            align-center
            px-15
            text-center
          "
        >
          {{ pages[page].title }}
        </div>
        </template>
        <v-list style="max-width:750px;" class="secondary lighten-1">
          <v-list-item v-for="(item,index) in pages" :key="index" @click="page=index">
          <v-list-item-title :class="{'font-weight-bold':index===page}">  {{item.title}}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <div style="height: 100%; width: 1px" class="secondary darken-1" />

      <div
        v-if="page !== pages.length - 1"
        class="pagination secondary clickable text-body-1"
        @click="page = page + 1"
      >
        <v-icon large> mdi-chevron-right </v-icon>
      </div>
      <div v-else class="pagination grey lighten-1 text--disabled text-body-1">
        <v-icon large> mdi-chevron-right </v-icon>
      </div>
    </div>

    <div id="pdf-viewer" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script>
import axios from "axios";
import PDFObject from "pdfobject";
export default {
  name: "Sourcebook",
  props: ["pages"],
  data() {
    return {
      page: 0,
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
      const p = await axios.get(this.pages[this.page].url, {
        responseType: "blob",
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
  width: 100%;
  min-height: 500px;
  position: relative;
}

.pdfobject-container {
  height: 30rem;
  border: 1rem solid rgba(0, 0, 0, 0.1);
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
.menu-content {
  transform: translateX(-61px);
  max-height: 500px;
  
}
</style>
