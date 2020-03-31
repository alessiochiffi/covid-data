<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="#182C61" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Covid 19 - Data</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center" v-if="this.getStatus === false">
          <v-col cols="12" md="6">
            <span v-for="item in states" :key="item.date">
              <v-combobox
                :items="item"
                v-model="select"
                label="Choose Nation"
                solo
                v-on:input="changeNation"
                autocomplete
              ></v-combobox>
            </span>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12" md="6">
            <line-chart :nation="selectedNation"></line-chart>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-footer color="black" app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import LineChart from './components/LineChart';

  export default {
    components: {
      LineChart
    },
    props: {
      source: String,
    },
    data: () => ({
      selectedNation: 'United Kingdom',
      drawer: null,
      states: []
    }),
    beforeMount() {
      this.$store.dispatch('fetchData');
      this.$store.subscribe((mutation) => {
        if (mutation.type === 'SET_DATA') {
          let statesList = Object.keys(this.getStates);
          this.states.push(statesList);
        }
      })
    },
    methods: {
      changeNation(value) {
        this.$store.dispatch('changeNation', value);
        return this.selectedNation = value;
      }
    },
    computed: {
      getStates () {
        return this.$store.getters.getData
      },
      getStatus () {
        return this.$store.getters.getStatus
      }
    }
  }
</script>