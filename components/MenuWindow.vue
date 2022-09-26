<template>
  <div  class="window sb5 elevation-4">
    <div style="max-height:90vh; overflow:auto" class="pa-5">
      <slot />

    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuWindow',
  computed: {
    width() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return '100vw';
        case 'sm':
          return '100vw';
        case 'md':
          return '80vw';
        case 'lg':
          return '700px';
        case 'xl':
          return '700px';
      }
    },
  },
};
</script>

<style scoped>
.window {
  margin-top: 8px;
  border: 4px solid #b7bf96;
  background-color:white;
  position: relative;

}

.sb5:before {
  content: "";
  width: 0;
  height: 0;
  position: absolute;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #b7bf96;
  border-top: 10px solid transparent;
  right: calc(50%);
  top: -21px;
}

</style>
