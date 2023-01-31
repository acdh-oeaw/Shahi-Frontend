<template>
  <single-page-layout :item="item">
    <template #description>
      <p class="text-body-1" style="white-space: pre-line">{{item.descriptions[0]?.value }}</p>
      <div v-if="!!seeAlso && seeAlso.length !== 0">
      <span class="text-body-2 text--secondary">
        See also
      </span>
      <nuxt-link class="text-body-2 d-block" v-for="i in seeAlso" :key="i.relationTo"
                 :to="'/' + i.relationTo.split('/').at(-1)">
        {{ i.label }}
      </nuxt-link>
      </div>

    </template>
  </single-page-layout>
</template>

<script>
export default {
  name: "SingleArtifact",
  props: ['item'],
  computed: {
    seeAlso() {
      return this.item.relations?.filter(x => x.relationType.startsWith('crm:P46'));
    }
  }
}
</script>

<style scoped>

</style>
