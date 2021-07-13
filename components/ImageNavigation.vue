<template>
  <div>

    <v-parallax
      height="500"
      src="https://shahimaterialculture.univie.ac.at/fileadmin/_processed_/csm_1__Gilgit_MS_Banner_2ba90c6442.jpg"

    >
      <div class="image-content">
        <div class="image-header text-h2">
          Shahi Kingdom
        </div>
        <div class="navigation-btns">
          <v-btn   v-for="(item,index) in items" :to="item.target" :key="index"
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
  name: 'ImageNavigation',
  data() {
    return {
      items: [{
        text: 'Collections',
        icon: '$artifact',
        target: {
          'name': 'list-q',
          'params': {
            'q': '{ "codes": "actor" }'
          }
        }
      },
        {
          text: 'Map',
          icon: 'mdi-map',
          target: {
            'name': 'detaillist-q',
            'params': {
              'q': '{ "codes": "actor" }'
            }
          }
        },
        {
          text: 'Artifact',
          icon: '$artifact',
          target: {
            'name': 'detaillist-q',
            'params': {
              'q': '{ "codes": "artifact" }'
            }
          }
        }]
    };
  }
};
</script>

<style scoped>
.navigation-btns {
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 10%;
  top: 10%;
}

.navigation-btn {
  min-height: 100px;

  margin-bottom: 10px;


}
.navigation-btn >>> .v-btn__content{
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

}

.v-btn__content {

}

.image-content {
  position: relative;
  height: 100%;
  max-width: 1500px;

}
</style>
