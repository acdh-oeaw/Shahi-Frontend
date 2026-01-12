<template>
  <div>
    <ImageNavigation/>
    <div class="text-justify pa-10 page-content">
      <h1 class="title-1 font-weight-light text-left mb-10" style="font-size: 3rem">Shahi Kingdoms Research Project</h1>
      <p class="text-body-1">
        The Shahi Kingdoms (7th to early 11th century CE) played a pivotal role in the history of Central, Inner, and South Asia, notably in the history of later Buddhist art and the formation of Islamic art.
      </p>
      <p class="text-body-1">
        This platform reflects the collaborative research of a global team of scholars who worked together in the context of the Austrian Science Fund project (P-31246) “Cultural Formation and Transformation: Shahi Art and Architecture from Afghanistan to the West Tibetan Frontier at the Dawn of the Islamic Era.”
      </p>
      <p class="text-body-1">
        The goal of the “Shahi Project” was—for the first time—to define a narrative cultural history of the Shahi Kingdoms. The project examined how exchanges of objects, technologies, and ideas combined with continuous mobility across a vast network of transnational trade routes, religious institutions, and mercantile sites enabled a distinctive visual culture to evolve and flourish throughout the Shahi Kingdoms, despite the simultaneous expansion of successive Muslim armies as well as the Tibetan empire in the northeast. The research considered political, economic, and cultural developments in relation to major—often interconnected—events like climate change and shifts in political alliances that resulted in changes to the centuries-old communication routes.
      </p>
      <p class="text-body-1">
        The Shahi Project was a cooperation between the University of Vienna’s Department of Art History, the Austrian Academy of Sciences’ Department of Classical Studies at the Austrian Archaeological Institute, and the Art History Museum of Vienna’s Coin Cabinet and Conservation Science Department. The project was realized in collaboration with the Center for Interdisciplinary Research and Documentation of Inner and South Asian Cultural History (CIRDIS) at the University of Vienna; the University of Vienna’s Department of Geography and Regional Research; the Austrian Centre for Digital Humanities and Cultural Heritage at the Austrian Academy of Sciences; and a large network of scholars, museum professionals, and digital humanities experts based at institutions in the United States, Europe, and Asia.
      </p>
      <p class="text-body-1">
        The project was funded by the Austrian Science Fund (stand-alone project P-31246) and the Austrian Academy of Sciences, with additional support from the Austrian Science Fund (digital publication grant PUD 26-G), Holzhausen-Legat (grant awarded in 2021), and the Austrian Archaeological Institute at the Austrian Academy of Sciences.
      </p>


      <h2 class="title-1 font-weight-light text-left mb-10" style="font-size: 3rem">Shahi Kingdoms Digital Research Platform </h2>
      <p class="text-body-1">
       This platform, featuring the Shahi Kingdoms Database and integrated <a href="https://shahi.pubpub.org/" target="_blank" class="go-to-map-button primary--text">Digital Publication</a>, offers a major contribution to scholarship in Asian cultural history and the digital humanities by combining innovative multidisciplinary research with digital documentation and spatial visualization of cultural heritage. It is the first platform of its kind publishing comprehensive primary source material—artworks, coins, inscriptions, archaeological sites—for the Shahi Kingdoms together with groundbreaking research by a global team of prominent and emerging scholars working across Central, Inner, and South Asia.
      </p>
      <p class="text-body-1">
       This open-source portal for documentation, research, and education features multiple core relational components: (1) The
       <nuxt-link to="/data/list?view_classes=artifact&view_classes=place" class="go-to-map-button primary--text">Database</nuxt-link>
       containing scientifically annotated records for the corpus of the material culture of the Shahi Kingdoms; cross-referenced
       with (2) an <nuxt-link to="/data/map?view_classes=place&view_classes=artifact" class="go-to-map-button primary--text">interactive
        geo-referenced map</nuxt-link>; (3) thematic <nuxt-link to="/collections" class="go-to-map-button primary--text">collections</nuxt-link> of
        primary sources; (4) comprehensive <nuxt-link to="/bibliography" class="go-to-map-button primary--text">bibliography</nuxt-link>; and (5)
         concise peer-reviewed articles in the <i><nuxt-link to="/sourcebook" class="go-to-map-button primary--text">Sourcebook for the Shahi Kingdoms</nuxt-link></i>.<br>
       The platform opens new ways of presenting multidisciplinary scientific research and documentation of the original primary sources that have, until now, largely remained unpublished, hardly accessible (spread throughout remote archives and museums), and lost or destroyed in illicit antiquities trade and the conflicts that have plagued Afghanistan, Pakistan, and northern India for many decades. These tools allow researchers to study and understand the vast geographical, cultural, and temporal expanse of the Shahi Kingdoms as an integrated whole. The platform and publication are hoped to bring the Shahi Kingdoms to the attention of a broader audience and to foster object-focused education for scholars and museum professionals. <br>
       The platform is an initiative of the Shahi Project in collaboration with technical experts at the Austrian Centre for Digital Humanities and Cultural Heritage (ACDH-CH) of the Austrian Academy of Sciences and cartographers at the University of Vienna’s Department of Geography and Regional Research.
      </p>



      <h2 class="title-1 font-weight-light text-left mb-10" style="font-size: 3rem">Shahi Kingdoms Database</h2>
      <p class="text-body-1">
        This database contains comprehensive primary source material for the Shahi Kingdoms, including artworks, coins, inscriptions, and archaeological sites. Each type of sources contributes critical information about the Shahi Kingdoms (see <nuxt-link to="/collections" class="go-to-map-button primary--text">Collections</nuxt-link>). By studying the corpus of primary sources collectively, we gain a more cohesive picture of the cultural history of this region.
      </p>
      <p class="text-body-1">
        The structure of the database is primarily geographical. All stationary objects have precise GPS coordinates and chronologies, where available. For the category of portable objects, the database is structured according to material. All objects have been determined to be authentic based on our criteria for identifying authentic objects (see <a href="#categories_of_authenticity">“Categories of Authenticity”</a> below).
      </p>
      <div id="database" style="position: relative;top:-180px"></div>

      <p class="title-2">Search the Database</p>
      <p class="text-body-1">
       To search the database, you can explore by category (see list below) or by entering a keyword in the search bar. Records can be viewed in table, list, map, or image gallery format.
      </p>
      <p class="title-2">Explore the Map</p>
      <p class="text-body-1">
       To explore the interactive map, click on the red dot symbols that indicate artifact and site records associated with a location. You can refine the records visible on the map according to a specific period by clicking the small clock icon in the upper right corner and then dragging the slider bar to different centuries.
      </p>
      <p class="title-2">The Shahi Corpus</p>
      <p class="text-body-1">
       The corpus of material culture attributed to the Shahi period encompasses:
      </p>

      <v-row>
        <v-col cols="12" sm="8" md="7">
          <div class="data-base-element">
            <p class="text-h6 mt-15">(1) Archaeological sites</p>
            <p class="text-subtitle-1">1.a. Stationary structures</p>
            <ul class="text-body-2">
              <li>constructed</li>
              <li>rock-carved</li>
            </ul>
            <p class="text-subtitle-1">1.b. Stationary objects</p>
            <ul class="text-body-2">
              <li>cult object</li>
              <li>architectural element</li>
              <li>architectural decoration (clay-based; painting)</li>
            </ul>
            <p
              class="primary--text go-to-map-button mt-5"
              @click="searchSites"
            >
              Search for sites in the database
              <v-icon class="ml-n1 mb-1">mdi-chevron-right</v-icon>
            </p>
          </div>

          <div class="data-base-element">
            <p class="text-h6 mt-15">(2) Portable objects</p>
            <!-- <p class="text-body-1">
              All objects have been determined to be authentic based on our criteria for identifying
              authentic objects (see “Categories of Authenticity” below).
            </p> -->
            <p class="text-subtitle-1 mb-1">2.a. Statues (in different media)</p>
            <!-- <ul class="text-body-2 mb-1">
              <li>metal</li>
              <li>clay-based</li>
              <li>stone</li>
              <li>wood</li>
            </ul> -->
            <p class="text-subtitle-1 mb-1">2.b. Coins and medals</p>
            <!-- <ul class="text-body-2 mb-1">
              <a href="#coins" class="go-to-map-button primary--text">see more below</a>
            </ul> -->
            <p class="text-subtitle-1 mb-1">2.c. Jewelry</p>
            <p class="text-subtitle-1 mb-1">2.d. Utensil</p>
            <p
              class="primary--text go-to-map-button mt-5"
              @click="searchPortableObjects"
            >
              Search for portable objects in the database
              <v-icon class="ml-n1 mb-1">mdi-chevron-right</v-icon>
            </p>
          </div>
        </v-col>
        <v-col cols="12" sm="4" md="5">
          <v-img contain position="center center" src="/site.jpg"/>
          <p
            class="text-caption text-left secondary lighten-1 pa-2"
          >Barikot, Swat, Photo courtesy of Luca Maria Olivieri</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4" md="3">
          <div>
            <v-img position="center center" height="300px" src="/Uma_Maheshvara_Original.jpg"/>
          </div>
          <p
            class="text-caption text-left secondary lighten-1 pa-2"
          >Uma Maheshvara, Tepe Skandar, Afghanistan, excavated in Temple A, 7th century, H. 81.5 cm, Photo by courtesy
            of The Committee of the Kyoto University Scientific Mission to Central Asia (Institute for Research in
            Humanities, Kyoto University)</p>
        </v-col>
        <v-col cols="12" sm="4" md="3">
          <div>
            <v-img position="center center" height="300px" src="/bddhist_devotee_original.jpg"/>
          </div>
          <p
            class="text-caption text-left secondary lighten-1 pa-2"
          >Head of a Buddhist devotee or bodhisattva, Ambaran (Akhnur), Historical Northwest India, c. 6th/7th century,
            Red clay, accidentally fired, 14 x 10 x 11.5 cm, Photo: © The Government Museum and Art Gallery, Chandigarh,
            02961</p>
        </v-col>
        <v-col cols="12" sm="4" md="3">
          <div>
            <v-img position="center center" height="300px" src="/Budda_original.jpg"/>
          </div>
          <p
            class="text-caption text-left secondary lighten-1 pa-2"
          >Buddha Shakyamuni and Adorants on Mount Meru, Kashmir, India c. 700, Bronze with silver and copper inlay,
            33.7 x 24.1 x 12.1 cm, Photo: © The Norton Simon Foundation</p>
        </v-col>
        <v-col cols="12" sm="4" md="3">
          <div>
            <v-img position="center center" height="300px" src="/fragment_cupola_original.jpg"/>
          </div>
          <p
            class="text-caption text-left secondary lighten-1 pa-2"
          >Fragment of cupola mural painting, Kakrak, Hindu Kush, Afghanistan, early 8th century, National Museum of
            Afghanistan, inv. no. 05-5-122, Photo: Susanne Novotny, 2005, WHAV</p>
        </v-col>
      </v-row>
      <div id="coins" style="position: relative;top:-180px"></div>
      <!-- <p class="text-body-1">
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
      </p> -->
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
          >Chorasan Tegin Shah (after 680 – around 738 CE), Drachm (silver), minted in Kabulistan?, Photo after
            pro.geo.univie.ac.at/projects/khm/coins/coin105</p>
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
          >Sandan (First half of the 8th century), Drachm, minted in Zabulistan or Kabulistan, Kunsthistorisches Museum
            Wien, inv. no. GR 41709</p>
        </v-col>
      </v-row>
      <div class="mr-15 database-element">
        <p class="text-h6 mt-15">(3) Information carriers</p>
        <p class="text-subtitle-1">3.a. Inscriptions</p>
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
          <v-img src="/Stone_inscription_1.png"/>
          <p class="text-caption text-left secondary lighten-1 pa-2">
            A śāradā inscription from the important Shahi archaeological site Barikot (Vajirasthāna) in Swat, Pakistan.
            The inscription mentions the Hindu Shahi king Jayapāladeva (r. c. 964-1002 CE) and the area where a Shahi
            temple with a water tank has been excavated.
            Photo: after von Hinüber 2020 in Callieri and Olivieri 2020: 53, fig. 18; Courtesy Lahore Museum and ISMEO
            Italian Archaeological Mission in Pakistan (Photo by Cristiano Moscatelli)
          </p>
        </v-col>
        <v-col cols="12" sm="6">
          <v-img src="/csm_Sculpture_Inscription_2_6771efcad3.jpg"/>
          <p class="text-caption text-left secondary lighten-1 pa-2">
            Uma Maheshvara, Tepe Skandar, Afghanistan, excavated in Temple A, 7th century, Marble, H. 81.5 cm
            A three-line inscription of 84 Brahmi letters (incl. punctuation marks), 5.8 cm x 43 cm (inscription only),
            located along upper part of the pedestal of the sculpture
            Kuwayama (2002: 226-228) explains that ‘the inscription tells us that the name Śiva is given as Maheśvara
            and therefore the consort takes the name Uma.’
            Photo by courtesy of The Committee of the Kyoto University Scientific Mission to Central Asia (Institute for
            Research in Humanities, Kyoto University).
          </p>
        </v-col>
      </v-row>
      <h2 class="title-1 font-weight-light text-left mb-10" style="font-size: 3rem" id="categories_of_authenticity">Categories of Authenticity for Objects in the Shahi Kingdoms Database</h2>

      <p class="text-body-1">
        Only objects that the art history team could unanimously categorize as authentic are included in the corpus of Shahi visual and material culture. Strict selection criteria have been used to assess the authenticity of each object. We defined three categories of authenticity. In the database, each object is identified as belonging to either category A or B. Category C objects are not included.
      </p>

      <p class="text-h6">
        <span class="mr-4 font-weight-bold">A</span> Authentic objects with secure attribution
      </p>

      <p class="ml-3 text-body-1">
        <span class="font-weight-bold">A1</span> Secure attribution: excavated objects from a trustworthy archaeological context.
      </p>
      <p class="ml-3 text-body-1">
        <span class="font-weight-bold">A2</span> Attributable with high confidence: objects with an early accession date (prior to WWI) in regional museums in Afghanistan, Pakistan, and India, as well as objects photographed in situ in monastic and temple treasuries in India; objects bearing inscriptions that indicate authenticity; objects that have undergone objective technical analysis that indicates authenticity.
      </p>

      <p class="text-h6">
        <span class="mr-4 font-weight-bold">B</span> Apparently authentic objects without secure attribution
      </p>

      <p class="text-body-1">
        Objects in private collections and Western museum collections without secure provenance, inscriptions, or objective technical analysis. Comparative visual analysis suggests confidence in their authenticity.
      </p>

      <p class="text-h6">
        <span class="mr-4 font-weight-bold">C</span> Insecure and inauthentic objects
      </p>

      <p class="text-body-1">
        These objects are not included in the corpus. However, in our study of Shahi material culture they are used for comparison with apparently authentic objects in order to better understand the historiography of the field and the current market situation. We are aware that other art historians and scholars may come to different conclusions.
      </p>

      <h2 class="title-1 font-weight-light text-left mb-10" style="font-size: 3rem">The Publication</h2>
      <p class="text-body-1">
        <i>Exploring the Contributions of the Shahi Kingdoms to Inner and South Asia: The Dynamic Evolution of Primary Source Materials from the Hindukush to the Himalayas during the 7th-11th Century</i>, edited by Natasha Kimmet and Noémie Verdon with Deborah Klimburg-Salter and Michael Alram.<br>
        Following methods of digital humanities as well as principles of open science, the <a href="https://shahi.pubpub.org/" target="_blank" class="go-to-map-button primary--text">Digital Publication</a> offers innovative approaches to the study of the Shahi Kingdoms.

