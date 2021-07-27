<template>
  <div>
    <div>
      <v-layout column justify-center align-center style="height: 100%">
        <div class="text-center ontop splashtext" :class="animationClasses">
          <transition name="fade">
            <div v-if="!showContent">
              <logo />
              <div v-html="body" />
              <v-btn text @click="showContent = !showContent">more Information</v-btn>
              <v-icon style="position:absolute; right:10px; top:10px" @click="close = !close">mdi-close</v-icon>
              <div style="position:absolute; left:0; top:0; right:0;bottom:0;" v-if="close" @click="close = !close" ></div>
            </div>
          </transition>
          <transition name="fade">
            <div v-if="showContent" class="main-content">
              <ImageNavigation @backToMap="showContent=false"></ImageNavigation>
              <v-container>
                <p class="text-h3">Title</p>
                <p class="text-body-1">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                  ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                  nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>

                <p class="text-h3">Discover Shahi kingdom</p>
                <p class="text-body-1">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                  ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                  nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>
                <div class="full-width" style="height: 500px">
                  <qmap />
                </div>

                <v-img
                  class="my-15"
                  height="100"
                  src="https://shahimaterialculture.univie.ac.at/fileadmin/_processed_/csm_1__Gilgit_MS_Banner_2ba90c6442.jpg"
                ></v-img>

                <p class="text-h3">Artifacts</p>
                <v-row>
                  <v-col v-for="item in [1, 2, 3]" :key="item">
                    <v-skeleton-loader
                      class="mx-5"
                      v-bind="attrs"
                      type="card"
                    ></v-skeleton-loader>
                  </v-col>
                </v-row>

                <v-img
                  height="100"
                  class="my-15"
                  src="https://shahimaterialculture.univie.ac.at/fileadmin/_processed_/csm_1__Gilgit_MS_Banner_2ba90c6442.jpg"
                ></v-img>

                <p class="text-h3">Sites</p>
                <v-row>
                  <v-col v-for="item in [1, 2, 3]" :key="item">
                    <v-skeleton-loader
                      class="mx-5"
                      v-bind="attrs"
                      type="card"
                    ></v-skeleton-loader>
                  </v-col>
                </v-row>
              </v-container>
            </div>
          </transition>
        </div>
      </v-layout>
      <div class="bgmap">
        <qmap
          v-if="!loading"
          :geojsonitems="items"
          :options="{ zoomControl: false }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import qmap from "~/components/map.vue";

export default {
  components: {
    qmap,
  },
  data() {
    return {
      items: [],
      body: "loading...",
      loading: true,
      showContent: false,
      close: false,
      animationClasses: "",
    };
  },
  async mounted() {
    this.showContent = false;
    const p = await this.$api.Entities.get_api_0_2_code__code_({
      limit: 100,
      show: ["geometry"],
      code: "place",
    });
    this.items = p.body.results;
    const content = await this.$api.Content.get_api_0_2_content_({});
    this.body = content.body.intro;
    this.loading = false;
  },
  watch: {
    showContent() {
      if(this.showContent)
        this.animationClasses = "expand"
      else
        this.animationClasses ="shrink"
    },
    close() {
      if(this.close)
        this.animationClasses = "closed"
      else
        this.animationClasses ="open"
    },
  },
};
</script>
<style>
body,
html {
  height: 100%;
}

.splashtext {
  position: relative;
  background-color: rgba(255, 255, 255, 0.8);
  top: 15vh;
  width: 100%;
  overflow: hidden;
  height: 400px;
}

.expand {
  animation: heightStretch 0.1s linear;
  animation-fill-mode: forwards;
}

.shrink {
  animation: heightShrink 0.1s linear;
  animation-fill-mode: forwards;
}

@keyframes heightStretch {
  0% {
    height: 400px;
    top: 15vh;
    background-color: rgba(255, 255, 255, 0.8);
  }
  99% {
    top: 0;
    background-color: rgba(255, 255, 255, 1);

    height: 100vh;
  }
  100% {
    top: 0;

    height: 100%;
    background-color: rgba(255, 255, 255, 1);
  }
}

@keyframes heightShrink {
  0% {
    top: 0;

    height: 100%;
    background-color: rgba(255, 255, 255, 1);
  }
  1% {
    top: 0;
    background-color: rgba(255, 255, 255, 1);

    height: 100vh;
  }
  100% {
    height: 400px;
    top: 15vh;
    background-color: rgba(255, 255, 255, 0.8);
  }
}

.closed {
  animation: moveRight 0.1s linear;
    transition: transform 100ms ease-in-out;
    cursor: pointer;

  animation-fill-mode: forwards;
}

.closed:hover{
  transform: translateX(-5%);
}

.open {
  animation: moveCenter 0.1s linear;
  animation-fill-mode: forwards;
}

@keyframes moveRight {
  0% {
    left: 0;
    height: 400px;
    background-color: rgba(255, 255, 255, 0.8);

  }
  100% {
    left: 95vw;
    background-color: rgba(255, 255, 255, 1);
  }
 
}

@keyframes moveCenter {
  100% {
    left: 0;
    height: 400px;
    background-color: rgba(255, 255, 255, 0.8);

  }
  0%{
    left: 90%;
    background-color: rgba(255, 255, 255, 1);

  }
}
.bgmap {
  height: calc(100vh - 64px);
  width: 100%;
  position: absolute;
  top: 0px;
}

.container {
  max-width: 1500px;
}

.fade-leave-active {
}

.fade-enter-active {
  transition: opacity 0.2s;
  transition-delay: 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
