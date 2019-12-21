<template>
  <div style="height: 100%; ">
    <l-map
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 100%; "
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
      ref="mymap"
    >
      <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
      <l-tile-layer
        url="https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=8183f784df61be889152cf32c4ed4d8a"
        transparent="false"
      />
    </l-map>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer } from "vue2-leaflet";
export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer
  },
  props: {
    lat: String,
    lon: String
  },
  data() {
    return {
      zoom: 13,
      // center: latLng(47.41322, -1.219482),
      // url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      url:
        "https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=8183f784df61be889152cf32c4ed4d8a",
      // "https://maps.owm.io/map/precipitation_new/{z}/{x}/{y}.png?appid=8183f784df61be889152cf32c4ed4d8a",

      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: latLng(47.41322, -1.219482),
      withTooltip: latLng(47.41422, -1.250482),
      currentZoom: 11.5,
      currentCenter: latLng(47.41322, -1.219482),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true
    };
  },
  mounted() {
    this.$nextTick(() => {
      // this.$refs.mymap.mapObject.ANY_LEAFLET_MAP_METHOD();
    });
  },
  computed: {
    center() {
      return latLng(this.lat, this.lon);
    }
  },
  methods: {
    modalShown() {
      setTimeout(() => {
        this.$refs.mymap.mapObject.invalidateSize();
      }, 100);
    },
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick() {
      alert("Click!");
    }
  }
};
</script>
