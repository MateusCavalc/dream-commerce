<template>
  <page-header></page-header>
  <page-content></page-content>
  <page-features></page-features>
  <page-footer></page-footer>
</template>

<script>
import pageHeader from "@/components/template/Header.vue";
import pageContent from "@/components/template/Content.vue";
import pageFeatures from "@/components/template/Features.vue"
import pageFooter from "@/components/template/Footer.vue"

export default {
  name: "App",
  components: {
    pageHeader,
    pageContent,
    pageFeatures,
    pageFooter
  }
};
</script>

<style>
#app {
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
