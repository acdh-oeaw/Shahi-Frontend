<template>
<div>
              <ImageNavigation></ImageNavigation>
              <v-container>
                <p class="text-h3">Title</p>
                <p class="text-body-1">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                  ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                  nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>

                <p class="text-h3">Discover Shahi kingdom</p>
                <p class="text-body-1">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                  ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                  nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>
                <div class="full-width" style="height: 500px">
                  <qmap />
                </div>

                <v-img
                  class="my-15"
                  height="100"
                  src="https://shahimaterialculture.univie.ac.at/fileadmin/_processed_/csm_1__Gilgit_MS_Banner_2ba90c6442.jpg"
                ></v-img>

                <p class="text-h3">Artifacts</p>
                <v-row>
                  <v-col v-for="item in [1, 2, 3]" :key="item">
                    <v-skeleton-loader
                      class="mx-5"
                      v-bind="attrs"
                      type="card"
                    ></v-skeleton-loader>
                  </v-col>
                </v-row>

                <v-img
                  height="100"
                  class="my-15"
                  src="https://shahimaterialculture.univie.ac.at/fileadmin/_processed_/csm_1__Gilgit_MS_Banner_2ba90c6442.jpg"
                ></v-img>

                <p class="text-h3">Sites</p>
                <v-row>
                  <v-col v-for="item in [1, 2, 3]" :key="item">
                    <v-skeleton-loader
                      class="mx-5"
                      v-bind="attrs"
                      type="card"
                    ></v-skeleton-loader>
                  </v-col>
                </v-row>
              </v-container>
            </div>
</template>

<script>
import qmap from "~/components/map.vue";


export default {
components:{qmap}
}
</script>
