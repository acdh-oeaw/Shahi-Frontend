<template>
  <v-app light>
    <v-expand-transition>
      <v-app-bar app style="z-index:9999" extension-height="40px" elevation="0" height="64px">
        <v-app-bar-nav-icon @click="drawer=true" class="d-md-none"></v-app-bar-nav-icon>
        <div class="d-flex align-center justify-center" style="width: 100%">
          <nuxt-link to="/" @click="$store.commit('app/closeQueryDrawer')" class="mr-auto">
            <div class="logo caption d-none d-md-flex">
              <img
                class="barlogo"
                alt="logo"
                src="/ShahiDatabase_logo.png"
              >
            </div>
          </nuxt-link>
          <querysearch style="max-width: 700px" class="mx-sm-5 "/>
          <div class="ml-auto text-right">
            <nuxt-link class="nav-link mr-md-2 " to="/data/map?view_classes=place&view_classes=artifact">
              <v-icon color="black" v-if="$vuetify.breakpoint.smAndDown">mdi-map</v-icon>
              <span v-else>Map</span>
            </nuxt-link>
            <nuxt-link class="nav-link mr-md-2" to="/collections">
              <v-icon v-if="$vuetify.breakpoint.smAndDown">$artifact</v-icon>
              <span v-else>Collections</span>
            </nuxt-link>
            <nuxt-link class="nav-link mr-md-2" to="/sourcebook">
              <v-icon v-if="$vuetify.breakpoint.smAndDown" color="black">mdi-book-open-variant</v-icon>

              <span v-else>Sourcebook</span>
            </nuxt-link>
            <nuxt-link class="nav-link mr-md-2" to="/bibliography">
              <v-icon v-if="$vuetify.breakpoint.smAndDown" color="black">mdi-file-find</v-icon>

              <span v-else>Bibliography</span>
            </nuxt-link>
            <nuxt-link class="nav-link" to="/team">
              <v-icon v-if="$vuetify.breakpoint.smAndDown" color="black">mdi-account-group</v-icon>

              <span v-else> Team</span>
            </nuxt-link>
          </div>
        </div>
        <!-- <template v-if="$vuetify.breakpoint.mdAndUp" v-slot:extension>
          <div class="d-none d-md-flex flex-wrap align-center  text-overline mx-1" style="width: 100%; overflow: auto">
            <div
              v-for="(item,index) in navBarItems"
              :key="index"
              class="text-caption d-inline-block navigation-item"
              @click="clicked(item)"
            >
              {{ item.text }}
            </div>
            <div
              class="text-caption d-inline-block navigation-item ml-auto"

              @click="toFavs"
            >
              Favorites
            </div>

          </div>
        </template> -->
      </v-app-bar>
    </v-expand-transition>
    <v-main>
      <nuxt/>

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
        <v-divider class="my-3"/>
        <v-row class="mx-2 text-body-1">
          <v-col
            cols="12"
            sm="4"
          >
            <p class="font-weight-bold">Shahi Kingdoms Project</p>

            <p class="text-body-2 mb-2">FWF Stand-alone Project P-31246 “Cultural Formation and Transformation: Shahi
              Art and Architecture from Afghanistan to the West Tibetan Frontier at the Dawn of the Islamic Era”
              (2018-2022)</p>
            <p class="text-body-2 mb-2">FWF Stand-alone Digital Publication Grant PUD 26-G “Shahi Kingdoms Digital
              Publication and Research Platform” (2021-2024)</p>
            <p class="text-body-2 mb-2">Holzhausen-Legat Grant “Creating a Digital Research Platform: Primary Source
              Material for the Shahi Kingdoms” (2021)"</p>

          </v-col>

          <v-col cols="12" sm="4">
            <div>
              <p class="font-weight-bold">
                FWF Shahi Project Team Vienna
              </p>
              <p class="text-body-2">
                Garnisongasse 13,
                <br>
                Univeritätscampus Hof 9,
                <br>
                1090 Vienna
              </p>
              <p class="text-body-2 mb-0">
                <a href="https://shahimaterialculture.univie.ac.at/">https://shahimaterialculture.univie.ac.at/</a>
              </p>
              <p class="text-body-2 mt-0">
                <a href="mailto:fwf.shahi.project@gmail.com">fwf.shahi.project@gmail.com</a>
              </p>
            </div>
          </v-col>
          <v-col cols="12" sm="4">
            <p class="font-weight-bold">
              <nuxt-link to="/team">Shahi Project Team</nuxt-link>
            </p>
            <p class="text-body-2 mb-2">
              <span class="text--secondary d-block">Univ.-Prof. Dr. Deborah Klimburg-Salter</span>
              <a href="mailto:deborah.klimburg-salter@univie.ac.at">deborah.klimburg-salter@univie.ac.at</a></p>
            <p class="text-body-2 mb-2">
              <span class="text--secondary d-block">HR Doz. Dr. Michael Alram</span>
              <a href="mailto:Michael.Alram@oeaw.ac.at">Michael.Alram@oeaw.ac.at</a></p>
            <p class="text-body-2 mb-2">
              <span class="text--secondary d-block">Doz. Mag. Dr. Klaus Vondrovec</span>
              <a href="mailto:Klaus.Vondrovec@khm.at">Klaus.Vondrovec@khm.at</a></p>
            <p class="text-body-2 mb-2">
              <span class="text--secondary d-block">Dr. Natasha Kimmet</span>
              <a href="mailto:natasha.kimmet@univie.ac.at">natasha.kimmet@univie.ac.at</a></p>
            <p class="text-body-2 mb-1">
              <span class="text--secondary d-block">Mag.phil. Gosia Lenko</span>
              <a href="mailto:malgorzata.lenko@univie.ac.at">malgorzata.lenko@univie.ac.at</a></p>
          </v-col>
        </v-row>
        <v-divider class="my-3"/>
        <v-row class="mx-2">
          <v-col
            cols="12"
            sm="4"
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
          <v-col cols="12" sm="4">
            <div>
              <p>
                <span class="font-weight-bold">ACDH-CH</span>
                <br>
                <span class="text-body-2">
                Austrian Centre for Digital Humanities <br>
                and Cultural Heritage
                <br>
                Austrian Academy of Sciences
                </span>
              </p>
              <p class="text-body-2">
                Bäckerstraße 13,
                <br>
                1010 Vienna
              </p>
              <p class="text-body-2">
                T: +43 1 51581-2200
                <br>
                E: <a href="mailto:acdh@oeaw.ac.at">acdh@oeaw.ac.at</a>
              </p>
            </div>
          </v-col>

          <v-col cols="12" sm="4">
            <div class="textwidget custom-html-widget">
              <p class="font-weight-bold text-body-1">HELPDESK</p>
              <p class="text-body-2">
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
        <v-divider class="my-3"/>
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
        <v-divider class="my-3"/>

        <div class="text-center text-caption">
          © Copyright OEAW |
          <nuxt-link to="/imprint">
            Impressum/Imprint
          </nuxt-link>
        </div>
      </div>
    </div>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      app
      temporary
      style="z-index:9999999999"
    >

      <v-list>
        <v-list-item>
          <v-list-item-icon>
              <v-icon @click="drawer=false">mdi-chevron-left</v-icon></v-list-item-icon>
        </v-list-item>

        <v-list-item to="/" class="">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item v-for="(item,index) in navBarItems"
                     :key="index"
                     class="text-caption"
                     @click="clicked(item)">
          <v-list-item-icon>
            <v-icon>mdi-magnify</v-icon>
          </v-list-item-icon>

          <v-list-item-subtitle>{{ item.text }}</v-list-item-subtitle>
        </v-list-item>
        <v-list-item class="text-caption" @click="toFavs">
          <v-list-item-icon>
            <v-icon>mdi-star</v-icon>
          </v-list-item-icon>

          <v-list-item-subtitle>Favorites</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>
