<template>
  <v-app id="inspire">
      <v-navigation-drawer
        v-model="drawer"
        :color="color"
        :expand-on-hover="expandOnHover"
        :mini-variant="miniVariant"
        :right="right"
        :src="bg"
        dark
        app
      >
        <v-list dense navclass="py-1">
          <v-list-item two-line :class="miniVariant && 'px-1'">
            <!-- <v-list-item-avatar>
              <img src="https://randomuser.me/api/portraits/women/81.jpg">
            </v-list-item-avatar> -->

            <v-list-item-content>
              <v-list-item-title>WIP</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </v-list>
      </v-navigation-drawer>

    <v-app-bar app color="#182C61" dark flat>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer></v-spacer>
        <v-toolbar-title right>Covid 19 - Data</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center" class="search-section" v-if="this.getStatus === false">
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
        <v-row align="center" justify="center" class="info-section">
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
      drawer: false,
      states: [],
      items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' },
          { title: 'Photos', icon: 'mdi-image' },
          { title: 'About', icon: 'mdi-help-box' },
        ],
        color: 'primary',
        colors: [
          'primary',
          'blue',
          'success',
          'red',
          'teal',
        ],
        right: false,
        miniVariant: false,
        expandOnHover: false,
        background: true,
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
      bg () {
        return this.background ? 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg' : undefined
      },
      getStates () {
        return this.$store.getters.getData
      },
      getStatus () {
        return this.$store.getters.getStatus
      }
    }
  }
</script>

<style lang="scss">
  .search-section {
    margin-top: 1rem;
  }

  .info-section {
    margin-top: -1rem;
  }
</style>