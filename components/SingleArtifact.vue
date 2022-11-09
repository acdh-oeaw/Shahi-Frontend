<template>
  <single-page-layout :item="item">
    <template #description>
      <div>
        <v-row>
          <v-col v-if="item?.getType('Place of production')" cols="auto"
                 class="d-block d-flex flex-column mb-3 flex-wrap">
            <span class="text-body-2 text--secondary">Place of production</span>
            <span class="text-body-1 font-weight-bold">{{ item?.getType('Place of production')?.label }}</span>
          </v-col>

          <v-col v-if="item?.relation('crm:P52 has current owner')" cols="6" class="d-block d-flex flex-column mb-3">
            <span class="text-body-2 text--secondary ">Current location</span>
            <span class="text-body-1 font-weight-bold">{{
                item?.relation('crm:P52 has current owner')?.label
              }} <span v-if="getInventoryNumber(item)?.relationDescription" class="text--secondary text-body-1">({{
                  getInventoryNumber(item)?.relationDescription
                }})</span> <a v-if="externalReference" :href="externalReference" target="_blank"><v-icon small>mdi-open-in-new</v-icon></a></span>
          </v-col>
        </v-row>
      </div>
      <p class="text-body-1" style="white-space: pre-line">
        {{ item.descriptions[0]?.value }}
      </p>

      <div class="mt-auto">
        <div v-if="!!seeAlso && seeAlso.length !== 0">
      <span class="text-body-2 text--secondary ">
        See Also
      </span>
          <nuxt-link class="text-body-2 d-block" v-for="i in seeAlso" :key="i.relationTo"
                     :to="i.relationTo.split('/').at(-1)">
            {{ i.label }} {{ i.relationSystemClass }}
          </nuxt-link>
        </div>
        <div v-if="!!relatedArtifacts && relatedArtifacts.length !== 0" class="mt-auto">

      <span class="text-body-2 text--secondary ">
        Related Artifacts
      </span>
          <nuxt-link class="text-body-2 d-block" v-for="i in relatedArtifacts" :key="i.relationTo"
                     :to="i.relationTo.split('/').at(-1)">
            {{ i.label }} {{ i.relationSystemClass }}
          </nuxt-link>
        </div>
      </div>
    </template>
  </single-page-layout>
</template>

<script>
export default {
  name: "SingleArtifact",
  props: ['item'],
  methods: {
    getInventoryNumber(item) {
      return item.relations.find(x => x.relationType === "crm:P67i is referred to by" && x.label === "Inventory number")
    }
  },
  computed: {
    externalReference() {
      return this.item?.relations?.find(x => x.relationSystemClass === "external_reference")?.label
    },
    partOf() {
      return this.item.relations?.filter(x => x.relationType.startsWith('crm:P46'));
    },
    seeAlso() {
      return this.partOf.filter(x => x.relationSystemClass !== 'artifact');
    },
    relatedArtifacts() {
      return this.partOf.filter(x => x.relationSystemClass === 'artifact');
    },
  }
}
</script>

<style scoped>

</style>
