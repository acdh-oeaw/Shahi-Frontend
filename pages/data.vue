<template>
  <div>
    <div class="elevation-1 d-flex align-center justify-space-between  nav secondary lighten-1">
      <div>
        <div
          class="text-caption d-inline-block navigation-item"
          v-for="(item,index) in items"
          :key="index"
          @click="clicked(item)"
        >
          {{ item.text }}
        </div>
        <div
          class="text-caption d-inline-block navigation-item ml-15"

          @click="toFavs"
        >
          Favorites
        </div>
      </div>
      <div class="blue">
        <view-toggler class="float-right"></view-toggler>
      </div>
    </div>

    <nuxt-child></nuxt-child>
  </div>
</template>

<script>
import favorites from "@/mixins/favorites";

export default {
  name: "data.vue",
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
}
</script>

<style scoped>
.nav {
  position: sticky;
  top: 64px;
  z-index: 500;

}
.navigation-item{
  height: 100%;
  font-size: 14px !important;
  padding: 13px 3px;
  margin: 0 7px;
  cursor: pointer;
  transition: all  ease 100ms;
}
.navigation-item:hover{
  background-color: rgba(0,0,0,0.1);
}
</style>
