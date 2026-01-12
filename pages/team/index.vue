<template>
  <v-container class="pt-10 page-content">
    <h1 class="title-1 pb-5">
      Meet the Project Team
    </h1>

    <p class="text-body-1">
      Based at the University of Vienna, Austrian Academy of Sciences, and Art History Museum Vienna, the Shahi Project was directed by Univ.-Prof. Dr. Deborah Klimburg-Salter in cooperation with National Research Partner HR Doz. Dr. Michael Alram, Doz. Dr. Klaus Vondrovec, Dr. Natasha Kimmet, and Mag. Malgorzata Lenko. This core team collaborated with a wider research network of scholars, museum professionals, and digital humanities experts.
    </p>
    <v-row>
      <v-col
        v-for="(person,i) in team"
        :key="i"
        cols="12"
        class="my-8"
      >
        <v-divider class="hidden-sm-and-up" />

        <v-card flat>
          <v-row no-gutters>
            <v-col cols="12" sm="3" :order-sm="i%2" class="px-4" v-if="person.image">
              <v-img
                class="mr-sm-5 circle"

                :src="person.image"
              />
            </v-col>
            <v-col cols="12" sm="" class="d-sm-flex align-center px-4">
              <v-card flat>
                <v-row no-gutters>
                  <v-col cols="12" sm="">
                    <v-card-title >
                      {{ person.name }}
                    </v-card-title>
                    <v-card-subtitle class=" text-overline">
                      {{ person.role }}
                    </v-card-subtitle>
                  </v-col>
                  <v-col cols="12" sm="8">
                    <v-card-text class="text--disabled  text-sm-right font-weight-bold">
                      <p v-for="(reference, index) in person.references" :key="index" class="ma-0">
                        {{ reference }}
                      </p>
                    </v-card-text>
                  </v-col>
                </v-row>

                <v-card-text class="line-height">
                  <p v-for="(text, index) in person.text" :key="index" class="text-justify">
                    <v-expand-transition>
                      <div v-if="person.showMore || index===0">
                        {{ text }}
                      </div>
                    </v-expand-transition>
                  </p>
                  <v-btn v-if="!person.showMore && person.text.length !==1" text @click="person.showMore=true">
                    more
                  </v-btn>
                  <v-btn v-if="person.showMore && person.text.length !==1" text @click="person.showMore=false">
                    less
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <!-- <p class="text-h5 mt-15">Research Partners</p> -->
    <v-list v-for="partner in partners" :key="partner.name">
      <v-subheader class="text-h6">{{partner.name}}</v-subheader>
      <v-list-item v-for="(member,index) in partner.members" :key="index">
        <v-list-item-content>
          <v-list-item-title >
            <a v-if="member.link" target="_blank" :href="member.link">{{member.name}}</a>
          <span v-else>{{member.name}}</span></v-list-item-title>

          <v-list-item-subtitle v-text="member.institute"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="partner.htmlContent" v-html="partner.htmlContent" class="d-block"></v-list-item>
    </v-list>
  </v-container>
</template>


