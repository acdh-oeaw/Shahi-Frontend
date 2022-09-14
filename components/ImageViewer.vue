<template>
  <div>
    <div class="">
      <div>
        <v-img
          class="white shadow scale clickable d-flex align-end"
          contain
          max-width="450px"
          :src="primaryImage.url"
          @click="!!images && images.length !== 0 ? show() : viewMode=true"
        />
        <p style="max-width: 450px" class="text-caption text-left secondary lighten-1 pa-2 d-flex flex-column">
          <span class="font-weight-bold">{{ primaryImage.license }}</span>
          <span> {{ imageDescriptions[primaryImage['@id'].split('/').at(-1)] }}</span>
          <span class="mt-3 primary--text go-to-map-button" text
                @click="!!images && images.length !== 0 ? show() : viewMode=true">
          All Images
          <v-icon class="ma-n1">
            mdi-chevron-right
          </v-icon>
        </span>
        </p>

      </div>

    </div>
    <client-only>
      <div v-if="viewMode" class="wrapper">
        <div class="viewer">
          <v-btn class="closeIcon" icon @click="viewMode=false">
            <v-icon color="white">
              mdi-close
            </v-icon>
          </v-btn>
          <!--<IIIFImageViewer style="height:100%;width:100%" :image-info-url="primaryImage.url"/>-->
          <div class="image-picker">
            <div v-for="i in 5" :key="i" class="image-preview">
              <v-img
                height="100%"
                :src="`https://shahi-img.acdh-dev.oeaw.ac.at/iiif/images/artefacts/${$route.params.id%2 +1}/${i}.jp2/full/120,/0/default.png`"
                @click="selected = `https://shahi-img.acdh-dev.oeaw.ac.at/iiif/images/artefacts/${$route.params.id%2 +1}/${i}.jp2/info.json`"
              />
            </div>
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
import 'viewerjs/dist/viewer.css';
import VueViewer from 'v-viewer';
import Vue from 'vue';

Vue.use(VueViewer);
export default {
  name: 'ImageViewer',
  props: ['images'],
  data() {
    return {
      viewMode: false,
      initZoom: 0,
      imageDescriptions: {},
      iiifOptions: {
        tileFormat: 'jpg',
        tileSize: 310,
      },
      manifest: 'https://shahi-img.acdh-dev.oeaw.ac.at/iviif/presentation/hk-shahi/manifest',
      infoUrl: 'https://stacks.stanford.edu/image/iiif/hg676jb4964%2F0380_796-44/info.json',
      demoImages: ['http://localhost:8182/iiif/3/sculpture1.tif/',
        'http://localhost:8182/iiif/3/sculpture2.jpg/'],
      selected: `https://shahi-img.acdh-dev.oeaw.ac.at/iiif/images/artefacts/${this.$route.params.id % 2 + 1}/1.jp2/info.json`,
    };
  },
  computed: {
    id() {
      return Math.ceil(Math.random() * 3);
    },
    primaryImage() {
      return this.images?.[0] || {url: `https://shahi-img.acdh-dev.oeaw.ac.at/iiif/images/artefacts/${this.$route.params.id % 2 + 1}/1.jp2/full/500,/0/default.png`};
    },
    imagesWithData() {
      return this.images.map(i => ({src: i.url, title: 'hallo'}))
    }
  },
  methods: {
    show() {
      const that = this;
      let init = true;
      this.$viewerApi({
        images: this.imagesWithData,
        options: {
          rotatable: false, scalable: false, title: false, viewed(e) {
            const id = that.images[e.detail.index]['@id'].split('/').at(-1);
            const innerHTML = `<span>${that.images[e.detail.index].license || ''}</span><span>${that.imageDescriptions[id] || ''}</span>`
            let div = document.createElement('div');
            div.classList.add('viewer-title');
            div.classList.add('custom-viewer-title');

            let viewFooter = document.querySelector(".viewer-footer");
            if (init) {
              viewFooter.prepend(div);
              init = false
            }
            viewFooter.firstChild.innerHTML = innerHTML
          }
        }
      });
    },
  },
  watch: {
    images: {
      async handler() {
        for (const image of this.images) {
          const p = await this.$api.Entities.get_api_0_3_entity__id__({
            id_: image['@id'].split('/').at(-1),
            show: 'description'
          });
          this.imageDescriptions = {
            ...this.imageDescriptions,
            [image['@id'].split('/').at(-1)]: p?.body?.features?.[0]?.descriptions?.[0]?.value
          }
        }
      },
      immediate: true,
      deep: true,
    }
  }
}
;
</script>

<style scoped>

html, body {
  margin: 0;
  height: 100%;
}

.wrapper {
  height: 100vh !important;
  width: 100vw;
  background-color: rgb(0, 0, 0);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  align-self: center;
  justify-content: center;
}

.viewer {
  padding: 10px 0;
  max-width: 900px;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.image-preview {
  height: 150px;
  cursor: pointer;
  z-index: 999999;
  transition: transform 250ms, opacity 400ms;
  margin: 10px 10px;
}

.image-preview:hover {
  transform: scale(1.1);
}

.image-picker {
  position: absolute;
  width: 100%;
  overflow: auto;
  z-index: 999999;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.3);
  bottom: 0;
  display: flex;
  flex-direction: row;
}

.closeIcon {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 999999;

}

.shadow {
  /* offset-x | offset-y | blur-radius | spread-radius | color */
  box-shadow: 0 20px 20px 1px rgba(0, 0, 0, 0.2);
}

.scale {
  transition: all ease 200ms;
}

.scale:hover {
  transform: scale(1.01);
}

.clickable {
  cursor: pointer;
}

.clickable:hover {
  opacity: 1 !important;
}

</style>
<style>

.viewer-container {
  z-index: 9999 !important;
}
.custom-viewer-title{
  display: flex;
  flex-direction: column;
}
</style>
