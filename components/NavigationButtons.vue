<template>
  <div class="nav elevation-1 grey lighten-3">
    <v-btn
      v-for="(item,index) in items"
      :key="index"
      text
      @click="clicked(item)"
    >
      {{ item.text }}
    </v-btn>
    <v-btn
      text
      class="float-md-right"
      @click="toFavs"
    >
      Favorites
    </v-btn>
  </div>
</template>

<script>
import favorites from '@/mixins/favorites';

export default {
  name: 'NavigationButtons',
  mixins: [favorites],
  data() {
    return {
      items: this.$store.state.app.menuitems,
    };
  },
  methods: {
    clicked(item) {
      this.$router.push(
        {
          name: this.$route.name,
          query: item.target.query,
        },
      );
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
};
</script>

<style scoped>
.nav {
  position: sticky;
  top: 65px;
  z-index: 10;

}
</style>
