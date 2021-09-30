<template>
  <div class="nav elevation-1 grey lighten-3">
    <v-btn
      text
      v-for="(item,index) in items"
      :key="index"
      @click="clicked(item)">
      {{ item.text }}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'NavigationButtons',
  data() {
    return {
      items: this.$store.state.app.menuitems,
    };
  },
  methods: {
    clicked(item) {
      this.$router.push(
        {
          name:this.$route.name,
          query:item.target.query
        }
        )
    }
  }
};
</script>

<style scoped>
.nav{
  position: sticky;
  top: 65px;
  z-index: 10;

}
</style>