<script>
import favorites from '@/mixins/favorites';
import {mapActions, mapGetters} from 'vuex';
import querysearch from '~/components/querysearch.vue';

export default {
  components: {
    querysearch,
  },
  mixins: [favorites],
  async fetch(){
    const content = await this.$api.Content.get_api_0_3_content_({});
    this.$store.commit('app/setSiteName', content.body['site-name']);
    this.title = content.body['site-name'];
  },
  data() {
    return {
      drawer: false,
      navBarItems: this.$store.state.app.menuitems,
      items: [{heading: 'Sample Queries'}].concat(
        this.$store.state.app.menuitems,
      ),
      title: '',
      windowTop: 0,
    };
  },
  computed: {
    ...mapGetters('query', ['getQuery']),
    hideOnMainPage() {
      return this.$route.name !== 'index' || this.windowTop >= 300;
    },
  },
  async mounted() {

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
    onScroll() {
      this.windowTop = window.top.scrollY; /* or: e.target.documentElement.scrollTop */
    },
    clicked(item) {
      this.setCodes(item.query.view_classes);

      //this.searchByFilterId(item.id);
      let name = 'data-list-q';
      if (this.$route.name.startsWith('data-')) name = this.$route.name;
      const search = Array.isArray(item.query.search) ?
        item.query.search.map(x => JSON.stringify(x))
        : JSON.stringify(item.query.search)
      this.$router.push({
        name,
        query: {
          view_classes: item.query.view_classes,
          search,
          page: 1
        },
      });
    },
    toFavs() {
      this.$router.push({
        name: this.$route.name,
        query: {
          entities: this.getFavorites(),
        },
      });
    },
  },
  head() {
    return {title: this.title};
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
  height: 35px;
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


.navigation-item {
  position: relative;
  font-size: 14px !important;
  margin: 0 7px;
  cursor: pointer;
  transition: all ease 100ms;
}

.navigation-item::before {
  position: absolute;
  bottom: 0;
  content: "";
  height: 1px;
  width: 0;
  background: black;
  transition: all ease-in-out 200ms;


}


.nav-link {
  position: relative;
  opacity: 0.8;
  padding: 3px;
}

.nav-link::before {
  position: absolute;
  bottom: 0;
  content: "";
  height: 1px;
  width: 0;
  background: black;
  transition: all ease-in-out 200ms;
}

.nav-link:hover::before {
  position: absolute;
  bottom: 0;
  content: "";
  height: 1px;
  width: 100%;
  background: black;
}

.navigation-item:hover::before {
  position: absolute;
  bottom: 0;
  content: "";
  height: 1px;
  width: 100%;
  background: black;
}

</style>
