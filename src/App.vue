<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt=" Logo"
          class="shrink mr-2"
          contain
          :src="require('./assets/weatherapplong.svg')"
          transition="scale-transition"
          width="200"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn href="https://github.com/penguinprogramer" target="_blank" text>
        <span class="mr-2">Visit my Github</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <HelloWorld />
      <!-- <Map /> -->
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
// import Map from "./components/Map";

export default {
  name: "App",

  components: {
    HelloWorld
    // Map
  },

  data: () => ({
    //
  })
};
</script>
