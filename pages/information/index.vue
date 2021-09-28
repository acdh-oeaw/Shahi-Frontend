<template>
  <div>
    <ImageNavigation />
    <v-container class="text-justify pa-10">
      <h1 class="text-h2 text-left mb-10">
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

      <p class="text-h5">
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

      <p class="text-h6">
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
      <p class="text-body-2">
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

      <p class="text-h6">
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
    </v-container>
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
