<template>
  <single-page-layout :item="item">
    <template #description>
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

      <p class="text-body-1 align-item-end" style="white-space: pre-line">
        {{ item.descriptions[0]?.value }}
      </p>

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
    }
  }
}
</script>

<style scoped>

</style>
