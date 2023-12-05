export default {
  computed: {
    filteredBaseItems: function () {
      const items = this.items;
      const query = this.$route.query;
      console.log('query', query);
      const view_classes = query?.view_classes;

      console.log('view_classes', view_classes);
      if (view_classes) {
        return items.filter(item => {
          for (const systemClass of view_classes) {
            if (item.features[0].systemClass === systemClass) return true;
          }
          return false;
        });
      }
      else return items;
    },
  }
}
