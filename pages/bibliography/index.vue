<template>
  <div class="page-content pt-10">
      <p class="title-1 pb-5">Biblioghraphy</p>
      <v-text-field v-model="search" label="Search"></v-text-field>
           <p>
           </p>
            <div class="text-body-1 mb-4"  v-for="item in filteredList.slice(page,page+20)" :key="item.id">
            
            <p class="font-weight-bold" v-if="!!item.author"> {{item.author.map(x => [x.family,x.given,x.literal].filter(Boolean).join(', ')).join('; ')}}</p>
            <p>{{item.title}}</p>
            <p class="text--secondary" v-if="!!item['collection-title']">In: {{item['collection-title']}}</p>
            <p class="text--secondary" v-if="!!item.volume">Volume: {{item.volume}}</p>
            <p class="text--secondary" v-if="!!item.page">Page(s): {{item.page}}</p>
            <p class="text--secondary" v-if="!!item.publisher">Publisher: {{item.publisher}}</p>
            <p class="text--secondary text-caption" v-if="!!item.issued && !!item.issued['date-parts']">{{item.issued['date-parts'][0][0]}}</p>
            
            </div>

            <v-pagination
                v-model="page"
                :length="Math.floor(filteredList.length / 20)"
      :total-visible="7"

            >

            </v-pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
name:'Bibliography',
data() {
    return{
        search:'',
        page:1,
    }
},
methods:{
    normalizeString(s){
        if(!s)
            return undefined
        if(s === '') return ''
        return s.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()
    }
},
computed:{
    ...mapGetters('app', [
      'getBibliography',
    ]),
    filteredList(){
        const search = this.normalizeString(this.search) || ''
        const a = this.getBibliography
        .filter(x => this.normalizeString(x?.title)?.includes(search) || 
                   this.normalizeString(x?.publisher)?.includes(search) || 
                   x?.author?.some(a =>  this.normalizeString(a?.family)?.includes(search)) ||
                   x?.author?.some(a =>  this.normalizeString(a?.given)?.includes(search)) 
                    )
        return a
    }
}
}
</script>

<style scoped>
p{
    margin: 0;
    padding: 0;
}
</style>