<script>
export default {
  name: 'IndexVue',
  data() {
    return {
      team: [
        {
          name: 'Univ.-Prof. Dr. Deborah Klimburg-Salter',
          role: 'Project Director',
          references: [
            'University of Vienna / Harvard University ',
            'Universität Wien',
            'Institut für Kunstgeschichte',
            'Spitalgasse 2, Hof 9 (Campus), 1090 Wien',
          ],
          text: [
            'Klimburg-Salter received a PhD at Harvard University and Habilitation from the University of Vienna. She has taught the art history of South, Central, and Southeast Asia as well as Tibet and the Himalayan regions as Univ. Prof. at the University of Vienna’s Department of Art History and as Guest Professor at distinguished universities in Europe, North America, and Asia. She was founding Director of CIRDIS (Center for Interdisciplinary Research and Documentation of Inner and South Asia) at the University of Vienna until 2015, and since 2014, she has been an Associate of the Department of South Asian Studies, Harvard University. She is a Member of the Institute of Advanced Studies, Princeton; Fellow, Wissenschaftskolleg, Berlin; Fellow, Jawaharlal Nehru Institute of Advanced Studies (JNIAS), Delhi; and previously Visiting Fellow, Magdalen College, Oxford University. In 2020, she received the Austrian Academy of Sciences, Wilhelm Härtel Prize for her scholarly achievements in the field of Asian Art History. ',
            'Klimburg-Salter has conducted extensive fieldwork in Historical Northwest India, Afghanistan, and Tibet. Her interests in Translational Art History resulted in monographic studies of Buddhist monastic art and architecture in their art historical, geo-political, and transcultural contexts: (1989) The Kingdom of Bāmiyān: The Buddhist Art and Culture of the Hindu Kush; (1997) Tabo. A Lamp for the Kingdom.',
            'A longstanding interest in Technical Art History and conservation led to research and publications regarding the materiality of objects as well as the technology and processes of production, distribution, and consumption. This remains a central interest of her present research. She has curated a number of international exhibits accompanied by catalogues, including: (1982) The Silk Route and the Diamond Path: Esoteric Buddhist Art on the Trans-Himalayan Trade Routes; (1995) Buddha in Indien. Die frühindische Skulptur von König Aśoka bis zur Guptazeit; and most recently Alla scoperta del Tibet -- Le spedizioni di Giuseppe Tucci e i dipinti Tibetani / Discovering Tibet -- The Tucci Expeditions and Tibetan Painting (Rome and Genoa, 2015/2016); and as Unknown Tibet, the Tucci Expeditions and Buddhist Painting (New York, 2018). She co-curated Bön. Geister aus Butter -- Kunst und Ritual des alten Tibet (Vienna, 2013).',
            'Long-term research on the historical monuments of these different regional cultures led to an awareness of how the arts and monuments transformed and took on new meanings over time. Thus Klimburg-Salter has worked together with local communities to encourage heritage preservation and post-colonial cultural heritage awareness. She co-founded the Nako Research and Preservation Project and The Committee for the Scientific Study and Preservation of Tibetan Art and Historic Architecture, IATS (International Association for Tibetan Studies). Since 2003, she has worked with UNESCO projects related to heritage preservation in Afghanistan. Since 2005, she has directed the Kabul Museum Project, a capacity building and curatorial training project in collaboration with the National Museum of Afghanistan (Kabul) and CIRDIS.',
          ],
          image: 'team/Portrait_Klimburg_Salter.jpg',
          showMore: false,
        },
        {
          name:
            'HR Doz. Dr. Michael Alram',
          role:
            'National Research Partner',
          references:
            [
              'Art History Museum Vienna / Austrian Academy of Sciences',
              'Österreichische Akademie der Wissenschaften',
              'Österreichisches Archäologisches Institut, Abteilug Altertumswissenschaften',
              'Hollandstraße 11-13, 1020 Wien',
            ],
          text:
            [
              'Alram is a numismatist specializing in coinage of the Iranian world and Central Asia. He received his PhD from the University of Vienna’s Departments of Ancient Numismatics and Classical Archaeology. Since 2013, Alram has been Vice-president of the Austrian Academy of Sciences and Head of the Academy’s Division Documenta Antiqua, Institute for the Study of Ancient Culture. He was Director of the Coin Cabinet at the Kunsthistorisches Museum Wien from 2008 to 2020 and previously Curator for Byzantine, Medieval and Oriental Numismatics (1986-2008). He has served as President of the International Numismatic Council since 2015. He was recently named correspondant étranger of the Académie des Inscriptions et Belles-Lettres (2019) and recipient of the Archer M. Huntington Award of the American Numismatic Society (2016).',
            ],
          image: 'team/Portrait_Allram.jpg',
        },
        {
          name:
            'Doz. Mag. Dr. Klaus Vondrovec',
          references:
            [
              'Art History Museum Vienna / University of Vienna',
              'Kunsthistorisches Museum Wien',
              'Münzkabinett',
              'Burgring 5, 1010 Wien',
            ],
          text:
            [
              'Vondrovec is a numismatist of ancient coinage spanning Europe to Central and South Asia. He is Deputy Director and Curator at the Coin Cabinet of the Kunsthistorisches Museum Wien. Since 2004, Vondrovec has also been a lecturer at the University of Vienna’s Department of Numismatics and Monetary History, where he previously received his PhD and Habilitation. He has curated several exhibitions at the KHM, most recently ‘Böse Kaiser’ (2019). In addition to numerous articles, Vondrovec published two important monographs: Coinage of the Iranian Huns and their Successors from Bactria to Gandhara (4th to 8th century CE) (Vienna, 2014) and Die antiken Fundmünzen von Ovilavis/Wels (Vienna, 2003).',
            ],
          image: 'team/Portrait_Vondrovec.jpg',
        },
        {
          name:
            'Dr. Natasha Kimmet',
          references:
            [
              'Eskenazi Museum of Art, Indiana University (previously University of Vienna / Austrian Academy of Sciences)',
            ],
          text:
            [
              'Kimmet is an art historian of South Asia, Tibet, and the Himalayas. Her research interests include Buddhist art and architecture, the arts of Afghanistan and Historical Northwest India, vernacular architecture of Tibet and the Himalayas, and methodologies in borderland and cultural transfer studies. She completed her PhD at the University of Vienna with a dissertation offering the first documentation and historical examination of residential architecture on the high-altitude frontier of historical West Tibet (upper Kinnaur, India). Since 2024, she is Pamela Buell Curator of Asian Art at the Eskenazi Museum of Art at Indiana University. Previously, she was Curatorial Fellow at the Rubin Museum of Art (2015-2017) and taught Afghan art history and curatorial practice in the University of Vienna—National Museum of Afghanistan Kabul Museum Project (2018-2021). As Postdoctoral Researcher in the Shahi Project at the University of Vienna and the Austrian Academy of Sciences, Kimmet’s research concentrated on Buddhist clay-based sculpture. She is project manager of the Shahi Kingdoms Digital Research Platform and co-editor of the dual-format digital and print publication.',
            ],
          image:
            'https://shahimaterialculture.univie.ac.at/fileadmin/_processed_/csm_322_x_368_Kimmet_c3a0a92031.png',
        },
        {
          name:
            'Mag.phil. Malgorzata Lenko',
          references:
            [
              'University of Vienna, Department of Art History',
            ],
          text:
            [
              'Lenko is an art historian specializing in South and Southeast Asia. She is a PhD candidate at the University of Vienna’s Department of Art History where she received her MA with a thesis on the narrative Buddhist art of Borobudur (Central Java) and Tabo (Himachal Pradesh). In the Shahi Project, Lenko’s research focused on the production and enhancement technologies of portable metal sculptures. She managed the project’s financial and administrative processes and facilitated cooperation within the international network of collaborating scholars. She also contributed to the University of Vienna–National Museum of Afghanistan Kabul Museum Project (2018), overseeing selected administrative components. As Digital Editor, she was responsible for the development and integration of the project’s database and digital publication.',
            ],
        },
        // {
        //   name:
        //     'Aleksandra Apic, BA MA',
        //   references:
        //     [
        //       'University of Vienna, Department of Art History / CIRDIS',
        //     ],
        //   text:
        //     [
        //       'Apic is an art historian and PhD candidate in Chinese art at the University of Vienna’s Department of Art History. She is particularly interested in the materials and technologies of early and medieval Buddhist metal sculptures in South and East Asia as reflected in her MA thesis about a unique Buddhist metal sculpture from Historical Northwest India. In the Shahi project, Apic coordinates visual resources for the Shahi Kingdoms Database.',
        //     ],
        // },

      ],
      partners: [
        // {
        //   name: 'CIRDIS',
        //   members: [

        //     {
        //       name: 'Jürgen Schörflinger, BA',
        //       institute: 'University of Vienna, CIRDIS',
        //       link: 'https://ufind.univie.ac.at/en/person.html?id=32472',
        //     },

        //   ],
        // },
        {
          name: 'Research Partners',
          members: [
            {
              name: 'Prof. Dr. Minoru Inaba',
              institute: 'Kyoto University, Institute for Research in Humanities',
              link: 'https://kyoto-u.academia.edu/MinoruInaba',
            }, {
              name: 'Prof. Dr. Luca Maria Olivieri',
              institute: 'Ca’ Foscari University of Venice, Department of Asian, African, and Mediterranean Studies / ISMEO',
              link: 'https://www.unive.it/data/persone/23204589/curriculum',
            },
          ],
        },
        {
          name: 'Research Consultants',
          members: [
            {
              name: 'Arturo Annucci, laurea Magistrale',
              institute: 'Università degli studi Napoli “L’Orientale,” Dipartimento Asia, Africa e Mediterraneo',
              link: 'https://unior.academia.edu/ArturoAnnucci',
            }, {
              name: 'Mag. phil. Ludwig Maximilian Breuer',
              institute: 'Austrian Academy of Sciences, Austrian Centre for Digital Humanities and Cultural Heritage',
              link: '',
            }, {
              name: 'Prof. Dr. Nicola Di Cosmo',
              institute: 'Institute for Advanced Study, School of Historical Studies (Princeton, NJ)',
              link: 'https://www.ias.edu/scholars/di-cosmo',
            }, {
              name: 'Prof. em. Dr. Merton Flemings',
              institute: 'Massachusetts Institute of Technology, Department of Materials Science and Engineering',
              link: 'https://dmse.mit.edu/people/merton-c-flemings',
            }, {
              name: 'Prof. em. Dr. Adam Hardy, MA, Dip. Arch, Registered Architect',
              institute: 'Cardiff University, Welsh School of Architecture',
              link: 'https://www.cardiff.ac.uk/people/view/1254490-hardy-adam',
            }, {
              name: 'Dr. Gul Rahim Khan',
              institute: 'University of Peshawar, Department of Archaeology\n',
              link: 'https://upesh.academia.edu/GKhan',
            }, {
              name: 'Ass.-Prof. Mag. Dr. Karel Kriz',
              institute: 'University of Vienna, Department of Geography',
              link: 'https://homepage.univie.ac.at/karel.kriz/',
            },
            {
              name: 'Dr. Sonya Rhie Mace',
              institute: 'Cleveland Museum of Art, Indian and Southeast Asian Art',
              link: 'https://www.clevelandart.org/art/curators/sonya-rhie-mace',
            },
            {
              name: 'Ass.-Prof. Dr. Satoshi Naiki',
              institute: 'Kyoto University, Graduate School of Letters, Center for Studies of Cultural Heritage and Inter Humanities',
              link: 'https://kyouindb.iimc.kyoto-u.ac.jp/e/tR7fS',
            },
            {
              name: 'Dipl.-Ing. Uwe Niebuhr, BA MA',
              institute: 'University of Vienna, CIRDIS',
              link: 'https://univie.academia.edu/UweNiebuhr',
            },
            {
              name: 'Dr. Zafar Paiman',
              institute: 'Afghan National Institute of Archaeology',
              link: 'https://independent.academia.edu/ZafarPaiman',
            },
            {
              name: 'Director Fahim Rahimi, MA',
              institute: 'National Museum of Afghanistan\n',
              link: '',
            },
            {
              name: 'Ehsan Shavarebi, BA MA',
              institute: 'Art History Museum Vienna, Coin Cabinet',
              link: 'https://univie.academia.edu/EhsanShavarebi',
            },
            {
              name: 'Prof. Dr. Ingo Strauch',
              institute: 'Université de Lausanne, Department of Slavic and South Asian Studies / Interdisciplinary Centre of Religious Studies',
              link: 'https://applicationspub.unil.ch/interpub/noauth/php/Un/UnPers.php?PerNum=1138438&LanCode=8',
            },
            {
              name: 'Assoc. Prof. Dr. Yoko Taniguchi',
              institute: 'University of Tsukuba, Graduate School of Humanities and Anthropology',
              link: 'https://tsukuba.academia.edu/YokoTaniguchi',
            },
            // {
            //   name: 'Dr. Luke Treadwelll',
            //   institute: 'University of Oxford, Faculty of Oriental Studies',
            //   link: 'https://www.orinst.ox.ac.uk/people/luke-treadwell',
            // },
            // {
            //   name: 'Dr. Kurt Tropper',
            //   institute: 'Austrian Academy of Sciences',
            //   link: 'https://www.oeaw.ac.at/en/ikga/team/research/tropper-kurt',
            // },

            {
              name: 'Prof. Dr. Leonard van der Kuijp',
              institute: 'Harvard University, Department of South Asian Studies, Inner Asian and Altaic Studies',
              link: 'https://ealc.fas.harvard.edu/people/leonard-van-der-kuijp',
            },

            {
              name: 'Dr. Noémie Verdon',
              institute: 'University of Lausanne, Department of South Asian Studies',
              link: 'https://unil.academia.edu/No%C3%A9mieVerdon',
            },
            {
              name: 'Dr. Verena Widorn',
              institute: 'University of Vienna, Department of Art History / CIRDIS',
              link: 'https://univie.academia.edu/VerenaWidorn',
            },
          ],
        },
        {
          name: 'Materials and Technical Research Consultants',
          members: [
            {
              name: 'Assoc. Prof. Dr. Yoko Taniguchi',
              institute: 'University of Tsukuba, Research Center for West Asian Civilization',
              link: '',
            }, {
              name: 'Prof. Dr. Shigeo Yamada',
              institute: 'University of Tsukuba, Research Center for West Asian Civilization',
              link: '',
            }, {
              name: 'Dr. Susanne Ebbinghaus',
              institute: 'Harvard Art Museums',
              link: 'https://scholar.harvard.edu/ebbinghaus/home',
            }, {
              name: 'Dr. Katherine Eremin',
              institute: 'Harvard Art Museums',
              link: '',
            }, {
              name: 'Beth Edelstein',
              institute: 'Cleveland Museum of Art, Conservation Department',
              link: '',
            }, {
              name: 'Colleen Snyder',
              institute: 'Cleveland Museum of Art, Conservation Department',
              link: '',
            }, {
              name: 'Dr. Katharina Uhlir',
              institute: 'Kunsthistorisches Museum Wien (KHM), Department of Conservation Science',
              link: '',
            },
            {
              name: 'Rosa Heydenreich',
              institute: 'Kunsthistorisches Museum Wien (KHM), Department of Conservation Science',
              link: '',
            },
          ],
        },
        {
          name: "Publication Team",
          htmlContent: `
<span class="text-decoration-underline">Editors:</span> Natasha Kimmet and Noémie Verdon<br>

<span class="text-decoration-underline">Senior content editors:</span> Deborah Klimburg-Salter and Michael Alram<br>

<span class="text-decoration-underline">Digital editor:</span> Malgorzata Lenko<br>

<span class="text-decoration-underline">Technical evaluation:</span> Austrian Centre for Digital Humanities and Cultural Heritage (ACDH-CH)<br>

<span class="text-decoration-underline">Contributing authors:</span>
<a href="https://www.oeaw.ac.at/m/alram-michael" target="_blank">Michael Alram</a>,
<a href="https://cambridge.academia.edu/ArturoAnnucci" target="_blank">Arturo Annucci</a>,
<a href="https://arthistory.uchicago.edu/graduate/profiles/casalini" target="_blank">Alice Casalini</a>,
<a href="https://unior.academia.edu/AnnaFiligenzi" target="_blank">Anna Filigenzi</a>,
<a href="https://khm-at.academia.edu/MartinaGriesser" target="_blank">Martina Griesser</a>,
<a href="https://cardiff.academia.edu/AdamHardy" target="_blank">Adam Hardy</a>,
<a href="https://sfp.ethz.ch/about-us/people/ph-d--students/heydenreich--rosa.html" target="_blank">Rosa Heydenreich</a>,
<a href="https://www.phil.uni-wuerzburg.de/en/indologie/mitarbeiter/holz/" target="_blank">Kathrin Holz</a>,
<a href="https://kdb.iimc.kyoto-u.ac.jp/profile/en.952dcc856ab2bee8.html" target="_blank">Minoru Inaba</a>,
<a href="https://uni-erfurt.academia.edu/ElisaIori" target="_blank">Elisa Iori</a>,
M. Jentsch, Robert Keck,
<a href="https://upesh.academia.edu/GKhan" target="_blank">Gul Rahim Khan</a>,
<a href="https://artmuseum.indiana.edu/about/staff/_curatorial/kimmet-natasha.html" target="_blank">Natasha Kimmet</a>,
<a href="https://kunstgeschichte.univie.ac.at/personen/pensionierte-professoreninnen/klimburg-salter-deborah/" target="_blank">Deborah Klimburg-Salter</a>,
Malgorzata Lenko,
<a href="https://unior.academia.edu/MicheleMinardi" target="_blank">Michele Minardi</a>,
<a href="https://www.unive.it/data/people/23204589/curriculum" target="_blank">Luca M. Olivieri</a>,
<a href="https://www.oeaw.ac.at/en/oeai/institute/team/person/nikolaus-schindel" target="_blank">Nikolaus Schindel</a>,
<a href="https://khm-at.academia.edu/EhsanShavarebi" target="_blank">Ehsan Shavarebi</a>,
<a href="https://www.unil.ch/slas/ingostrauch" target="_blank">Ingo Strauch</a>,
<a href="https://khm-at.academia.edu/KatharinaUhlir" target="_blank">Katharina Uhlir</a>,
<a href="https://www.unil.ch/slas/fr/home/menuinst/collaborateursrices/collaborateurs-2/verdon-noemie.html" target="_blank">Noémie Verdon</a><br>

<span class="text-decoration-underline">Copyeditor:</span> Gregory Weeks
          `
        },
        {
          name: 'Digital Platform Development Contributors',
          members: [
            {
              name: 'Aleksandra Apic, BA MA',
              institute: 'University of Vienna, Department of Art History / CIRDIS',
              link: '',
            },
            {
              name: 'Mag. phil. Ludwig Maximilian Breuer',
              institute: 'Austrian Academy of Sciences, Austrian Centre for Digital Humanities and Cultural Heritage',
              link: '',
            },
            {
              name: 'Mag. rer. nat. Daniel Nell',
              institute: 'University of Vienna, Department of Geography and Regional Research',
              link: '',
            },
            {
              name: 'Uwe Niebuhr, MA',
              institute: 'University of Vienna, CIRDIS',
              link: '',
            },
            {
              name: 'Andreas Olschnögger, BSc',
              institute: 'Austrian Academy of Sciences, Austrian Centre for Digital Humanities and Cultural Heritage',
              link: '',
            },
            {
              name: 'Nina Richards, MA BSc',
              institute: 'Austrian Academy of Sciences, Austrian Centre for Digital Humanities and Cultural Heritage',
              link: '',
            },
            {
              name: 'Mag. Sandrina Schwarz, BA',
              institute: 'University of Vienna',
              link: '',
            },
            {
              name: 'Alexander Watzinger',
              institute: 'Austrian Academy of Sciences, Austrian Centre for Digital Humanities and Cultural Heritage',
              link: '',
            },
          ],
        },
        // {
        //   name: 'Website',
        //   members: [
        //     {
        //       name: 'Andrea Ennagi',
        //       institute: 'University of Vienna, Department of Art History',
        //       link: '',
        //     }],
        // },
      ],
    };
  },
};
</script>

<style >
.circle {
  clip-path: circle();
}

.line-height {
  line-height: 1.9;

}

.v-card__text, .v-card__title {
  word-break: normal !important;
}
</style>
