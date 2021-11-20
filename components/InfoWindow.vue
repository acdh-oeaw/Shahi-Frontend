<template>
  <v-scroll-y-transition>
    <div v-if="visible" class="elevation-3 infowindow secondary text-center" :style="cssVars">
      <span class="text-body-1">{{ message }}</span>
    </div>
  </v-scroll-y-transition>
</template>

<script>
export default {
  name: 'InfoWindow',
  props: ['target', 'message'],
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    cssVars() {
      const element = document.querySelector(this.target);
      const rect = element.getBoundingClientRect();

      return {
        '--left': `${rect.right}px`,
        '--right': `${rect.left}px`,
        '--y': `${rect.bottom}px`,
      };
    }
    ,
  },
  mounted() {

  },
  methods: {
    show() {
      this.visible = true;
    },

    hide() {
      this.visible = false;
    },
  }
  ,
};
</script>

<style scoped>
.infowindow {
  position: fixed;
  padding: 15px;
  width: 200px;
  left: calc(var(--left) + var(--right) - var(--left) - 91px);
  background-color: grey;
  top: calc(var(--y) + 15px);
  border-radius: 5px;

}

.infowindow:before {
  content: "";
  width: 0px;
  height: 0px;
  position: absolute;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #b7bf96;
  border-top: 10px solid transparent;
  right: calc(50% - 14px);
  top: -20px;
}
</style>
