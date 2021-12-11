<template>
  <div id="imageViewer" class="imageViewer" />
</template>

<script>
import 'ol/ol.css';
import IIIF from 'ol/source/IIIF';
import IIIFInfo from 'ol/format/IIIFInfo';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';

export default {
  name: 'IIIFImageViewer',
  props: ['imageInfoUrl'],
  data() {
    return {
      layer: undefined,
      map: undefined,
    };
  },
  watch: {
    imageInfoUrl() {
      console.log('cahnegd');
      this.refreshMap();
    },
  },
  mounted() {
    this.layer = new TileLayer();
    this.map = new Map({
      layers: [this.layer],
      target: 'imageViewer',
    });
    this.refreshMap();
  },
  methods: {
    refreshMap() {
      fetch(this.imageInfoUrl)
        .then((response) => {
          response
            .json()
            .then((imageInfo) => {
              const options = new IIIFInfo(imageInfo).getTileSourceOptions();
              if (options === undefined || options.version === undefined) {
                console.log('Data seems to be no valid IIIF image information.');
                return;
              }
              options.zDirection = -1;
              const iiifTileSource = new IIIF(options);
              this.layer.setSource(iiifTileSource);
              this.map.setView(
                new View({
                  resolutions: iiifTileSource.getTileGrid().getResolutions(),
                  extent: iiifTileSource.getTileGrid().getExtent(),
                  constrainOnlyCenter: true,
                }),
              );
              this.map.getView().fit(iiifTileSource.getTileGrid().getExtent());
            })
            .catch((body) => {
              console.log(`Could not read image info json. ${body}`);
            });
        })
        .catch(() => {
          console.log('Could not read data from URL.');
        });
    },
  },
};
</script>

<style >
.ol-control button{
 color:black;
  position: relative;
 background-color: #b7bf96;
  margin-bottom: 8px;
  height:30px;
  width:30px;
  border-radius: 0;
  box-shadow: 0 3px 5px 5px rgba(0,0,0,0.2);

}
.ol-control{
  border-radius: 0;

  background-color:transparent;
}
.ol-control:hover{
  background-color:transparent;
}
.ol-control button:hover{
  background-color: #b7bf96;
  box-shadow: inset 0 0 0 10em rgba(0, 0, 0, 0.3);

}

.ol-control button:focus{
  background-color: #b7bf96;
  box-shadow: inset 0 0 0 10em rgba(0, 0, 0, 0.3);

}

</style>
