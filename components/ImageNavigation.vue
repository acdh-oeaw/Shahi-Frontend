<template>
  <v-img
    :height="$vuetify.breakpoint.xs ? '50vh' : '100%'"
    style="background: linear-gradient(to bottom, #727076 0%, #dbdad8 100%);"
    :src="$vuetify.breakpoint.xs ? '' : '/header.png'"
    class="block"
  >
    <div :class="{'navigation-btns': $vuetify.breakpoint.smAndUp}">
      <v-row
        no-gutters
        class="d-flex justify-center"
      >
        <v-col
          cols="12"
          class="d-flex align-center align-sm-start justify-center justify-sm-end "
        >
          <div
            class="image-header text-h3 text-center pa-2 mt-10 hidden-sm-and-up"
          >
            <p class="text-h3">
              Shahi Kingdoms Database
            </p>
          </div>
        </v-col>
        <v-col cols="12" sm="6">
          <ImageButton to="/data/map?view_classes=place&view_classes=artifact" icon="mdi-map-marker">
            Explore the Map
          </ImageButton>
        </v-col>
        <v-col cols="12" sm="6">
          <ImageButton to="/data/list?view_classes=artifact&view_classes=place" icon="$artifact">
            Search the Database
          </ImageButton>
        </v-col>
      </v-row>
    </div>
  </v-img>
</template>

<script>
import ImageButton from '@/components/ImageButton';

export default {
  name: 'ImageNavigation',
  components: { ImageButton },
  data() {
    return {
      items: [
        {
          text: 'Stationary Structures',
          icon: '$artifact',
          target: {
            name: 'list-q',
            query: {
              view_classes: 'artifact',
              type_id: [1095],
            },
          },
        },
        {
          text: 'Movable Objects',
          icon: '$artifact',
          target: {
            name: 'detaillist-q',
            query: {
              view_classes: 'artifact',
              type_id: [109],
            },
          },
        },
        {
          text: 'Coins',
          icon: '$artifact',
          target: {
            name: 'detaillist-q',
            query: {
              view_classes: 'artifact',
              type_id: [108],
            },
          },
        },
        {
          text: 'Inscriptions',
          icon: '$artifact',
          target: {
            name: 'detaillist-q',
            query: {
              view_classes: 'artifact',
              type_id: [108],
            },
          },
        },
      ],
    };
  },
  computed: {
    size() {
      const size = {
        xs: 'small', sm: 'small', lg: 'large', xl: 'x-large',
      }[this.$vuetify.breakpoint.name];
      return size ? { [size]: true } : {};
    },
  },
};
</script>

<style scoped>

.navigation-btns {
  max-width: 600px;
  position: absolute;
  bottom: 6vw;
  right: 0;
  left: 0;
  display: block;
  margin: 0 auto;

}
.block{
  display: block;
  width: 100%;
}
</style>
