import menuitems from '../assets/menuqueries.json';
import classes from '../assets/classes.json';
import tableheaders from '../assets/tableheaders.json';
import templateprops from '../assets/templateprops.json';
import filterelements from '../assets/filterElements.json';

/* eslint-disable no-param-reassign,no-shadow */
export const state = () => ({
  siteName: '',
  queryDrawer: false,
  menuitems,
  classes,
  tableheaders,
  templateprops,
  filterelements,
});

export const getters = {
  getSystemClassForFilter: (s) => s.filterelements.find((item) => item.selected === true).systemClass,
  getFilterList: (s) => {
    let filterList = [];
    s.filterelements.find((item) => item.selected === true).items.forEach((group) => {
      group.values.forEach((filter) => {
        if (filter.value) {
          filterList.push(`${filter.concatOperator}|${filter.id}|${filter.logicalOperator}|${filter.value}`);
        }
      });
    });
    console.log(filterList);
    return filterList;
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
    selectedClass,
    selectedProperty,
    value,
  }) {
    const key = Object.keys(value)[0];
    const vals = state.filterelements[selectedClass].items[selectedProperty].values;
    vals.filter((x) => x.id === key)[0].value = value[key];
  },
  setSelectedFilterClass(state,name){
    state.filterelements.forEach( (c) =>{
      
      if(c.en === name)
        c.selected = true;
      else
        c.selected = false;
    } )
  }
};

export const actions = {};
