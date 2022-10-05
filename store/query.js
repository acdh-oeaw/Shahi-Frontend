export const state = () => ({
  filters: [],
  codes: ['artifact', 'place'],
  entities:[],
});
export const getters = {
  getFiltersFlat: (s) => s.filters.flatMap((x) => x.items),
  getFilters: (s) => s.filters,
  getCurrentSystemClass: (s) => Array.isArray(s.codes) ? 'wide' : s.codes,
  getQuery: (s) => {
    const query = {
      view_classes: s.codes,
      search: [],
      filter: [],
    };
    let filtergroup = [[]];
    s.filters.forEach((box) => {
      if (box.logicalOperator === 'OR') filtergroup = [...filtergroup, [box]];
      else filtergroup[filtergroup.length - 1].push(box);
    });

    filtergroup.forEach((search) => {
      if (search && search.length > 0) {
        const searchers = [{ typeName: 'type', filterCategory: 'typeIDWithSubs', valueProperty: 'id' },
          { typeName: 'name', filterCategory: 'entityName', valueProperty: 'value' },
          { typeName: 'begin', filterCategory: 'beginFrom', valueProperty: 'value' },
          { typeName: 'end', filterCategory: 'endFrom', valueProperty: 'value' },
          { typeName: 'description', filterCategory: 'entityDescription', valueProperty: 'value' }];

        const operators = [];
        searchers.forEach((searcher) => {
          const filters = search.map((x) => ({
            ...x,
            items: x.items.filter((y) => y.type === searcher.typeName),
          })).filter((x) => x.items.length > 0);
          if (filters && filters.length > 0) {
            let searchString = `"${searcher.filterCategory}":[`;
            if (searcher.valueProperty === 'id') searchString += filters.map((x) => `{"operator":"equal","logicalOperator":"${x.logicalOperatorInside.toLowerCase()}","values":[${x.items.map((y) => y.id).join(',')}]}`).join(',');
            else searchString += filters.map((x) => `{"operator":"${x.items?.[0]?.operator}","logicalOperator":"${x.logicalOperatorInside.toLowerCase()}","values":[${x.items.map((y) => `"${y.value}"`).join(',')}]}`).join(',');
            searchString += ']';

            if (!searchString.includes('[]')) operators.push(searchString);
          }
        });
        if (operators.length > 0) query.search = [...query.search, `{${operators.join(',')}}`];
      }
    });
    return query;
  },
};
export const mutations = {

  setSearch(state, value) {
    state.filters = [{
      items: value, id: 2, logicalOperator: 'AND', logicalOperatorInside: 'OR',
    }];
  },
  setFilters(state, value) {
    state.filters = value;
  },
  setCodes(state, value) {
    state.codes = value;
  },
  setEntities(state, value) {
    state.entities = value;
  },
  removeFilter(state, id) {
    state.filters = state.filters.map((x) => ({ ...x, items: x.items.filter((y) => y.id !== id) }));
  },

};
export const actions = {

  setSearch({ commit }, value) {
    commit('setSearch', value);
  },
  searchByFilterId({ commit, rootGetters }, id) {
    const allFilters = rootGetters['app/getCurrentFiltersFlat'];

    const foundFilter = allFilters.find((x) => x.id === id);
    commit('setSearch', foundFilter ? [{
      id: foundFilter.id, en: foundFilter.en, value: foundFilter.value, type: foundFilter.type,
    }] : []);
  },
  setFilters({ commit }, value) {
    commit('setFilters', value);
  },
  setCodes({ commit }, value) {
    //commit('app/setSelectedFilterClass', value, { root: true });
    commit('setCodes', value);
  },
  updateFiltersFromUrl({ commit, rootGetters }, q) {
    if (q?.view_classes) commit('setCodes', q?.view_classes);
    //commit('app/setSelectedFilterClass', q?.view_classes, { root: true });
    if (q.search) {
      const getFilterDetailsFromID = (id) => {
        const allFilters = rootGetters['app/getCurrentFiltersFlat'];
        const filterDetail = allFilters.find((x) => x.id == id);
        return {
          id,
          en: filterDetail?.en,
          type: filterDetail?.type,
          value: true,
        };
      };

      const getFiltersfromSearchString = ((searchString) => {
        if (!Array.isArray(searchString)) searchString = [searchString];
        let searchArray = [];
        searchString.forEach((searchParamater) => {
          const content = (JSON.parse(searchParamater));
          const orBlock = content.typeIDWithSubs.map((typeID) => ({
            items: typeID.values.map((id) => getFilterDetailsFromID(id)),
            logicalOperator: 'AND',
            logicalOperatorInside: typeID.logicalOperator.toUpperCase(),
          }));
          if (orBlock.length > 0) orBlock[0].logicalOperator = 'OR';
          searchArray = [...searchArray, ...orBlock];
        });
        return searchArray;
      });

      const filtersFromURl = getFiltersfromSearchString(q.search);

      commit('setFilters', filtersFromURl);
      commit('setEntities', q.entities);
    }
  },

  removeFilter({ commit }, id) {
    commit('removeFilter', id);
  },
};
