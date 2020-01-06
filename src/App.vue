<template>
  <div id="app" class="layout">
    <b-navbar variant="info" type="dark">
      <b-navbar-brand>
        <h1 class="ml-5">We Recommend!</h1>
      </b-navbar-brand>
    </b-navbar>
    <b-container class="mt-5">
      <h3>How to use:</h3>
      <p>Please tell us what talent you are looking for by select the following parameters. 
        We will search in our linkenin profile database, make analysis based on our model and give our recommendation.</p>
      <!-- filter area-->
      <b-row>
        <b-col>
          <h3>Department</h3>
          <b-form-select v-model="depSelected" :options="depOptions"></b-form-select>
        </b-col>
        <b-col>
          <h3>Job Role</h3>
          <b-form-select v-model="roleSelected" :options="roleOptions"></b-form-select>
        </b-col>
        <b-col>
          <h3>Job Level</h3>
          <b-form-select v-model="levelSelected" :options="levelOptions"></b-form-select>
        </b-col>
      </b-row>
      <b-row>
        <b-button @click="getResult" variant="warning" class="mt-3 ml-3">Submit</b-button>
      </b-row>
      <!-- result area-->
      <b-spinner v-if="spinner" :key="spinner" variant="primary" label="Spinning" class="mt-3 ml-3"></b-spinner>

      <div v-if="result" :key="result" class="mt-2">
        <p :key="count">Recommendation : {{count}} out of {{total}}</p>
        <li v-for="i in recommend" :key="i.index">
          <a target="_blank" :href="i">{{i}}</a>
        </li>
      </div>
      <div v-if="warning" :key="warning" class="mt-2">
        <p>
          <b-badge variant="danger">Warning</b-badge> Please Select Every Parameter
        </p>
      </div>
      <br>
    </b-container>

    <div class="container-fluid footer">
      <p class="mt-3">The site use ibm dataset on kaggle to build model and scrape linkedin profiles for recommendation. For more info, visit 
        <a href="https://github.com/zivalee/ibm_frontend" target="_blank" style="color:orange"> Github Repository</a>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "app",
  data() {
    return {
      depSelected: null,
      roleSelected: null,
      levelSelected: null,
      depOptions: ["Research & Development", "Sales", "Other"],
      roleOptions: [
        "Healthcare Representative",
        "Human Resources",
        "Laboratory Technician",
        "Manager",
        "Manufacturing Director",
        "Research Director",
        "Research Scientist",
        "Sales Executive",
        "Sales Representative"
      ],
      levelOptions: [1, 2, 3, 4, 5],
      result: 0,
      spinner: false,
      warning: false,
      recommend: [],
      count: 0,
      total: 0
    };
  },
  methods: {
    getResult() {
      /* eslint-disable no-console */
      this.warning = false; // reset warning when submit again
      this.spinner = true; // show spinner
      this.recommend = []; // remove result when submit again
      let param =
        "department=" +
        this.depSelected +
        "&job_role=" +
        this.roleSelected +
        "&job_level=" +
        this.levelSelected;
      if (this.depSelected && this.roleSelected && this.levelSelected) {
        axios
          .get("https://ibm-analysis.herokuapp.com/predict?" + param)
          .then(response => {
            this.recommend = response.data.recommendation;
            this.count = this.recommend.length;
            this.total = response.data.total;
            this.spinner = false; // when get result, hide spinner
            // console.log(this.count);
          });
        this.result += 1;
      } else {
        this.warning = true; // if not selected, show warning
        this.spinner = false; // hide spinner
      }
    }
  }
};
</script>

<style>
@import "app.css"
</style>
