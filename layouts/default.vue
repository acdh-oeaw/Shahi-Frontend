<template>
  <v-app light>
    <v-navigation-drawer

      v-model="$store.state.app.queryDrawer"
      class="ontop"
      :disable-resize-watcher="true"
      clipped
      app
      color="grey lighten-4"
    >
      <v-list dense class="grey lighten-4">
        <v-list-item
          :to="{
            'name': $route.name.startsWith('data-') ? $route.name : 'data-list-q',
            'query': {
              'entities': getFavorites()
            }}"
          @click="$store.commit('app/closeQueryDrawer')"
        >
          <v-list-item-action>
            <v-icon>mdi-star</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="grey--text">
              Favorites
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <template v-for="(item, i) in items">
          <v-row v-if="item.heading" :key="i" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col cols="6" class="text-right" />
          </v-row>
          <v-divider v-else-if="item.divider" :key="i" dark class="my-4" />

          <v-list-item
            v-else
            :key="i"
            link
            @click="clickOnItem(item)"
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
      <v-app-bar app clipped-left style="z-index:9999">
        <v-app-bar-nav-icon @click="$store.commit('app/toggleQueryDrawer')" />
        <nuxt-link to="/" @click="$store.commit('app/closeQueryDrawer')">
          <div class="logocaption d-none d-md-flex">
            <img
              class="barlogo ml-1 mr-1"
              alt="logo"
              src="/ShahiDatabase_logo.png"
            >
          </div>
        </nuxt-link>

        <querysearch />
        <v-spacer />

        <nuxt-link class="nav-link mr-5" to="/collections">
        <v-icon v-if="$vuetify.breakpoint.smAndDown" >$artifact</v-icon>
          <span v-else>Collections</span>
        </nuxt-link>
        <nuxt-link class="nav-link mr-5" to="/sourcebook">
        <v-icon v-if="$vuetify.breakpoint.smAndDown" color="black">mdi-book-open-variant</v-icon>

         <span v-else>Sourcebook</span>
        </nuxt-link>
        <nuxt-link class="nav-link mr-5" to="/bibliography">
        <v-icon v-if="$vuetify.breakpoint.smAndDown" color="black">mdi-file-find</v-icon>

          <span v-else>Bibliography</span>
        </nuxt-link>
        <nuxt-link class="nav-link" to="/team">
          <v-icon v-if="$vuetify.breakpoint.smAndDown" color="black">mdi-account-group</v-icon>

          <span v-else> Team</span>
        </nuxt-link>
      </v-app-bar>
    </v-expand-transition>
    <v-main>
      <nuxt />
    </v-main>
    <div class="grey lighten-3 ">
      <div style="max-width: 1600px" class="ma-auto">
        <v-row no-gutters class="mx-2 mt-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-message-circle"
          >
            <path
              d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
            />
          </svg>
          Contact
        </v-row>
        <v-divider class="my-3" />
        <v-row class="mx-2">
          <v-col
            cols="12"
            sm="3"
          >
            <a href="https://www.oeaw.ac.at/acdh/acdh-ch-home" target="_blank">
              <img
                src="https://fundament.acdh.oeaw.ac.at/common-assets/images/acdh_logo.svg"
                class="image"
                alt="ACDH Logo"
                style="max-width: 100%; height: auto"
                title="ACDH Logo"
              ></a>
          </v-col>
          <v-col cols="12" sm="6">
            <div>
              <p>
                ACDH-CH
                <br>
                Austrian Centre for Digital Humanities <br>
                and Cultural Heritage
                <br>
                Austrian Academy of Sciences
              </p>
              <p>
                Sonnenfelsgasse 19,
                <br>
                1010 Vienna
              </p>
              <p>
                T: +43 1 51581-2200
                <br>
                E: <a href="mailto:acdh@oeaw.ac.at">acdh@oeaw.ac.at</a>
              </p>
            </div>
          </v-col>
          <v-col cols="12" sm="3">
            <div class="textwidget custom-html-widget">
              <h6>HELPDESK</h6>
              <p>
                ACDH-CH runs a helpdesk offering advice for questions related to
                various digital humanities topics.
              </p>
              <p>
                <a
                  class="helpdesk-button"
                  href="mailto:acdh-helpdesk@oeaw.ac.at"
                >ASK US!</a>
              </p>
            </div>
          </v-col>
        </v-row>
        <v-divider class="my-3" />
        <v-row no-gutters>
          <v-col cols="12" class="text-center">
            <a href="https://www.univie.ac.at/" target="_blank">

              <img
                class="footerlogo mr-2 ml-2"
                alt="university_vienna_logo"
                src="/UniVienna_logo.png"
              ></a>
            <a href="https://www.oeaw.ac.at/oesterreichische-akademie-der-wissenschaften" target="_blank">

              <img
                class="footerlogo ml-2 mr-2"
                alt="ÖAW logo"
                src="/Oeaw_logo.png"
              ></a>

            <a href="https://www.fwf.ac.at/" target="_blank">

              <img
                class="footerlogo ml-2 mr-2"
                alt="FWF logo"
                src="/Fwf_logo.gif"
              ></a>
            <a href="https://www.khm.at/" target="_blank">

              <img
                class="footerlogo ml-2 mr-2"
                alt="Kunst Historisches Museum logo"
                src="/Khm_logo.png"
              ></a>
            <a href="https://www.univie.ac.at/cirdis/8-cirdis" target="_blank">
              <img
                class="footerlogo ml-2 mr-2"
                alt="Cirdis logo"
                src="/Cirdis_logo.png"
              ></a>
          </v-col>
        </v-row>
        <v-divider class="my-3" />

        <div class="text-center text-caption">
          © Copyright OEAW |
          <nuxt-link to="/imprint">
            Impressum/Imprint
          </nuxt-link>
        </div>
      </div>
    </div>
  </v-app>
