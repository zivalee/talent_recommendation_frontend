<template>
  <div id="app" class="layout">
    <b-navbar variant="info" type="dark">
      <b-navbar-brand class="ml-5" to="/">We Recommend!</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item to="/analysis">Analysis</b-nav-item>
        <b-nav-item to="/recommend">Recommend</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    
    <router-view></router-view>

    <div class="container-fluid footer">
      <p class="mt-3">
        The site use ibm dataset on kaggle to build model and scrape linkedin profiles for recommendation. For more info, visit
        <a
          href="https://github.com/zivalee/ibm_frontend"
          target="_blank"
          style="color:orange"
        >Github Repository</a>
      </p>
    </div>
    
  </div>

</template>

<script>
export default {
  name: "app",
  components: {
  }
};
</script>

<style>
@import "app.css";
</style>