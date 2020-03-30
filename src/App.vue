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

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Covid 19 - Data</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" md="6">
            <line-chart nation="United Kingdom"></line-chart>
          </v-col>
           <v-col cols="12" md="6">
            <line-chart nation="Italy"></line-chart>
          </v-col>
        </v-row>
        <br>
        <v-row align="center" justify="center">
          <v-col cols="12" md="6">
            <line-chart nation="Spain"></line-chart>
          </v-col>
           <v-col cols="12" md="6">
            <line-chart nation="France"></line-chart>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
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
      drawer: null,
    })
  }
</script>