</template>
<script>
import favorites from '@/mixins/favorites';
import { mapActions, mapGetters } from 'vuex';
import querysearch from '~/components/querysearch.vue';

export default {
  components: {
    querysearch,
  },
  mixins: [favorites],
  data() {
    return {
      drawer: false,
      items: [{ heading: 'Sample Queries' }].concat(
        this.$store.state.app.menuitems,
      ),
      title: '',
      windowTop: 0,
    };
  },
  computed: {
    ...mapGetters('query', ['getQuery']),
    hideOnMainPage() {
      return this.$route.name != 'index' || this.windowTop >= 300;
    },
  },
  async mounted() {
    const content = await this.$api.Content.get_api_0_3_content_({});
    this.$store.commit('app/setSiteName', content.body['site-name']);
    this.title = content.body['site-name'];
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    ...mapActions({
      searchByFilterId: 'query/searchByFilterId',
      setCodes: 'query/setCodes'
    }),
    onScroll(e) {
      this.windowTop = window.top.scrollY; /* or: e.target.documentElement.scrollTop */
    },
    clickOnItem(item) {
      this.$store.commit('app/closeQueryDrawer');
      this.$store.commit('app/setSelectedFilterClass', item.systemClass);
      this.setCodes(item.systemClass);
      this.searchByFilterId(item.id);
      let name = 'data-list-q';
      if (this.$route.name.startsWith('data-')) name = this.$route.name;

      this.$router.push({
        name,
        query: this.getQuery,
      });
      this.open = false;
    },
  },
  head() {
    return { title: this.title };
  },
};
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
  z-index: 401 !important;
}

.logocaption {
  color: black;
  font-size: 0;
}

.barlogo {
  height: 30px;
  top: 2px;
  position: relative;
}

.footerlogo {
  max-height: 53px;
  max-width: 70vw;
  top: 2px;
  position: relative;
}

a.helpdesk-button:hover,
a.helpdesk-button:focus {
  background-color: #88dbdf;
  color: #fff;
  text-decoration: none;
}

a.helpdesk-button {
  display: block;
  background-color: #fff;
  border: 1px solid #88dbdf;
  border-radius: 20px;
  padding: 0.25rem 1.25rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: #88dbdf;
  max-width: 16rem;
  transition: background-color ease 0.2s, color ease 0.2s;
}

.nav-link{
  opacity: 0.8;
  padding:3px;
  transition: 100ms;
}

.nav-link:hover{
  opacity: 1;
}
</style>
