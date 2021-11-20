<template>
  <div>
    <ImageNavigation />
    <div class="text-justify pa-10 page-content">
      <h1 class="title-1 font-weight-light text-left mb-10">
        Shahi Kingdoms Database
      </h1>

      <p class="text-body-1">
        The Shahi Kingdoms Database presents comprehensive primary source material--archaeological sites, artifacts,
        coins, inscriptions--for the Shahi kingdoms (c. 7th-10th centuries) which played a pivotal role in the history
        of Central, Inner, and South Asia. The primary source material records are cross-referenced with an interactive
        geo-referenced map, bibliographic references, and digital scientific articles.
      </p>

      <p class="text-body-1">
        The database is an initiative of the interdisciplinary Austrian Science Fund (FWF) project P-31246 ‘Cultural
        Formation and Transformation: Shahi Art and Architecture from Afghanistan to the West Tibetan Frontier at the
        Dawn of the Islamic Era’ in cooperation with technical experts at the Austrian Academy of Sciences’ Austrian
        Centre for Digital Humanities and Cultural Heritage (ACDH-CH) and cartographers at the University of Vienna’s
        Department of Geography and Regional Research. It is co-financed by the FWF Shahi project, Austrian
        Archaeological Institute, and Holzhausen-Legat.
      </p>

      <p class="title-2">
        The Database
      </p>

      <p class="text-body-1">
        The Shahi Kingdoms Database presents comprehensive primary source material--archaeological sites, artifacts,
        coins, inscriptions--for the Shahi kingdoms (c. 7th-10th centuries) which played a pivotal role in the history
        of Central, Inner, and South Asia. The primary source material records are cross-referenced with an interactive
        geo-referenced map, bibliographic references, and digital scientific articles.
      </p>

      <p class="text-body-1">
        The structure of the database is primarily geographical. All stationary objects have precise GPS coordinates and
        chronologies, where available. However, for the category of portable objects, the database is structured
        according to material. The corpus of visual and material culture attributed to the Shahi period encompasses:
      </p>
      <div class="d-flex flex-column flex-sm-row  justify-space-between align-center data-base-element">
        <div>
          <p class="text-h6">
            (1) Archaeological sites
          </p>
          <p class="text-subtitle-1">
            1.a. Stationary structures
          </p>
          <ul class="text-body-2">
            <li>Constructed</li>
            <li>Rock-carved</li>
          </ul>
          <p class="text-subtitle-1">
            1.b. Stationary objects
          </p>
          <ul class="text-body-2">
            <li>Cult object</li>
            <li>Architectural element</li>
            <li>Architectural decoration</li>
          </ul>
          <p
            class="primary--text go-to-map-button mt-5"
            @click="$router.push('/data/list?codes=artifact&type_id=1095')"
          >
            Search for sites in the database
            <v-icon class="ml-n1 mb-1">
              mdi-chevron-right
            </v-icon>
          </p>
        </div>
        <div class="database-image">
          <v-img
            class="elevation-3"
            width="500px"
            height="500px"
            max-height="80vw"
            max-width="80vw"
            src="https://images.unsplash.com/photo-1554303486-cb4b90a27751?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          />
        </div>
      </div>
      <div class="data-base-element d-flex flex-column flex-sm-row-reverse   justify-space-between align-center">
        <div class="ml-15">
          <p class="text-h6 mt-15">
            (2) Portable objects
          </p>
          <p class="text-body-1">
            All objects have been determined to be authentic based on our criteria for identifying
            authentic objects (see “Categories of Authenticity” below).
          </p>
          <p class="text-subtitle-1">
            2.a. Statue
          </p>
          <ul class="text-body-2">
            <li>Metal</li>
            <li>Clay-based</li>
            <li>Stone</li>
            <li>Wood</li>
          </ul>
          <p class="text-subtitle-1">
            2.b. Painting
          </p>
          <p class="text-subtitle-1">
            2.c. Coins and medals
          </p>
          <p v-if="false" class="text-body-2">
            The largest and most significant category of artifacts are the coins struck in various
            mints throughout the Shahi kingdoms. They provide the chronological and political framework for the Shahi
            period. With their images and inscriptions, they give insight into the self-concept of their issuers. In
            addition, the technical features of production have to be analyzed; this concerns the production of flans, dies,
            striking methods, metrology, and metal composition. The extremely rich deposits of copper (Mes Aynak) and silver
            (Panjshir) to which the Shahis had access constitute important resources for their coinage. However, especially
            in the early period of the Turk Shahis (7th to 8th century), access to silver must have been temporarily
            interrupted, because some issues show a considerable sign of debasement. Metal analyses will help to better
            understand this phenomenon. Furthermore, we have to analyze the circulation patterns. Some coins were only used
            locally, while others circulated far beyond the borders of their issuing authority. Unfortunately, most of the
            coins bear no mint signature and are not found in a documented archaeological context. However, recent
            excavations like Tepe Narenj, Qol-e Tut, Mes Aynak, Barikot, and others will help give a clearer picture. This
            concerns also the role of foreign money, like Sasanian drachms, Muslim dirhams, and copper coins, which
            circulated within the Shahi kingdoms.
          </p>
          <p class="text-subtitle-1">
            2.d. Jewelry
          </p>
          <p class="text-subtitle-1">
            2.e. Utensil
          </p>
          <p
            class="primary--text go-to-map-button mt-5"
            @click="$router.push('/data/list?codes=artifact&type_id=118')"
          >
            Search for portable objects in the database
            <v-icon class="ml-n1 mb-1">
              mdi-chevron-right
            </v-icon>
          </p>
        </div>
        <div class="database-image">
          <v-img
            class="elevation-3"
            width="500px"
            height="500px"
            max-height="80vw"
            max-width="80vw"
            src="https://images.unsplash.com/photo-1632851852839-b70a13715261?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
          />
        </div>
      </div>
      <div class="d-flex flex-column flex-sm-row  justify-space-between align-center data-base-element">
        <div class="mr-15">
          <p class="text-h6 mt-15">
            (3) Information carrier
          </p>
          <p class="text-subtitle-1">
            3.a. Inscriptions
          </p>

          <p class="text-body-2">
            Inscriptions that fit within the chronological and geographic parameters of the Shahi kingdoms offer a critical
            primary source for the region’s cultural history. The inscriptions will be contextualized to the degree
            possible.
          </p>
          <p
            class="primary--text go-to-map-button mt-5"
            @click="$router.push('/data/list?codes=artifact&type_id=3')"
          >
            Search for inscriptions in the database
            <v-icon class="ml-n1 mb-1">
              mdi-chevron-right
            </v-icon>
          </p>
        </div>
        <div class="database-image">
          <v-img
            class="elevation-3"
            width="500px"
            height="500px"
            max-height="80vw"
            max-width="80vw"
            src="https://images.pexels.com/photos/8719164/pexels-photo-8719164.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          />
        </div>
      </div>
    </div>

    Categories of Authenticity for Objects in the Shahi Kingdoms Database

    Only objects that the art history team could unanimously categorize as authentic are included in the corpus of Shahi visual and material culture. Strict selection criteria have been used to assess the authenticity of each object. We defined three categories of authenticity. In the database, each object is identified as belonging to either category A or B. Category C objects are not included.

    A    Authentic objects with firm attribution

    A1 Secure attribution: excavated objects from a trustworthy context
    A2 Attributable with high confidence: objects with an early accession date (prior to WWI) in regional museums in Afghanistan, Pakistan, and India, as well as objects photographed in situ in monastic and temple treasuries in India; objects bearing inscriptions that indicate authenticity; objects for which objective technical analysis has been conducted that indicates authenticity.

    B    Apparently authentic objects without secure attribution

    Objects in private and western museum collections without secure provenance, inscriptions, or objective technical analysis. Comparative art historical analysis suggests confidence in their authenticity.

    C    Insecure and fake objects

    These objects are not included in the corpus. However, in our study of Shahi material culture they are used for comparison with apparently authentic objects in order to better understand the historiography of the field and the current market situation. We are aware that other art historians may come to different conclusions in some instances.
  </div>
</template>

<script>
import ImageNavigation from '@/components/ImageNavigation';

export default {
  components: {
    ImageNavigation,
  },
};
</script>

<style scoped>
.database-image{
  position: relative;
  max-width: 80vw;
  max-height: 80vw;
}
.database-image>.v-image{
  transition: all ease 200ms;
  z-index: 5;
  position: relative;
}
.database-image::before{
  position: absolute;
  content: '';
  inset: 0;
  transform: translateX(20px) translateY(20px);
  background-color: #b7bf96;
  transition: all ease-out 200ms;
}

.database-image:hover>.v-image{
  transform: translateX(-2px) translateY(-3px);
}
.database-image:hover::before{
  transform: translateX(22px) translateY(23px);
}

.data-base-element{
  margin-top: 70px;
}
.data-base-element p{
  width: 500px;
  max-width: 70vw;

}
ul{
  margin-top: -15px;
  margin-bottom: 10px;
}
.page-content{
  overflow: hidden;
  max-width: 1200px;

}


</style>
