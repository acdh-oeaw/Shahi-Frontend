export default {
  computed: {
    filteredBaseItems: function () {
      let items = this.items;
      const query = this.$route.query;
      const view_classes = query?.view_classes;

      // let searchValue = getSearchValuesForType(query, 'entityName')[0];
      let searchValue = getSearchValue(query);

      if(searchValue && searchValue.length > 0) {
        items = items.filter(item => {
          const inTitle = item.features[0].properties.title.toLowerCase().includes(searchValue.toLowerCase());
          const inDescription = item.features[0].descriptions.find(desc => {
            return desc?.value?.toLowerCase().includes(searchValue.toLowerCase())}) !== undefined;
          return inTitle || inDescription;
        });
      }

      if (view_classes) {
        items = items.filter(item => {
          return view_classes.includes(item.features[0].systemClass);
        });
      }
      
      return items;
    },
  }
}


/**
 * Parses the search query parameter to extract the search value.
 *
 * The search query can be a string or array. This normalizes it to always
 * return a string search value.
 *
 * @param {Object} query - The route query parameters object
 * @returns {string} The extracted search value
 */
function getSearchValue(query) {
  const search = query?.search;
  if (!search) return "";

  if (Array.isArray(search)) {
    if(search.length < 1) return "";
    const parsedSearch = search.map(s => {
      return JSON.parse(s)});
    return parsedSearch[0].entityName?.[0].values[0] ?? '';
  } else {
    return JSON.parse(search).entityName?.[0].values[0] ?? '';
  }
}

function getSearchValuesForType(query, type) {
  const search = query?.search;
  if (!search) return [];

  if (Array.isArray(search)) { 
    if(search.length < 1) return [];
    const parsedSearch = search.map(s => JSON.parse(s));

    const filteredSearches = parsedSearch.filter(s => s[type] !== undefined);
    console.log(filteredSearches);
    const searchValues = filteredSearches.reduce((pre, curr) => {
      console.log('curr', curr);
      console.log('pre', pre);
      const currValues = curr[type][0].values;
      console.log('currValues', currValues);
      if(Array.isArray(pre)){
        const combined = pre.concat(currValues);
        console.log('combined', combined);
        return combined
      }
      return currValues;
    });
    console.log(searchValues);
    return searchValues;

  } 

  return JSON.parse(search)[type]?.[0].values?? [];
}

const searchers = [
  { typeName: 'type', filterCategory: 'typeIDWithSubs', valueProperty: 'id' },
  { typeName: 'name', filterCategory: 'entityName', valueProperty: 'value' },
  { typeName: 'begin', filterCategory: 'beginFrom', valueProperty: 'value' },
  { typeName: 'end', filterCategory: 'endFrom', valueProperty: 'value' },
  { typeName: 'description', filterCategory: 'entityDescription', valueProperty: 'value' }
];
