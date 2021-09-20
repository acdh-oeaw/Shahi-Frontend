<template>
  <div>
    <v-row>
      <v-col cols="12" sm="5">
        <v-combobox v-model="from" item-value="value" label="from" :items="items" />
        <v-combobox v-model="to" label="to" :items="items" />
        <p class="d-flex align-center">
          <v-switch v-model="exactMatch" />
          needs to be an exact match
        </p>
      </v-col>
      <v-col cols="12" sm="5" class="d-flex align-center">
        <v-range-slider
          v-model="slidervalue"
          class="large-slider"
          vertical
          step="1"
          max="10"
          min="0"
          :tick-labels="items.map(x=>x.text)"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'FilterWindowTimeSelection',
  props: ['value'],
  data() {
    return {
      from: '',
      to: '',
      slidervalue: [1, 3],
      exactMatch: false,
      items: [
        { text: '2nd century', value: '0100-01-01' },
        { text: '3rd century', value: '0200-01-01' },
        { text: '4th century', value: '0300-01-01' },
        { text: '5th century', value: '0400-01-01' },
        { text: '6th century', value: '0500-01-01' },
        { text: '7th century', value: '0600-01-01' },
        { text: '8th century', value: '0700-01-01' },
        { text: '9th century', value: '0800-01-01' },
        { text: '10th century', value: '0900-01-01' },
        { text: '11th century', value: '1000-01-01' },
        { text: '11th century', value: '1000-01-01' },
        { text: '12th century', value: '1100-01-01' },
        { text: '13th century', value: '1200-01-01' },
        { text: '14th century', value: '1300-01-01' },
      ],
    };
  },
  watch: {
    from: {
      handler() {
        this.value[0].value = this.from.value;
      },
      deep: true,
    },
    to: {
      handler() {
        this.value[1].value = this.to.value;
      },
      deep: true,
    },
    exactMatch() {
      if (this.exactMatch) {
        this.value[0].logicalOperator = 'eq';
        this.value[1].logicalOperator = 'eq';
      } else {
        this.value[0].logicalOperator = 'ge';
        this.value[1].logicalOperator = 'le';
      }
    },
    slidervalue() {
      this.from = this.items[this.slidervalue[0]];
      this.to = this.items[this.slidervalue[1]];
    },
  },
  created() {
    if (this.value[0].value) this.from = this.items.find((x) => x.value === this.value[0].value);
    if (this.value[1].value) this.to = this.items.find((x) => x.value === this.value[1].value);
  },
};
</script>

<style scoped>
</style>
