<template>
  <single-page-layout :item="item">
    <template #description>
 

    </template>
  </single-page-layout>
</template>

<script>
export default {
  name: "SingleArtifact",
  props: ['item'],
  data() {
    return {
      expanded: false,
    }
  },
  methods: {

  },
  computed: {
    
  }
}
</script>
