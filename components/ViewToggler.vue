<template>
  <v-fade-transition>
    <div
      v-if="
        ['data-list-q', 'data-map-q', 'data-detaillist-q', 'data-gallery-q'].includes(
          $route.name
        )
      "
    >
      <v-btn-toggle
        v-model="view"
        dense
        class="hidden-sm-and-down d-flex flex-row"
        tile

      >
        <v-btn
          v-for="item in $store.state.app.viewelements"
          :key="item.route"
          :value="item.route"
          class="flex-grow-1"
        >
          {{ item.en }}
        </v-btn>
      </v-btn-toggle>
      <div class="hidden-md-and-up">
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              icon
              v-on="on"
            >
              <v-icon>mdi-view-list</v-icon>
            </v-btn>
          </template>
          <v-btn-toggle
            background-color="secondary"

            v-model="view"
          >
            <v-btn
              color="primary"
              outlined

              v-for="item in $store.state.app.viewelements"
              :key="item.route"
              :value="item.route"
            >
              {{ item.en }}
            </v-btn>
          </v-btn-toggle>
        </v-menu>
      </div>
    </div>
  </v-fade-transition>
</template>

<script>
export default {
  name: 'ViewToggler',
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
    '$route.path': {
      handler(s) {
        if (s) {
          const view = `${s.slice(1)}-q`;
          if (this.$store.state.app.viewelements.map((x) => x.route).includes(view)) {
            this.view = view;
          }
        }
      },
      deep: true,
      immediate: true,
    },
  },

};
</script>

<style scoped>

</style>
