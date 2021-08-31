<template>
  <div>
    <div>
      <v-layout column justify-center align-center >
        <div class="text-center splashtext" style="z-index:401" :class="animationClasses">


          <transition name="fade">

            <div v-if="!showContent" >
              <p class="text-h2 mt-5">Shahi Art and Architecture</p>
              <div v-html="body" />
              <p class="text-body-1 ma-auto mt-10" style="max-width:650px">The goal of the project "Cultural Formation and Transformation: Shahi Buddhist Art and Architecture from Afghanistan to the West Tibetan Frontier at the Dawn of the Islamic Era" is to define a narrative cultural history of the Shahi kingdom (7th to 10th century).
              <br>
                <v-btn text @click="openContent">more Information</v-btn>
                <br>
                <v-btn class="mt-15" x-large  @click="close = !close" color="success">Disover Shahi Kingdom <v-icon>mdi-map</v-icon></v-btn>
              <v-icon style="position:absolute; right:10px; top:10px" @click="close = !close">mdi-close</v-icon>
              <div style="position:absolute; left:0; top:0; right:0;bottom:0;" v-if="close" @click="close = !close" ></div>
            </div>
          </transition>
          <transition name="fade">
            <div v-if="showContent">
              <info-page></info-page>
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
import qmap from "~/components/map.vue";
import InfoPage from "~/components/InfoPage.vue"

export default {
  components: {
    qmap,
    InfoPage
  },
  data() {
    return {
      items: [],
      body: "loading...",
      loading: true,
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
  methods:{
    openContent(){
      const name = 'index'
       this.$router.push({
         name,
        query: {
          mode: "information"
        },
    })
      console.log(this.$route.query)

    }
  },
  computed:{
    showContent(){
      if(this.$route.query?.mode === 'information' ){
        this.animationClasses = 'expand'
        return true
      }
      else
        return false

    }
  }

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
