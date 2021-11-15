import menuitems from '../assets/menuqueries.json';
import classes from '../assets/classes.json';
import tableheaders from '../assets/tableheaders.json';
import templateprops from '../assets/templateprops.json';
import filterelements from '../assets/filterElements.json';
import viewelements from '../assets/viewElements.json';
import team from '../assets/team.json';
import bib from '../assets/bib.json';

/* eslint-disable no-param-reassign,no-shadow */
export const state = () => ({
  siteName: '',
  queryDrawer: false,
  menuitems,
  classes,
  tableheaders,
  templateprops,
  filterelements,
  viewelements,
  team,
  bib
});

export const getters = {
  getBibliography: (s) => s.bib,
  getCollections: (s) => s.filterelements[0].items.find(item => item.id === '185'),
  getTypeById: (s) => (id) => s.filterelements[0].items.find(item => item.id === '185').values.find(item => item.id === parseInt(id)),
  getSystemClassForFilter: (s) => s.filterelements.find((item) => item.selected === true).systemClass,
  getCurrentFilters: (s) => s.filterelements.find((item) => item.selected === true),
  getFilterObject: (s) => {
    let filterList = [];
    let typeList = [];
    let filterObject = {};
    const selectedItem = s.filterelements.find((item) => item.selected === true)

    selectedItem.items.forEach((group) => {
      group.values.forEach((filter) => {
        if (filter.value && group.kind === 'filter') {
          filterList.push(`${filter.concatOperator}|${filter.id}|${filter.logicalOperator}|${filter.value}`);
        }
        if (filter.value && group.kind === 'type') {
          typeList.push(`${filter.id}`);
        }
      });
    });
    filterObject.codes = selectedItem.systemClass;
    filterObject.type_id = typeList;
    filterObject.filter = filterList;
    return filterObject;
  },
  getIconBySystemClass: (s) => (c) => s.classes.find((item) => item.systemClass === c).icon,
  getLabelBySystemClass: (s) => ({
    c,
    l,
  }) => s.classes.find((item) => item.systemClass === c)[l],
  getCRMClassBySystemClass: (s) => (c) => s.classes.find((item) => item.systemClass === c).crmClass,
  getTypesBySystemClass: (s) => (c) => s.classes.find((item) => item.systemClass === c).types,
  getSortColumnByPath: (s) => (p) => {
    let h = s.tableheaders.wide.find((h) => h.value === p);
    if (h && h.column) return h.column;
    h = s.tableheaders.narrow.find((h) => h.value === p);
    if (h && h.column) return h.column;
    return null;
  },
  hasTime: (s) => (c) => s.templateprops.hasTime.includes(c),
  hasSex: (s) => (c) => s.templateprops.hasSex.includes(c),
};

export const mutations = {
  openQueryDrawer(state) {
    state.queryDrawer = true;
  },
  closeQueryDrawer(state) {
    state.queryDrawer = false;
  },
  toggleQueryDrawer(state) {
    state.queryDrawer = !state.queryDrawer;
  },
  setSiteName(state, name) {
    state.SiteName = name;
  },
  setFilterElements(state, filterelements) {
    state.filterelements = filterelements;
  },
  updateFilterValue(state, {
    selectedProperty,
    value,
  }) {
    const key = Object.keys(value)[0];
    const vals = state.filterelements.find((item) => item.selected === true).items[selectedProperty].values;
    vals.filter((x) => x.id == key)[0].value = value[key];
  },
  setSelectedFilterClass(state,systemClass){
    state.filterelements.forEach( (c) =>{

      if(c.systemClass === systemClass)
        c.selected = true;
      else
        c.selected = false;
    } )
  },
  setFilterElements(state,filterElements){
    state.filterelements =  JSON.parse(
      JSON.stringify(filterElements)
    );
  }
};

export const actions = {};
