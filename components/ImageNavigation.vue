<template>
  <v-img
    :height="$vuetify.breakpoint.xs ? '50vh' : '100%'"
    style="background: linear-gradient(to bottom, #727076 0%, #dbdad8 100%);"
    :src="$vuetify.breakpoint.mdAndUp ? '/header.jpg' : ''"
    class="d-flex align-center"
  >
    <div style="max-width: 700px" class="ma-auto">
    <p class="text-center mb-1" :class="title"  style="color: #423f35" >Cultural Formation and Transformation:
    </p>
    <p class="title-3 text-center mt-0" style="font-size: 1.6em"> Art and Architecture from Afghanistan to the West Tibetan Frontier at the Dawn of the Islamic Era
    </p>
    <div :class="{'navigation-btns': $vuetify.breakpoint.smAndUp}">
      <v-row
        no-gutters
        class="d-flex justify-center mt-15"
      >

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
        <v-col cols="12" sm="4">
          <ImageButton to="/collections" style="min-height: 50px">
            Collections
          </ImageButton>
        </v-col>
        <v-col cols="12" sm="4">
          <ImageButton to="/sourcebook" style="min-height: 50px">
            Sourcebook
          </ImageButton>
        </v-col>
        <v-col cols="12" sm="4">
          <ImageButton href="https://shahi.pubpub.org/" style="min-height: 50px" target="_blank">
            Publications
          </ImageButton>
        </v-col>
      </v-row>
    </div>
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
    title() {
      const size = {
        xs: 'title-2', sm: 'title-2', md: 'title-2', lg: 'title-1', xl: 'title-1',
      }[this.$vuetify.breakpoint.name];
      return size ? { [size]: true } : {};
    },
  },
};
</script>

<style scoped>


.block{
}
</style>
