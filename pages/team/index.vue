<template>
  <v-container class="pt-10">
    <h1 class="text-h4 pb-5">
      Meet the Project Team
    </h1>

    <p class="text-body-1">
      Based at the University of Vienna, Austrian Academy of Sciences, and Art History Museum
      Vienna, the Shahi project is directed by Univ.-Prof. Dr. Deborah Klimburg-Salter in cooperation with National
      Research Partner HR Doz. Dr. Michael Alram, Doz. Dr. Klaus Vondrovec, Dr. Natasha Kimmet, Mag. Malgorzata Lenko,
      and Aleksandra Apic, BA MA. This core team collaborates with a wider research network of over thirty scholars and
      museum professionals.
    </p>
    <v-row>
      <v-col
        v-for="(person,i) in $store.state.app.team"
        :key="i"
        cols="12"
      >
        <v-card flat>
          <v-img
            class="mr-sm-5"
            :class="{'float-left':$vuetify.breakpoint.mdAndUp}"
            max-width="400px"

            :src="person.image"
          />

          <v-card-title class="pl-0">
            {{ person.name }}
          </v-card-title>
          <v-card-subtitle class="pl-0">
            {{ person.role }}
          </v-card-subtitle>
          <v-card-text class="pl-0">
            <p v-for="(reference, index) in person.references" :key="index" class="ma-0">
              {{ reference }}
            </p>
          </v-card-text>

          <v-card-text class="px-0">
            <p v-for="(text, index) in person.text" :key="index">
              {{ text }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'IndexVue',
};
</script>

