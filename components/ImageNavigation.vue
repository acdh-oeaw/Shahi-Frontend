<template>
  <div>
    <v-parallax
      height="500"
      src="https://shahimaterialculture.univie.ac.at/fileadmin/_processed_/csm_1__Gilgit_MS_Banner_2ba90c6442.jpg"
    >
      <div class="image-content">
        <div class="image-header text-h2">Shahi Kingdom</div>
        <div class="navigation-btns">
          <v-btn @click="$router.push('')" class="navigation-btn navigation-btn-map">
            <v-icon large>mdi-map</v-icon>

            <div>
              Map
            </div>
          </v-btn>
          <v-btn
            v-for="(item, index) in items"
            :to="item.target"
            :key="index"
            class="navigation-btn"
          >
            <v-icon large>{{ item.icon }}</v-icon>

            <div>
              {{ item.text }}
            </div>
          </v-btn>
        </div>
      </div>
    </v-parallax>
  </div>
</template>

<script>
export default {
  name: "ImageNavigation",
  data() {
    return {
      items: [
        {
          text: "Stationary Structures",
          icon: "$artifact",
          target: {
            name: "list-q",
            params: {
              q: '{ "codes": "artifact", "type_id":["1095"] }',
            },
          },
        },
        {
          text: "Movable Objects",
          icon: "$artifact",
          target: {
            name: "detaillist-q",
            params: {
              q: '{ "codes": "artifact","type_id":["109"]  }',
            },
          },
        },
        {
          text: "Coins",
          icon: "$artifact",
          target: {
            name: "detaillist-q",
            params: {
              q: '{ "codes": "artifact","type_id":["108"]  }',
            },
          },
        },
        {
          text: "Inscriptions",
          icon: "$artifact",
          target: {
            name: "detaillist-q",
            params: {
              q: '{ "codes": "artifact","type_id":["108"]  }',
            },
          },
        },
      ],
    };
  },
};
</script>

<style scoped>
.navigation-btns {
  position: absolute;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(5, 300px);
  grid-template-rows: repeat(3, 100%);
  left: 10%;
  top: 10%;
}

.navigation-btn {
  min-height: 100px;
  margin: 10px;
  background-color: rgba(255, 255, 255, 0.8) !important;
  transition: all 100ms linear;
}
.navigation-btn-map{
  grid-column: 1 / span 2;
  grid-row: 1;
  height: 400px;
}
.navigation-btn >>> .v-btn__content {
  display: flex;
  flex-direction: column;
}

.image-header {
  background-color: rgba(255, 255, 255, 0.5);
  position: absolute;
  color: black;
  padding: 10px;
  right: 0;
  top: 10%;
}

.navigation-btn:hover {
  transform: scale(1.1);
  background-color: rgba(255, 255, 255, 1) !important;
}


.image-content {
  position: relative;
  height: 100%;
  max-width: 1500px;
}
</style>
