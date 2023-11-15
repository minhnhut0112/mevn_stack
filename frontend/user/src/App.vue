<script>
import Header from "@/components/Header.vue";
export default {
  components: {
    Header,
  },
};
</script>

<template>
  <div id="app">
    <Header />
    <div class="">
      <router-view />
    </div>
  </div>
</template>

<style></style>
