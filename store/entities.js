
export const state = () => ({
  entities: {},
});

export const getters = {
  getEntities: (s) => s.entities
}
export const mutations ={
  addEntity(state, id, value){
    console.log('added')
    state.entities[id] = value;
    console.log(state)

  },
}
export const actions ={
  addEntity({ commit },id, value){
    commit('addEntity', id, value);
  },

}
