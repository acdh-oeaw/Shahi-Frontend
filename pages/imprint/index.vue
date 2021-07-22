<template>
  <div style="max-width: 800px;" align="justify" class="mt-10 ma-auto"> 
    <div v-if="!imprint" lang="en">
    <h2>Legal disclosure according to §§ 24, 25 Austrian media law and § 5 E-Commerce law:</h2>
    <h3>Media owner, publisher, responsible for content and editorial office, service provider:</h3>
    <p>
        <a href="https://www.oeaw.ac.at/en/">Austrian Academy of Sciences</a><br>
        Corporate body organized under public law (BGBl 569/1921 idF BGBl I 130/2003)<br>
        <a href="https://acdh.oeaw.ac.at">Austrian Centre for Digital Humanities and Cultural Heritage (ACDH-CH)</a><br>
        Dr. Ignaz Seipel-Platz 2, 1010 Vienna, Austria<br>
        E-Mail: <a href="mailto:acdh-tech@oeaw.ac.at">acdh-tech@oeaw.ac.at</a>
    </p>
	<p>
	
	</p>
    <h3>Nature and purpose of the business:</h3>
    <p>
        The Austrian Academy of Sciences (OEAW) has the legal duty to support the sciences and humanities in every respect. As a learned society, the OEAW fosters discourse and cooperation between science and society, politics and economy.<br>
        The Austrian Centre for Digital Humanities and Cultural Heritage (ACDH-CH) is an OEAW institute founded with the goal to support digital methods in arts and humanities disciplines. The ACDH-CH supports digital research in manifold ways.<br>
        
    </p>
    <h3>Signing power:</h3>
    <p>
        President: Univ.-Prof. Dr. Anton Zeilinger<br>
        Vice president: Univ.-Doz. Dr. phil. Michael Alram<br>
        Class presidents: Univ.-Prof. Dr. phil. Oliver Jens Schmitt, Univ.-Prof. Dipl.-Ing. Dr.techn. Georg Brasseur<br>
        Supervisory body:  Academy council. For more information, please visit <a href="https://www.oeaw.ac.at/en/oeaw/bodies/academy-council/">https://www.oeaw.ac.at/en/oeaw/bodies/academy-council/</a>

    </p>
    <h3>Main aim:</h3>
    <p>
        This website is dedicated to providing information on the results emerging from this project.
    </p>
    <h3>Disclaimer:</h3>
    <p>
        The Austrian Academy of Sciences does not take responsibility for the nature, accuracy, entirety or quality of the provided information.<br>
        In the case of links to websites of other media owners, whose content the OEAW is neither directly nor indirectly responsible for, the OEAW does not assume liability for their content and excludes any liability in this case.
    </p>
    <h3>Copyright notice:</h3>
    <p>This website and its content is, unless indicated otherwise, licensed under a creative commons <a href="http://creativecommons.org/licenses/by/4.0/">CC-BY 4.0</a> International license (Attribution).</p>
    <h3>Data privacy notice:</h3>
    <p>This is a notice to indicate that for reasons of system security and overview of user behavior, personal data of users of this website (visiting period, operating system, browser version, browser resolution, country of origin, number of visits) will be stored using cookies and <a href="https://matomo.org/">Matomo tracking</a>. Data will be stored until further notice. Data will not be disseminated without your explicit consent.<br>
        By using this website, you agree to the manner and purposes of data processing. You can disable cookies in your browser settings. However, this might limit functionality of this website.<br>
        Please find the OEAW's detailed data privacy statement <a href="https://www.oeaw.ac.at/en/oeaw/data-protection/">here</a>.
        The contact data published in the context of the imprint duty may not be used to send promotional or informational material not explicitly requested. We explicitly disagree with this usage.
    </p>
</div>
    <div v-else v-html="imprint"></div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data() {
    return {
      imprint: ""
    };
  },
 mounted(){
     axios.get("https://shared.acdh.oeaw.ac.at/acdh-common-assets/api/imprint.php?serviceID=19381&outputLang=en")
     .then((response)=> this.imprint = response.data)
 }
};
</script>
