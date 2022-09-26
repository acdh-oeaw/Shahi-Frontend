import Vue from 'vue';
import VueCookie from 'vue-cookie';

Vue.use(VueCookie);
export default {
  methods: {
    addArtifact(id) {
      const currentFavs = localStorage.getItem('fav');

      if (currentFavs === null || currentFavs === '[]') localStorage.setItem('fav', `[${id}]`);
      else localStorage.setItem('fav', `${currentFavs.slice(0, -1)},${id}]`);
    },
    removeArtifact(id) {
      const currentFavs = localStorage.getItem('fav');

      if (currentFavs !== null) localStorage.setItem('fav', JSON.stringify(JSON.parse(currentFavs)?.filter((x) => x !== parseInt(id, 10))));
    },
    isInFavs(id) {
      const currentFavs = localStorage.getItem('fav');
      return JSON.parse(currentFavs)?.includes(parseInt(id, 10));
    },
    getFavorites() {
      const currentFavs = localStorage.getItem('fav');
      return JSON.parse(currentFavs);
    },
  },
};
