<template>
  <v-tooltip
    right
    max-width="400px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-icon
        small
        :color="color"
        v-bind="attrs"
        v-on="on"
      >
        <slot> mdi-help-circle-outline</slot>
      </v-icon>
    </template>
    {{ text }}
  </v-tooltip>
</template>

<script>
export default {
  name: 'TooltipIcon',
  props: {
    text: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: undefined,
    },
  },
};
</script>

<style scoped>

</style>
