<template>
  <single-page-layout :item="item">
    <template #description>
      <div>
        <v-row>
          <v-col v-if="getType(item,'Place of production')" cols="auto"
                 class="d-block d-flex flex-column mb-3 flex-wrap">
            <span class="text-body-2 text--secondary">Place of production</span>
            <span class="text-body-1 font-weight-bold">{{ getType(item,'Place of production').label }}</span>
          </v-col>

          <v-col v-if="getRelation(item,'crm:P52 has current owner')" cols="6" class="d-block d-flex flex-column mb-3">
            <span class="text-body-2 text--secondary ">Current location</span>
            <span class="text-body-1 font-weight-bold">{{
                getRelation(item,'crm:P52 has current owner')?.label
              }} <span v-if="getInventoryNumber(item)?.relationDescription" class="text--secondary text-body-1">({{
                  getInventoryNumber(item)?.relationDescription
                }})</span> <a v-if="externalReference" :href="externalReference" target="_blank"><v-icon small>mdi-open-in-new</v-icon></a></span>
          </v-col>
        </v-row>
      </div>
      <div v-if="!!relatedArtifacts && relatedArtifacts.length !== 0" class="mt-auto">

      <span class="d-block text-body-2 text--secondary mb-1" role="button" @click="expanded = !expanded">
        Related Artifacts <v-icon :style="`rotate:${expanded ? '90deg' : '0deg'}`">mdi-chevron-right</v-icon>
      </span>
        <v-expand-transition>
          <div v-if="expanded">
            <v-chip label small color="secondary mr-2 mb-2" v-for="i in relatedArtifacts" :key="i.relationTo">
              <nuxt-link class=" text-body-2 go-to-map-button"
                         :to="i.relationTo.split('/').at(-1)">
                {{ i.label }}
              </nuxt-link>
            </v-chip>
          </div>
        </v-expand-transition>
      </div>


      <p class="text-body-1" style="white-space: pre-line">
        {{ item.descriptions[0]?.value }}
      </p>

      <div class="mt-auto">
        <div v-if="!!seeAlso && seeAlso.length !== 0">
      <span class="text-body-2 text--secondary ">
        See Also
      </span>
          <nuxt-link class="text-body-2 d-block go-to-map-button" v-for="i in seeAlso" :key="i.relationTo"
                     :to="'/' + i.relationTo.split('/').at(-1)">
            {{ i.label }}
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
  data() {
    return {
      expanded: false,
    }
  },
  methods: {
    getInventoryNumber(item) {
      return item.relations.find(x => x.relationType === "crm:P67i is referred to by" && x.label === "Inventory number")
    },
    getType(item,hierarchy){
      return item.types?.find(x => x.hierarchy.split(' > ')[0] === hierarchy)
    },
    getRelation (item,relationType) {
     return item.relations?.find(x => x.relationType === relationType);
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