Published in conjunction with a printed volume, the digital publication presents the final scientific results of the Shahi Project in a unique, digitally enriched format. The text is linked with the primary source materials, maps, and other digital tools published by the project team on the digital platform. The digital publication is further contextualized through linking directly to related scholarly resources and interactive visual content.
      </p>

      <p class="text-body-1">Notes</p>
      <p class="text-caption">
        The Shahi Kingdoms Digital Research Platform employs two transliteration systems. To ensure accessibility across scholarly disciplines and for general audiences, simplified phonetic transcriptions are used for frequently-used terms on the platform (e.g., Shahi). Diacritics are employed in individual scholars' contributions, such as Sourcebook entries (e.g., Śāhi).
      </p>
      <p class="text-caption">
        The images on this platform originate from open access sources. Each image is subject to the terms of the Creative Commons selected by the rights holder. The Shahi Project team appreciates the institutions and individuals who shared their images. This commitment to open access enables the development of resources such as this digital platform and supports research.
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
  methods: {
    searchSites() {
      this.$router.push('/data/list?view_classes=artifact&view_classes=place&search={"entitySystemClass":[{"operator":"equal","values":["Place"]}],"typeIDWithSubs":[{"operator":"equal","values":[2667, 1599, 1087, 1094, 2362],"logicalOperator":"or"}]}')
    },
    searchPortableObjects() {
      this.$router.push('/data/list?view_classes=artifact&view_classes=place&search={"typeIDWithSubs"%3A[{"operator"%3A"equal","values"%3A[118]}]}')
    }
  }
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

