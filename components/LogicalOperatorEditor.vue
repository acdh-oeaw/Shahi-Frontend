<template>
  <div>
    <v-menu
      v-model="open"
      :close-on-content-click="false"
      offset-y
      bottom
      left
      content-class="elevation-0 rounded-0 pa-5 pt-2"
      transition="slide-y-transition"
      max-width="100vw"
      class="transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-icon id="icon" v-bind="attrs" v-on="on">
          in
          mdi-tune
        </v-icon>
      </template>
      <menu-window style="min-width:500px">
        <p class="text-h5">
          Connect your filters logically
        </p>
        <p class="text-body-1">
          Create groups and drag your filters into them to link them logically.
        </p>
        <div v-for="(list,index) in boxes" :key="index">
          <v-card
            v-if="index!==0"
            flat

            width="500px"
            class="text-center text-capitalize pointer secondary lighten-1 d-inline-block "
            @click="switchLogicalOperator(list)"
          >
            {{ list.logicalOperator }}
          </v-card>

          <div class="dragBox d-flex align-center">
            <div
              v-if="list.items.length !== 0"
              class="secondary pointer d-flex align-center justify-center insideButton"
              @click="switchLogicalOperatorInside(list)"
            >
              <span> {{ list.logicalOperatorInside }}</span>
            </div>

            <div
              v-else
              class="error lighten-2 pointer d-flex align-center justify-center insideButton"
              @click="removeList(index)"
            >
              <v-icon>mdi-delete</v-icon>
            </div>
            <draggable
              v-model="list.items"
              class="draggable d-flex flex-row flex-wrap align-center"
              :options="{group:'people'}"
            >
              <div v-for="el in list.items" :key="el.id" class="chip">
                <v-chip
                  label
                  small
                  class="mx-1 pointer"
                >
                  {{ el.en }}
                </v-chip>
              </div>
            </draggable>
            <span
              v-if="list.items.length ===0"
              class="info-text text-center text--secondary"
            > Drag Filters in here</span>
          </div>
        </div>

        <div class="d-flex flex-column mt-5">
          <v-fab-transition>
            <v-btn
              v-if="boxes.length <= 4"
              elevation="0"
              x-small
              fab
              color="secondary"
              class="black--text"
              @click="addBox"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-fab-transition>
          <v-btn elevation="0" class="black--text mt-5" color="secondary" @click="save">
            save
          </v-btn>
        </div>
      </menu-window>
    </v-menu>
    <info-window ref="infoWindow" message="Customize your filter with logical operators." target="#icon" />
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'LogicalOperatorEditor',
  components: { draggable },
  data() {
    return {
      open: false,
      boxes: [
        {
          id: 1, items: ['a', 'b', 'c'], logicalOperator: 'AND', logicalOperatorInside: 'OR',
        }],
      filters: [],
      steps: [{ target: '#icon', content: 'add some logic to your search' }],

    };
  },
  async mounted() {
    setTimeout(() => {
      this.$refs.infoWindow.show();
    }, 2000);
  },
  methods: {
    ...mapActions(
      {
        setFilters: 'query/setFilters',
      },
    ),
    addBox() {
      this.boxes.push({
        items: [], logicalOperator: 'AND', logicalOperatorInside: 'OR', id: Date.now(),
      });
    },
    switchLogicalOperator(item) {
      if (item.logicalOperator === 'AND') item.logicalOperator = 'OR';
      else item.logicalOperator = 'AND';
    },
    switchLogicalOperatorInside(item) {
      if (item.logicalOperatorInside === 'AND') item.logicalOperatorInside = 'OR';
      else item.logicalOperatorInside = 'AND';
    },
    removeList(index) {
      this.boxes.splice(index, 1);
    },
    updateFilters() {
      this.boxes = JSON.parse(JSON.stringify(this.getFilters));
    },
    save(value) {
      this.setFilters(JSON.parse(JSON.stringify(this.boxes)));
      this.open = false;
    },
  },
  computed: {
    ...mapGetters('query', [
      'getFilters',
      'getQuery',
      'getFiltersFlat',
    ]),

  },
  watch: {
    '$store.state.query.filters':
      {
        handler() {
          this.updateFilters();
        },
        immediate: true,
        deep:
true,
      },
    open() {
      this.$refs.infoWindow.hide();
    },
  }
  ,
};
</script>

<style scoped>
.dragBox {
  margin: 5px 0;
  background-color: rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  min-height: 50px;
  max-width: 500px;
  position: relative;
}

.pointer {
  cursor: pointer;
  user-select: none;
}

.info-text {
  position: absolute;

  right: 0;
  left: 52px;
}

.draggable {
  margin: 4px;
  min-height: 50px;
  z-index: 888;
  width: 100%;
}

.insideButton {

  align-self: stretch;
  width: 60px;
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
  transition: all ease 100ms;
}

.insideButton:hover {
  filter: brightness(90%);
}

.fade-enter-active, .fade-leave-active {
  transition: all .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}

</style>
