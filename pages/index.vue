<template>
  <div style="min-height: 84vh">
    <v-layout
      column
      justify-center
      align-center
      class="text-center  splashtext "
      :class="{
        closed: closed,
        'animation-closed': closed & initialized,
        'animation-open': !closed & initialized,
        'gilgit-background': !closed,
        'py-10':!closed,
        open: !closed,
        topOffset: $vuetify.breakpoint.smAndUp,
      }"
    >

      <div v-if="!closed" class="white" style="width:100%; ">
        <div  style="max-width:1000px;margin:auto;" class="pa-5">
          <p class="text-h4 text-sm-h2">Shahi Kingdoms Database</p>

          <p class="text-body-1">
            The Shahi Kingdoms Database presents comprehensive primary source
            material--archaeological sites, artifacts, coins, inscriptions--for
            the Shahi kingdoms (c. 7th-10th centuries) which played a pivotal
            role in the history of Central, Inner, and South Asia. The primary
            source material records are cross-referenced with an interactive
            geo-referenced map, bibliographic references, and digital scientific
            articles.
          </p>
          <p class="text-body-1">
            The database is an initiative of the interdisciplinary Austrian
            Science Fund (FWF) project P-31246 ‘Cultural Formation and
            Transformation: Shahi Art and Architecture from Afghanistan to the
            West Tibetan Frontier at the Dawn of the Islamic Era’ in cooperation
            with technical experts at the Austrian Academy of Sciences’ Austrian
            Centre for Digital Humanities and Cultural Heritage (ACDH-CH) and
            cartographers at the University of Vienna’s Department of Geography
            and Regional Research. It is co-financed by the FWF Shahi project,
            Austrian Archaeological Institute, and Holzhausen-Legat.
          </p>
          <v-row class="mx-3 mx-sm-15 mt-7">
            <v-col>
              <v-btn
                color="secondary"
                x-large
                class="splashtext-btn"
                @click="closed = !closed"
              >
                Discover the Kingdoms
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                color="secondary"
                x-large
                class="splashtext-btn"
                to="/information"
              >
                Enter Database
              </v-btn>
            </v-col>
          </v-row>
        </div>


      </div>
       <v-btn
          v-else
          fab
          @click="
            initialized = true;
            closed = !closed;
          "
          color="secondary"
        >
          <v-icon>mdi-information-variant</v-icon>
        </v-btn>
    </v-layout>
    <v-fab-transition>
      <v-btn
        to="/data/list?codes=artifact"
        fab
        absolute
        bottom
        right
        color="secondary"
        v-if="closed"
        class="database-btn"
      >
        <v-icon>mdi-database</v-icon></v-btn
      >
    </v-fab-transition>
    <div class="bgmap"  :class="{ darkened: !closed}">
      <qmap
        :geojsonitems="items"
        :options="{ zoomControl: false }"
      />
    </div>
  </div>
</template>

<script>
import ImageButton from "@/components/ImageButton.vue";
import qmap from "~/components/DataMap";

export default {
  components: {
    qmap,
    ImageButton,
  },
  data() {
    return {
      items: [],
      body: "loading...",
      closed: false,
      initialized: false,
    };
  },
  watch: {
    closed() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  async mounted() {
    this.closed = this.$route.params.showMap;
    this.showContent = false;
    const content = await this.$api.Content.get_api_0_3_content_({});
    this.body = content.body.intro;
  },
};
</script>
<style>
body,
html {
  height: 100%;
}
.splashtext {
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  min-height: 400px;

  z-index: 5;
  max-width: 100vw;
  min-width: 100%;
  max-height: 100%;

}
.gilgit-background{
        background-image:url("../assets/gilgit_banner.jpg");
background-position: center;
background-repeat: no-repeat;
background-size: cover;
}


.topOffset {
  transform: translateY(5rem);
}
.animation-closed {
  animation-name: close;
  animation-duration: 500ms;
  animation-fill-mode: forwards;

  cursor: pointer;
}

.animation-open {
  overflow: hidden;
  animation-name: open;
  animation-duration: 500ms;
  animation-fill-mode: forwards;
}

.closed {
  border-radius: 50%;
  max-width: 56px;
  min-width: 56px;

  max-height: 56px;
  min-height: 56px;
  background-color: rgba(255, 255, 255, 0);
  transform: translateY(calc(84vh - 100px)) translateX(calc(50vw - 54px));
}

.bgmap {
  height: calc(100vh - 64px);
  width: 100%;

  position: absolute;
  top: 0;
  z-index: 0;
  transition: all 100ms linear;
}

.darkened {
  filter: brightness(85%);
}

.splashtext-btn {
  width: 100%;
  min-height: 56px;
}

.slide-fade-enter-active {
  transition: all 300ms ease;
  transition-delay: 500ms;
}
.slide-fade-leave-active {
  transition: all 100ms ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  height: 0px;
}

@keyframes close {
  0% {
    border-radius: 0%;
    background-color: rgba(255, 255, 255, 1);
    transform: translateY(5rem);

    max-width: 100vw;
    min-width: 100%;
    max-height: 100%;
    min-height: 400px;
  }
  60% {
    border-radius: 30%;
  }
  70% {
    max-width: 56px;
    min-width: 56px;
    max-height: 56px;
    min-height: 56px;
  }
  99% {
    background-color: #b7bf96;
  }
  100% {
    border-radius: 50%;
    max-width: 56px;
    min-width: 56px;
    max-height: 56px;
    min-height: 56px;
    background-color: rgba(255, 255, 255, 0);
    transform: translateY(calc(84vh - 100px)) translateX(calc(50vw - 54px));
  }
}

@keyframes open {
  100% {
    background-color: rgba(255, 255, 255, 1);

    max-width: 100vw;
    min-width: 100%;
    max-height: 100%;
    min-height: 400px;
  }
  40% {
    border-radius: 30%;
  }
  30% {
    max-width: 56px;
    min-width: 56px;
    max-height: 56px;
    min-height: 56px;
  }
  1% {
    background-color: #b7bf96;
  }
  0% {
    border-radius: 50%;
    max-width: 56px;
    min-width: 56px;

    max-height: 56px;
    min-height: 56px;
    background-color: rgba(255, 255, 255, 0);
    transform: translateY(calc(84vh - 100px)) translateX(calc(50vw - 54px));
  }
}

</style>
