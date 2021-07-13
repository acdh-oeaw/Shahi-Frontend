<template>
  <v-app light>
    <v-navigation-drawer
      v-if="hideOnMainPage"
      v-model="$store.state.app.queryDrawer"
      class="ontop"
      :disable-resize-watcher="true"
      clipped
      app
      color="grey lighten-4"
    >
      <v-list
        dense
        class="grey lighten-4"
      >
        <template v-for="(item, i) in items">
          <v-row
            v-if="item.heading"
            :key="i"
            align="center"
          >
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col
              cols="6"
              class="text-right"
            />
          </v-row>
          <v-divider
            v-else-if="item.divider"
            :key="i"
            dark
            class="my-4"
          />
          <v-list-item
            v-else
            :key="i"
            link
            :to="item.target"
            @click="$store.commit('app/closeQueryDrawer')"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-expand-transition>
    <v-app-bar app clipped-left class="ontop" v-if="hideOnMainPage">
      <v-app-bar-nav-icon @click="$store.commit('app/toggleQueryDrawer')" />
      <nuxt-link to="/" @click="$store.commit('app/closeQueryDrawer')">
        <div class="logocaption d-none d-sm-flex">
          <img class="barlogo ml-1 mr-1" alt="logo" src="/OpenAtlasDiscovery_logo.png">
        </div>
      </nuxt-link>

      <querysearch />
      <v-spacer />
      <v-fade-transition>
      <v-btn-toggle v-if="['list-q','map-q','detaillist-q'].includes($route.name)"    v-model="view">
        <v-btn value="list-q">Table</v-btn>
        <v-btn value="map-q">Map</v-btn>
        <v-btn value="detaillist-q">List</v-btn>
      </v-btn-toggle>
      </v-fade-transition>
    </v-app-bar>
    </v-expand-transition>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>
<script>
import querysearch from '~/components/querysearchNew.vue';
export default {
  components: {
    querysearch,
  },
  data() {
    return {
      drawer: false,
      view: undefined,
      items: [
        { heading: 'Sample Queries' },
      ].concat(this.$store.state.app.menuitems),
      title: '',
      windowTop:0,
    };
  },
  async mounted() {
    const content = await this.$api.Content.get_api_0_2_content_({});
    this.$store.commit('app/setSiteName', content.body['site-name']);
    this.title = content.body['site-name'];
    window.addEventListener("scroll", this.onScroll)
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll)
  },
  head() {
    return { title: this.title };
  },
  methods:{
    onScroll(e) {
      this.windowTop = window.top.scrollY /* or: e.target.documentElement.scrollTop */
    },
    changeMode(){
      let name = 'list-q';
      if(this.$route.name === 'list-q')
        name = 'map-q'
      this.$router.push({
        name,
        params: this.$route.params,
    })
    }
  },
  watch:{
    view: {
      handler(name) {
        this.$router.push({
          name,
          params: this.$route.params,
        })
      },
      immediate: true,
    },
  },
  computed:{
    hideOnMainPage(){
     return this.$route.name != 'index' || this.windowTop >=300
    }
  }};
</script>
<style lang="scss">
td {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.tablecolumndesc {
  min-width: 500px;
  max-width: 500px;
  text-overflow: ellipsis;
  overflow: hidden;
}

.ontop {
  z-index: 401!important;
}

.logocaption {
  color: black;
  font-size: 0;
}

.barlogo {
  height: 53px;
  top: 2px;
  position: relative;
}
</style>
