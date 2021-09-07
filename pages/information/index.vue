<template>
  <div>
    <ImageNavigation />
    <v-container style="max-width: 850px;" class="text-justify">
      <p class="text-h3 text-left">
        Cultural Formation and Transformation
      </p>
      <p class="text-h4 text-left">
        Shahi Art and Architecture from Afghanistan to the West Tibetan Frontier at the Dawn
        of the Islamic Era
      </p>
      <p class="text-body-1">
        The goal of the project "Cultural Formation and Transformation: Shahi Art and Architecture from Afghanistan to
        the West Tibetan Frontier at the Dawn of the Islamic Era" is to define a narrative cultural history of the Shahi
        kingdoms (7th to 10th century). Due to their extensive temporal and geographic parameters — extending from
        Afghanistan to the borders of the Tibetan empire — the kingdoms played a pivotal role in the history of Inner
        and South Asia. Despite its importance for the history of later Buddhist art and the formation of Islamic art,
        the cultural history of this almost 300-year period has never been the focus of dedicated research.
      </p>

      <p class="text-body-1">
        This research makes a major contribution to digital humanities through the innovative methods used to explain
        for the first time the cultural history of a vast area that is of tremendous geographic and temporal
        significance (today within the modern states of Afghanistan, Pakistan, and India). A central element of our
        research is to document and systematize comprehensive data, cross referencing the entire corpus of the material
        culture of the vast Shahi kingdoms. The resultant database will be linked to the Digital Maps of the Shahi
        kingdoms and the Bibliographic Database (BibDB). Modern digital methods will allow the quantitative and
        qualitative analysis of primary sources (texts; inscriptions; numismatic, art historical, and archaeological
        data) plus completely new data derived from the analysis of the materials and techniques of manufacture of three
        groups of artifacts (see Database).
      </p>
      <p class="text-h3">
        Discover Shahi kingdom
      </p>
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
      />

      <p class="text-h3">
        Artifacts
      </p>
      <v-row>
        <v-col v-for="item in [1, 2, 3]" :key="item">
          <v-skeleton-loader
            class="mx-5"
            v-bind="attrs"
            type="card"
          />
        </v-col>
      </v-row>

      <v-img
        height="100"
        class="my-15"
        src="https://shahimaterialculture.univie.ac.at/fileadmin/_processed_/csm_1__Gilgit_MS_Banner_2ba90c6442.jpg"
      />

      <p class="text-h3">
        Sites
      </p>
      <v-row>
        <v-col v-for="item in [1, 2, 3]" :key="item">
          <v-skeleton-loader
            class="mx-5"
            v-bind="attrs"
            type="card"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import qmap from '@/components/map.vue';

export default {
  components: { qmap },
};
</script>
