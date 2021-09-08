<template>
  <div>
    <v-img
      col
      :height="$vuetify.breakpoint.xs ? '98vh' : '100%'"
      min-height="30vh"
      style="background: linear-gradient(to bottom, #727076 0%, #dbdad8 100%);"
      :src="$vuetify.breakpoint.xs ? '' : '/header.png'"
    >
      <v-row no-gutters style="height: 100%; ">
        <v-col
          cols="12"
          sm="6"
          class="d-flex align-center align-sm-start justify-center justify-sm-end "
        >
          <div
            class="image-header text-h3 text-center pa-2 mt-10 hidden-sm-and-up"
          >
            Shahi Kingdom
          </div>
        </v-col>
        <v-col cols="12" sm="6" class="pa-md-5 d-flex align-start align-sm-center justify-center ">
          <v-row no-gutters style="max-width: 700px" class="ma-5">
            <v-col cols="12">
              <v-btn
                to="/"
                class="navigation-btn mb-2"
                :min-height="$vuetify.breakpoint.smAndDown ? 70 : 100"
              >
                <v-icon>
                  mdi-map
                </v-icon>

                <div>
                  Map
                </div>
              </v-btn>
            </v-col>
            <v-col
              v-for="(item, index) in items"
              :key="index"
              cols="12"
              sm="6"
            >
              <v-btn
                v-bind="size"
                :min-height="$vuetify.breakpoint.smAndDown ? 70 : 100"
                :to="item.target"
                class="navigation-btn my-2"
              >
                <v-icon v-bind="size">
                  {{ item.icon }}
                </v-icon>

                <div>
                  {{ item.text }}
                </div>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-img>
  </div>
</template>

<script>
export default {
  name: 'ImageNavigation',
  data() {
    return {
      items: [
        {
          text: 'Stationary Structures',
          icon: '$artifact',
          target: {
            name: 'list-q',
            query: {
              codes: 'artifact',
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
              codes: 'artifact',
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
              codes: 'artifact',
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
              codes: 'artifact',
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

.navigation-btn {
  width: -moz-calc(100% - 20px);
  width: -webkit-calc(100% - 20px);
  width: calc(100% - 20px);
  margin: 0 10px;
  min-height: 50px;
  background-color: rgba(255, 255, 255, 0.5) !important;
  transition: all 100ms linear;
}

.navigation-btn >>> .v-btn__content {
  display: flex;
  flex-direction: column;
}

.navigation-btn:hover {
  transform: scale(1.05);
  background-color: rgba(255, 255, 255, 1) !important;
}

</style>
