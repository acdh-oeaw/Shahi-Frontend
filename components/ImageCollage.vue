<template>
  <div class="collage-wrapper">
    <div class="collage-root">
      <div
        v-for="(item, index) in filteredItems"
        :key="index"
        :class="`collage-image-${index+1} d-flex align-center justify-center`"

        @click="$router.push(`/single/${id(item)}`)"
      >
        <img class="collage-image"  style="max-height: 100%;max-width:100%" :src="item.features[0].depictions[0].url">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageCollage',
  props: {
    items: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      demoImages: [
        {
          name: '1',
          image: 'https://shahi-img.acdh-dev.oeaw.ac.at/iiif/images/artefacts/1/1.jp2/full/200,/0/default.png',
        },
        {
          name: '2',
          image: 'https://images.unsplash.com/photo-1615234761870-8d4a0e89084d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
        },
        {
          name: '3',
          image: 'https://images.unsplash.com/photo-1581873781596-5644533d3abd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXJ0aWZhY3R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800',
        },
        {
          name: '4',
          image: 'https://images.unsplash.com/photo-1633785585011-7a1b378177bd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        },
        {
          name: '5',
          image: 'https://images.unsplash.com/photo-1632748231978-57f2db9874f4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        },
        {
          name: '6',
          image: 'https://shahi-img.acdh-dev.oeaw.ac.at/iiif/images/artefacts/2/1.jp2/full/200,/0/default.png',
        },
      ],
    };
  },
  computed: {
    filteredItems() {
      console.log(this.items.filter((x) => x.features[0].depictions));
      return this.items.filter((x) => x.features[0].depictions);
    },
  },
  methods: {
    id(item) {
      return item.features[0]['@id'].split('/').splice(-1)[0];
    },
  },
};
</script>

<style scoped>
.collage-wrapper {
  position: relative;
  height: 600px;
  width: 100%;

}

.collage-root {
  position: relative;
  top: calc(45% - 4.6875em);
  left: calc(50% - 4.0625em);
  margin: auto;

}

.collage-image {
  box-shadow: 0 0.7em 1em 1px rgba(0, 0, 0, 0.2);

  cursor: pointer;
  font-size: 18px;
  transition: all 100ms ease-in-out;
}

.collage-image:hover {
  box-shadow: 0 0.7em 1em 1px rgba(0, 0, 0, 0.2),
  0 0.7em 1em 1px rgba(0, 0, 0, 0.2);
  transform: translateY(-0.2em) scale(1.02);
}
div[class^="collage-image-"]{
  position: absolute;
}
.collage-image-1 {
  max-width: 8.225em;
  max-height: 9.375em;
}

.collage-image-2 {
  top: 1.25em;
  left: 9.375em;
  max-width: 7.8125em;
  max-height:  6.25em;
}

.collage-image-3 {
  top: 8.625em;
  left: -0.875em;
  width: 10.625em;
  height: 7.25em;
}

.collage-image-4 {
  top: -2.5em;
  left: -8.75em;
  max-width: 7.5em;
  max-height: 6.25em;
}

.collage-image-5 {
  top: 5em;
  left: -8.125em;
  max-width: 7.5em;
  max-height: 5em;
}

.collage-image-6 {
  top: -7.5em;
  left: -0.625em;
  max-width: 7.5em;
  max-height: 5.9375em;
}

.collage-image-7 {
  top: -10em;
  left: 8.75em;
  max-width: 9.375em;
  max-height: 9.375em;
}

.collage-image-8 {
  top: 13.75em;
  left: 10em;
  max-width: 11.25em;
  max-height: 7.5em;
}

.collage-image-9 {
  top: 12.5em;
  left: -11.25em;
  max-width: 8.75em;
  max-height: 7.5em;
}

.collage-image-10 {
  top: 6em;
  left: 18em;
  max-width: 10em;
  max-height: 6.5em;
}

.collage-image-11 {
  top: -5em;
  left: 19em;
  max-width: 6.9em;
  max-height: 10em;
}

.collage-image-12 {
  top: -2.5em;
  left: -16.5em;
  max-width: 7em;
  max-height: 7em;
}

.collage-image-13 {
  top: 5em;
  left: -15em;
  max-width: 6em;
  max-height: 7em;
}

.collage-image-14 {
  top: -10em;
  left: -10em;
  max-width: 8.5em;
  max-height: 7em;
}

</style>
