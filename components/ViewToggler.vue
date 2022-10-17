<template>

      <v-btn-toggle
        v-model="view"
        dense
        class="hidden-sm-and-down d-flex flex-row"
        tile
        dark

      >
        <v-btn
          v-for="item in $store.state.app.viewelements"
          :key="item.route"
          :value="item.route"
          class="flex-grow-1"
        >
          {{ item.en }}
        </v-btn>
      </v-btn-toggle>

</template>

<script>
export default {
  name: 'ViewToggler',
  props: ['value'],
  data() {
    return {
      view: 'list',
    };
  },
  mounted(){
    this.view = this.value || this.view;
  },
  watch: {
    view: {
      handler(name) {
        this.$emit('input',name)

      },
      immediate: true,
    },
    '$route.path': {
      handler(s) {
        if (s) {
          const view = `${s.slice(1)}-q`;
          if (this.$store.state.app.viewelements.map((x) => x.route).includes(view)) {
            this.view = view;
          }
        }
      },
      deep: true,
      immediate: true,
    },
  },

};
</script>

<style scoped>

</style>
