<template>
  <v-btn
    :to="to"
    class="navigation-btn"
    @click="$emit('click')"
  >
    <div style="position: relative; width: 100%; height: 100%">
      <div class="btn-icon" v-if="icon">
        <v-icon  size="120">
      {{ icon }}
      </v-icon>
      </div>

      <div style="height: 100%; width: 100%;" class="d-flex align-end justify-end">
        <p class="text-h6 pa-0 ma-0">
          <slot/>
        </p>
      </div>
    </div>
  </v-btn>
</template>

<script>
export default {
  name: 'ImageButton',
  props: ['icon', 'to'],
};
</script>

<style scoped>
.navigation-btn {
  overflow: hidden;
  width: -moz-calc(100% - 20px);
  width: -webkit-calc(100% - 20px);
  width: calc(100% - 20px);
  margin: 10px 10px;
  background-color: rgba(255, 255, 255, 0.5) !important;
  transition: all 100ms linear;
  min-height: 70px;

}

.btn-icon {
  left: 3%;
  position: absolute;
  top: -27px;
  opacity: 0.2 !important;
  width: 130px;
  transition: all 100ms linear;
}

.navigation-btn >>> .v-btn__content {
  position: relative;
  max-width: 350px;
  height: 100%;
}

.navigation-btn:hover .btn-icon {
  opacity: 0.4 !important;
}

.navigation-btn:hover {
  transform: scale(1.05);
  background-color: rgba(255, 255, 255, 1) !important;
}


</style>
