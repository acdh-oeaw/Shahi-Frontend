<template>
  <div>
    <ImageNavigation />
    <div class="text-justify pa-10 page-content">
      <h1 class="title-1 font-weight-light text-left mb-10">Shahi Kingdoms Database</h1>

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

      <p class="title-2">The Database</p>

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

      <v-row>
        <v-col cols="12" sm="8" md="7">
          <div class="data-base-element">
            <p class="text-h6 mt-15">(1) Archaeological sites</p>
            <p class="text-subtitle-1">1.a. Stationary structures</p>
            <ul class="text-body-2">
              <li>Constructed</li>
              <li>Rock-carved</li>
            </ul>
            <p class="text-subtitle-1">1.b. Stationary objects</p>
            <ul class="text-body-2">
              <li>Cult object</li>
              <li>Architectural element</li>
              <li>Architectural decoration</li>
            </ul>
            <p
              class="primary--text go-to-map-button mt-5"
              @click="$router.push('/data/list?view_classes=artifact&type_id=1095')"
            >
              Search for sites in the database
              <v-icon class="ml-n1 mb-1">mdi-chevron-right</v-icon>
            </p>
          </div>

          <div class="data-base-element">
            <p class="text-h6 mt-15">(2) Portable objects</p>
            <p class="text-body-1">
              All objects have been determined to be authentic based on our criteria for identifying
              authentic objects (see “Categories of Authenticity” below).
            </p>
            <p class="text-subtitle-1">2.a. Statue</p>
            <ul class="text-body-2 mb-1">
              <li>Metal</li>
              <li>Clay-based</li>
              <li>Stone</li>
              <li>Wood</li>
            </ul>
            <p class="text-subtitle-1 mb-1">2.b. Painting</p>
            <p class="text-subtitle-1 mb-1">2.c. Coins and medals</p>
            <p class="text-subtitle-1 mb-1">2.d. Jewelry</p>
            <p class="text-subtitle-1 mb-1">2.e. Utensil</p>
            <p
              class="primary--text go-to-map-button mt-5"
              @click="$router.push('/data/list?view_classes=artifact&type_id=118')"
            >
              Search for portable objects in the database
              <v-icon class="ml-n1 mb-1">mdi-chevron-right</v-icon>
            </p>
          </div>
        </v-col>
        <v-col cols="12" sm="4" md="5">
          <v-img contain position="center center" src="/site.jpg" />
          <p
            class="text-caption text-left secondary lighten-1 pa-2"
          >Barikot, Swat, Photo courtesy of Luca Maria Olivieri</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4" md="3">
          <div>
            <v-img position="center center" height="300px" src="/Uma_Maheshvara_Original.jpg" />
          </div>
          <p
            class="text-caption text-left secondary lighten-1 pa-2"
          >Uma Maheshvara, Tepe Skandar, Afghanistan, excavated in Temple A, 7th century, H. 81.5 cm, Photo by courtesy of The Committee of the Kyoto University Scientific Mission to Central Asia (Institute for Research in Humanities, Kyoto University)</p>
        </v-col>
        <v-col cols="12" sm="4" md="3">
          <div>
            <v-img position="center center" height="300px" src="/bddhist_devotee_original.jpg" />
          </div>
          <p
            class="text-caption text-left secondary lighten-1 pa-2"
          >Head of a Buddhist devotee or bodhisattva, Ambaran (Akhnur), Historical Northwest India, c. 6th/7th century, Red clay, accidentally fired, 14 x 10 x 11.5 cm, Photo: © The Government Museum and Art Gallery, Chandigarh, 02961</p>
        </v-col>
        <v-col cols="12" sm="4" md="3">
          <div>
            <v-img position="center center" height="300px" src="/Budda_original.jpg" />
          </div>
          <p
            class="text-caption text-left secondary lighten-1 pa-2"
          >Buddha Shakyamuni and Adorants on Mount Meru, Kashmir, India c. 700, Bronze with silver and copper inlay, 33.7 x 24.1 x 12.1 cm, Photo: © The Norton Simon Foundation</p>
        </v-col>
        <v-col cols="12" sm="4" md="3">
          <div>
            <v-img position="center center" height="300px" src="/fragment_cupola_original.jpg" />
          </div>
          <p
            class="text-caption text-left secondary lighten-1 pa-2"
          >Fragment of cupola mural painting, Kakrak, Hindu Kush, Afghanistan, early 8th century, National Museum of Afghanistan, inv. no. 05-5-122, Photo: Susanne Novotny, 2005, WHAV</p>
        </v-col>
      </v-row>
      <p class="text-body-1">
        The largest and most significant category of artifacts are the coins struck in various
        mints throughout the Shahi kingdoms. They provide the chronological and political framework for the Shahi
        period. With their images and inscriptions, they give insight into the self-concept of their issuers. In
        addition, the technical features of production have to be analyzed; this concerns the production of flans,
        dies,
        striking methods, metrology, and metal composition. The extremely rich deposits of copper (Mes Aynak) and
        silver
        (Panjshir) to which the Shahis had access constitute important resources for their coinage. However,
        especially
        in the early period of the Turk Shahis (7th to 8th century), access to silver must have been temporarily
        interrupted, because some issues show a considerable sign of debasement. Metal analyses will help to better
        understand this phenomenon. Furthermore, we have to analyze the circulation patterns. Some coins were only
        used
        locally, while others circulated far beyond the borders of their issuing authority. Unfortunately, most of
        the
        coins bear no mint signature and are not found in a documented archaeological context. However, recent
        excavations like Tepe Narenj, Qol-e Tut, Mes Aynak, Barikot, and others will help give a clearer picture.
        This
        concerns also the role of foreign money, like Sasanian drachms, Muslim dirhams, and copper coins, which
        circulated within the Shahi kingdoms.
      </p>
      <v-row>
        <v-col cols="12" sm="6">
          <v-img
            contain
            position="center center"
            height="180px"
            src="/csm_2_Mints_Chorasan_bd0a8a687e.jpg"
          />
          <p
            class="text-caption text-left secondary lighten-1 pa-2"
          >Chorasan Tegin Shah (after 680 – around 738 CE), Drachm (silver), minted in Kabulistan?, Photo after pro.geo.univie.ac.at/projects/khm/coins/coin105</p>
        </v-col>
        <v-col cols="12" sm="6">
          <v-img
            contain
            position="center center"
            height="180px"
            src="/csm_111_Two_Mints_Sandran_807ae93813.jpg"
          />
          <p
            class="text-caption text-left secondary lighten-1 pa-2"
          >Sandan (First half of the 8th century), Drachm, minted in Zabulistan or Kabulistan, Kunsthistorisches Museum Wien, inv. no. GR 41709</p>
        </v-col>
      </v-row>
      <div class="mr-15 database-element">
        <p class="text-h6 mt-15">(3) Information carrier</p>
        <p class="text-subtitle-1">3.a. Inscriptions</p>

        <p class="text-body-1">
          Inscriptions that fit within the chronological and geographic parameters of the Shahi kingdoms offer a
          critical
          primary source for the region’s cultural history. The inscriptions will be contextualized to the degree
          possible.
        </p>
        <p
          class="primary--text go-to-map-button mt-5"
          @click="$router.push('/data/list?view_classes=artifact&type_id=3')"
        >
          Search for inscriptions in the database
          <v-icon class="ml-n1 mb-1">mdi-chevron-right</v-icon>
        </p>
      </div>

      <v-row>
        <v-col cols="12" sm="6">
          <v-img src="/Stone_inscription_1.png" />
          <p class="text-caption text-left secondary lighten-1 pa-2">
            A śāradā inscription from the important Shahi archaeological site Barikot (Vajirasthāna) in Swat, Pakistan.
            The inscription mentions the Hindu Shahi king Jayapāladeva (r. c. 964-1002 CE) and the area where a Shahi temple with a water tank has been excavated.
            Photo: after von Hinüber 2020 in Callieri and Olivieri 2020: 53, fig. 18; Courtesy Lahore Museum and ISMEO Italian Archaeological Mission in Pakistan (Photo by Cristiano Moscatelli)
          </p>
        </v-col>
        <v-col cols="12" sm="6">
          <v-img src="/csm_Sculpture_Inscription_2_6771efcad3.jpg" />
          <p class="text-caption text-left secondary lighten-1 pa-2">
            Uma Maheshvara, Tepe Skandar, Afghanistan, excavated in Temple A, 7th century, Marble, H. 81.5 cm
            A three-line inscription of 84 Brahmi letters (incl. punctuation marks), 5.8 cm x 43 cm (inscription only), located along upper part of the pedestal of the sculpture
            Kuwayama (2002: 226-228) explains that ‘the inscription tells us that the name Śiva is given as Maheśvara and therefore the consort takes the name Uma.’
            Photo by courtesy of The Committee of the Kyoto University Scientific Mission to Central Asia (Institute for Research in Humanities, Kyoto University).
          </p>
        </v-col>
      </v-row>
      <p
        class="text-h5 mt-15"
      >Categories of Authenticity for Objects in the Shahi Kingdoms Database</p>

      <p class="text-body-1">
        Only objects that the art history team could unanimously categorize as authentic are included in the corpus of Shahi
        visual and material culture. Strict selection criteria have been used to assess the authenticity of each object. We
        defined three categories of authenticity. In the database, each object is identified as belonging to either category
        A or B. Category C objects are not included.
      </p>

      <p class="text-h6">
        <span class="mr-4 font-weight-bold">A</span> Authentic objects with firm attribution
      </p>

      <p class="ml-3 text-body-1">
        <span class="font-weight-bold">A1</span> Secure attribution: excavated objects from a trustworthy context
      </p>
      <p class="ml-3 text-body-1">
        <span class="font-weight-bold">A2</span> Attributable with high confidence: objects with an early accession date (prior to WWI) in regional museums in
        Afghanistan, Pakistan, and India, as well as objects photographed in situ in monastic and temple treasuries in
        India; objects bearing inscriptions that indicate authenticity; objects for which objective technical analysis has
        been conducted that indicates authenticity.
      </p>

      <p class="text-h6">
        <span class="mr-4 font-weight-bold">B</span> Apparently authentic objects without secure attribution
      </p>

      <p class="text-body-1">
        Objects in private and western museum collections without secure provenance, inscriptions, or objective technical
        analysis. Comparative art historical analysis suggests confidence in their authenticity.
      </p>

      <p class="text-h6">
        <span class="mr-4 font-weight-bold">C</span> Insecure and fake objects
      </p>

      <p class="text-body-1">
        These objects are not included in the corpus. However, in our study of Shahi material culture they are used for
        comparison with apparently authentic objects in order to better understand the historiography of the field and the
        current market situation. We are aware that other art historians may come to different conclusions in some
        instances.
      </p>
    </div>
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

ul {
  margin-top: -15px;
  margin-bottom: 10px;
}

.page-content {
  overflow: hidden;
  max-width: 1200px;
}
</style>
