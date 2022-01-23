<template>
  <Header />
  <Main />
  <Footer />
</template>

<script>
import Header from "./components/Header.vue";
import Main from "./components/Main.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Main,
    Footer,
  },
};
</script>

<style>
Footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}
Header {
  top: 0;
  width: 100%;
}
</style>