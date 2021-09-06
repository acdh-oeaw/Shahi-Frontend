<template>
  <v-fade-transition>
    <div v-if="
              ['list-q', 'map-q', 'detaillist-q', 'gallery-q'].includes(
                $route.name
              )
            ">
      <v-btn-toggle
        class="hidden-xs-only"

        v-model="view"
      >
        <v-btn
          v-for="item in $store.state.app.viewelements"
          :key="item.route"
          :value="item.route"
        >{{ item.en }}
        </v-btn
        >
      </v-btn-toggle>
      <v-menu>
        <template v-slot:activator="{ on, attrs }">
          <v-btn

            v-bind="attrs"
            v-on="on"
            icon
          >
            <v-icon>mdi-view-list</v-icon>
          </v-btn>
        </template>
        <v-btn-toggle


          v-model="view"
        >
          <v-btn
            v-for="item in $store.state.app.viewelements"
            :key="item.route"
            :value="item.route"
          >{{ item.en }}
          </v-btn
          >
        </v-btn-toggle>
      </v-menu>
    </div>

  </v-fade-transition>

</template>

<script>
export default {
  name: "ViewToggler",
  data() {
    return {
      view: undefined,
    };
  },
  watch: {
    view: {
      handler(name) {
        this.$router.push({
          name,
          query: this.$route.query,
        });
      },
      immediate: true,
    },
    "$route.path": {
      handler(s) {
        if (s) {
          const view = s.slice(1) + '-q';
          if (this.$store.state.app.viewelements.map(x => x.route).includes(view)) {
            this.view = view;
          }
        }
      },
      deep: true,
      immediate: true,
    },
  }

}
</script>

<style scoped>

</style>
