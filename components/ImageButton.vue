<template>
  <v-btn
    :to="to"
    class="navigation-btn"
    @click="$emit('click')"
  >
    <v-icon v-if="icon" class="btn-icon mb-3" size="140">
      {{ icon }}
    </v-icon>
    <div style="height: 100%; width: 100%" class="d-flex align-end justify-end">
      <p class="d-flex align-start  text-subtitle-1">
        <slot />
      </p>
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
  min-height: 80px;

}

.btn-icon{
  left: 3%;
  position: absolute;

  opacity: 30% !important;
  width: 130px;
  transition: all 100ms linear;
}
.navigation-btn >>> .v-btn__content {
  position: relative;
  max-width: 350px;
  height: 100%;
}

.navigation-btn:hover .btn-icon{
  opacity: 50% !important;
}

.navigation-btn:hover {
  transform: scale(1.05);
  background-color: rgba(255, 255, 255, 1) !important;
}


</style>
