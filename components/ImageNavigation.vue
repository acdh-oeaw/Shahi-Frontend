<template>
  <div>
    <v-img
      :height="$vuetify.breakpoint.xs ? '98vh' : '100%'"
      min-height="30vh"
      style="background: linear-gradient(to bottom, #727076 0%, #dbdad8 100%);"
      :src="$vuetify.breakpoint.xs ? '' : '/header.png'"
    >
      <v-row
        no-gutters
        class="d-flex justify-center"
        :class="{'navigation-btns': $vuetify.breakpoint.smAndUp}"
      >
        <v-col
          cols="12"
          sm="6"
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
        <v-col cols="12">
          <v-btn
            to="/"
            class="navigation-btn text-body-1"
          >
            <v-img class="btn-icon" src="http://simpleicon.com/wp-content/uploads/map-marker-1.png" />

            <p class="ma-0 pa-0">
              Discover Shahi Kingdoms
            </p>
          </v-btn>
        </v-col>

        <v-col cols="12" sm="6">
          <v-btn class="navigation-btn text-body-1" to="/list?codes=artifact">
            <v-img class="btn-icon" src="https://static.thenounproject.com/png/3156130-200.png" />
            <p class="ma-0 pa-0">
              Enter Database
            </p>
          </v-btn>
        </v-col>
        <v-col cols="12" sm="6">
          <v-btn class="navigation-btn text-body-1" to="/list?codes=artifact">
            <v-icon class="btn-icon mb-3" size="140">
              mdi-account-group
            </v-icon>
            <p class="ma-0 pa-0">
              Meet the Team
            </p>
          </v-btn>
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

  opacity: 30%;
  width: 130px;
  transition: all 100ms linear;
}

.navigation-btn p{
  position: absolute;

  bottom: 15px;
  right: 0;
}
.navigation-btn:hover .btn-icon{
  opacity: 50%;
}

.navigation-btn:hover {
  transform: scale(1.05);
  background-color: rgba(255, 255, 255, 1) !important;
}

.navigation-btns{
  max-width: 600px;
  position: absolute;
  bottom: 4vw;
  right: 0;
  left: 0;
  margin: auto;
}

.navigation-btn >>> .v-btn__content {
  position: relative;
  max-width: 350px;
  height: 100%;

}

</style>
