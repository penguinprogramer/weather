<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex xs12>
        <v-img :src="require('../assets/weatherapp.svg')" class="my-3" contain height="200"></v-img>
      </v-flex>

      <v-flex mb-4>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="8" md="8">
                <v-text-field v-model="locationField" label="Location" required></v-text-field>
              </v-col>
              <v-col cols="4" md="4">
                <v-btn
                  block
                  class="ma-2"
                  outlined
                  color="indigo"
                  @click="locate(locationField)"
                >Find</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-flex>

      <v-container fluid>
        <v-row>
          <v-card flex="4" class="mx-auto pa-2-ma-4" v-if="today" width="300">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="headline">Today</v-list-item-title>
                <v-list-item-subtitle>Sunrise: {{new Date(today.sys.sunrise*1000).getHours()}}:{{new Date(today.sys.sunrise*1000).getMinutes()}} Sunset:{{new Date(today.sys.sunset*1000).getHours()}}:{{new Date(today.sys.sunset*1000).getMinutes()}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-card-text>
              <v-row align="center">
                <v-col class="display-2" cols="6">{{Math.round(today.main.temp-273.15)}}&deg;C</v-col>

                <v-col class="display-1" cols="6">{{today.weather[0].description}}</v-col>
              </v-row>
            </v-card-text>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-send</v-icon>
              </v-list-item-icon>
              <v-list-item-subtitle>{{today.wind.speed}} km/h</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-cloud-download</v-icon>
              </v-list-item-icon>
              <v-list-item-subtitle>{{today.main.pressure}}hPa</v-list-item-subtitle>
            </v-list-item>

            <v-divider></v-divider>
          </v-card>

          <v-card flex="4" class="mx-auto pa-2-ma-4" width="400">
            <Map :lat="lat" :lon="lon" />
          </v-card>
          <v-card flex="4" class="mx-auto pa-2-ma-4" v-if="item" width="300">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title
                  class="headline"
                >{{new Intl.DateTimeFormat('en-US', { weekday: 'long'}).format( new Date(item.dt_txt)) }} {{new Date(item.dt_txt).getHours()}}:{{new Date(item.dt_txt).getMinutes()}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-card-text>
              <v-row align="center">
                <v-col class="display-2" cols="6">{{Math.round(item.main.temp-273.15)}}&deg;C</v-col>
                <v-col class="display-1" cols="6">{{item.weather[0].description}}</v-col>
              </v-row>
            </v-card-text>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-send</v-icon>
              </v-list-item-icon>
              <v-list-item-subtitle>{{item.wind.speed}} km/h</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-cloud-download</v-icon>
              </v-list-item-icon>
              <v-list-item-subtitle>{{item.main.pressure}}hPa</v-list-item-subtitle>
            </v-list-item>

            <v-divider></v-divider>
            <v-col cols="12">
              <v-slider v-model="period" min="0" max="39" label="Date"></v-slider>
            </v-col>
          </v-card>
        </v-row>
      </v-container>
      <!-- 
      <v-flex mb-5 xs12>
      <h2 class="headline font-weight-bold mb-3">weather</h2>-->

      <!-- <v-layout justify-center v-for="(next, i) in weather.list">
          <a :key="i" :href="next.href" class="subheading mx-3">{{ next.dt_txt }}</a>
      </v-layout>-->
      <!-- </v-flex> -->

      <!-- <v-flex xs12 mb-5>
        <h2 class="headline font-weight-bold mb-3">Important Links</h2>

        <v-layout justify-center>
          <a
            v-for="(link, i) in importantLinks"
            :key="i"
            :href="link.href"
            class="subheading mx-3"
            target="_blank"
          >{{ link.text }}</a>
        </v-layout>
      </v-flex>-->

      <!-- <v-flex xs12 mb-5>
        <h2 class="headline font-weight-bold mb-3">Ecosystem</h2>

        <v-layout justify-center>
          <Map :lat="lat" :lon="lon" />
        </v-layout>
      </v-flex>-->
    </v-layout>
  </v-container>
</template>
<style >
.v-card {
  margin-bottom: 10px;
}
</style>
<script>
import Map from "./Map";
// import { log } from "util";

export default {
  name: "HelloWorld",
  components: {
    Map
  },
  data: () => ({
    period: 0,
    locationField: "",
    location: {},
    weather: {},
    today: null,
    ecosystem: [
      {
        text: "vuetify-loader",
        href: "https://github.com/vuetifyjs/vuetify-loader"
      },
      {
        text: "github",
        href: "https://github.com/vuetifyjs/vuetify"
      },
      {
        text: "awesome-vuetify",
        href: "https://github.com/vuetifyjs/awesome-vuetify"
      }
    ],
    importantLinks: [
      {
        text: "Documentation",
        href: "https://vuetifyjs.com"
      },
      {
        text: "Chat",
        href: "https://community.vuetifyjs.com"
      },
      {
        text: "Made with Vuetify",
        href: "https://madewithvuejs.com/vuetify"
      },
      {
        text: "Twitter",
        href: "https://twitter.com/vuetifyjs"
      },
      {
        text: "Articles",
        href: "https://medium.com/vuetify"
      }
    ],
    whatsNext: [
      {
        text: "Explore components",
        href: "https://vuetifyjs.com/components/api-explorer"
      },
      {
        text: "Select a layout",
        href: "https://vuetifyjs.com/layout/pre-defined"
      },
      {
        text: "Frequently Asked Questions",
        href: "https://vuetifyjs.com/getting-started/frequently-asked-questions"
      }
    ]
  }),
  methods: {
    async locate(inp) {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search/${inp}?format=json&addressdetails=1&limit=1`
      );
      this.location = await response.json();
      await this.getweather(this.location[0].lat, this.location[0].lon);
      await this.gettoday(this.location[0].lat, this.location[0].lon);
    },
    async getweather(lat, lon) {
      try {
        // lat = lon;
        // lon = lat;
        // const response = await fetch(
        //   `https://api.darksky.net/forecast/526b5d3c722816b4aa42a37c69736de2/${lat},${lon}`
        // );
        const response = await fetch(
          `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=8183f784df61be889152cf32c4ed4d8a`
        );

        // const response = await fetch(
        //   `https://cors-anywhere.herokuapp.com/https://samples.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=b6907d289e10d714a6e88b30761fae22`
        // );
        // https://samples.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=b6907d289e10d714a6e88b30761fae22
        this.weather = await response.json();
      } catch (e) {
        alert(e);
      }
    },
    async gettoday(lat, lon) {
      try {
        // lat = lon;
        // lon = lat;

        const response = await fetch(
          `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8183f784df61be889152cf32c4ed4d8a`
        );
        this.today = await response.json();
      } catch (e) {
        alert(e);
      }
    }
  },
  computed: {
    item() {
      try {
        return this.weather.list[this.period];
      } catch {
        return null;
      }
    },
    lat() {
      try {
        return this.location[0].lat;
      } catch {
        return "0";
      }
    },
    lon() {
      try {
        return this.location[0].lon;
      } catch {
        return "0";
      }
    }
  }
};
</script>
