
export const state = () => ({
  geoItems: [],
  loaded:false

});

export const getters = {
  isAlreadyLoaded: (s) => s.loaded,
  getGeoData: (s) => s.geoItems
}
export const mutations ={
  setItems(state,value){
    state.geoItems = value;
  },
  setStored(state,value){
    state.loaded = value;
  }
}
export const actions ={
  saveGeoItems({ commit },value){
    commit('setItems', value);
    commit('setStored', true);
  },

}
