<template>
  <body>
    <div class="bg-light">
      <Header />
      <Main />
      <Footer />
    </div>
  </body>
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
body {
  margin: 0px;
  padding: 0px;
  width: 100%;
}
</style>