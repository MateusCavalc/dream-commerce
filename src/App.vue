<template>
  <page-header></page-header>
</template>

<script>
import pageHeader from "@/components/template/Header.vue";

export default {
  name: "App",
  components: {
    pageHeader,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
