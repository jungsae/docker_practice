<template>
  <HeaderComponent></HeaderComponent>
  <router-view></router-view>
  <FooterComponent></FooterComponent>
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
export default {
  name: "App",
  components: {
    HeaderComponent,
    FooterComponent,
  },
};
</script>

<style></style>
