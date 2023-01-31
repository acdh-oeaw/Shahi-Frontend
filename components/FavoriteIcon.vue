<template>
  <div>
    <v-btn
      v-if="!active"
      icon
      @click.prevent="add"
      :style="`z-index: ${zIndex}`"
    >
      <v-icon>mdi-star</v-icon>
    </v-btn>
    <v-btn v-else icon :style="`z-index: ${zIndex}`" @click.prevent="remove">
      <v-icon color="yellow darken-3">
        mdi-star
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import favorites from '@/mixins/favorites';

export default {
  name: 'FavoriteIcon',
  mixins: [favorites],
  props: {
    id: {
      default: 0,
    },
    zIndex:{
      default:0,
    }
  },
  data() {
    return {
      active: false,
    };
  },
  methods: {
    remove() {
      this.active = false;
      this.removeArtifact(this.id);
    },
    add() {
      this.active = true;
      this.addArtifact(this.id);
    },
  },
  watch:{
    id:{
      handler(){ this.active =  false},
      immediate: true,
    }
  }
};
</script>

<style scoped>

</style>
