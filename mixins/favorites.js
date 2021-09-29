import Vue from 'vue';
import VueCookie from 'vue-cookie';

Vue.use(VueCookie);
export default {
  methods: {
    addArtifact(id) {
      const currentFavs = this.$cookie.get('fav');

      if (currentFavs === null || currentFavs === '[]') this.$cookie.set('fav', `[${id}]`);
      else this.$cookie.set('fav', `${currentFavs.slice(0, -1)},${id}]`);
      console.log(id, currentFavs, this.$cookie.get('fav'));
    },
    removeArtifact(id) {
      const currentFavs = this.$cookie.get('fav');

      if (currentFavs !== null) this.$cookie.set('fav', JSON.stringify(JSON.parse(currentFavs)?.filter((x) => x !== parseInt(id, 10))));
      console.log(currentFavs, this.$cookie.get('fav'));
    },
    isInFavs(id) {
      const currentFavs = this.$cookie.get('fav');

      return JSON.parse(currentFavs)?.includes(parseInt(id, 10));
    },
    getFavorites() {
      const currentFavs = this.$cookie.get('fav');
      return JSON.parse(currentFavs);
    },
  },
};
