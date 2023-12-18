export default {
  computed: {
    filteredBaseItems: function () {
      const items = this.items;
      const query = this.$route.query;
      const view_classes = query?.view_classes;

      let searchValue = getSearchValue(query);

      if(searchValue && searchValue.length > 0) {
        return items.filter(item => {
          const inTitle = item.features[0].properties.title.toLowerCase().includes(searchValue.toLowerCase());
          const inDescription = item.features[0].descriptions.find(desc => {
            return desc?.value?.toLowerCase().includes(searchValue.toLowerCase())}) !== undefined;
          return inTitle || inDescription;
        });
      }

      // console.log('view_classes', view_classes);
      // if (view_classes) {
      //   return items.filter(item => {
      //     for (const systemClass of view_classes) {
      //       if (item.features[0].systemClass === systemClass) return true;
      //     }
      //     return false;
      //   });
      // }
      
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
    return parsedSearch[0].entityName[0].values[0];
  } else {
    return JSON.parse(search).entityName[0].values[0];
  }
}
