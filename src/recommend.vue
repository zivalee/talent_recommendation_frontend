<template>
    <div>
    <b-container class="mt-5">
      <h3>How to use:</h3>
      <p>
        Please tell us what talent you are looking for by select the following parameters.
        We will search in our linkenin profile database, make analysis based on our model and give our recommendation.
      </p>
      <!-- filter area-->
      <b-row>
        <b-col>
          <h3>Department</h3>
          <b-form-select v-model="depSelected" :options="depOptions" @change="changeRole"></b-form-select>
        </b-col>
        <b-col>
          <h3>Job Role</h3>
          <b-form-select v-model="roleSelected" :options="roleOptions" @change="changeLevel"></b-form-select>
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
          <b-badge variant="danger">Warning</b-badge>Please Select Every Parameter
        </p>
      </div>
      <br />
    </b-container>
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
      depOptions: ["Research & Development", "Sales", "Human Resource"],
      roleOptions: [],
      levelOptions: [],
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
          .get("https://ibm-analysis.herokuapp.com/recommend?" + param)
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
    },
    changeRole() {
      switch (this.depSelected) {
        case "Research & Development":
          this.roleOptions = [
            "Healthcare Representative",
            "Laboratory Technician",
            "Manager",
            "Manufacturing Director",
            "Research Director",
            "Research Scientist"
          ];
          break;
        case "Sales":
          this.roleOptions = [
            "Sales Representative",
            "Sales Executive",
            "Manager",
          ];
          break;
        case "Human Resource":
          this.roleOptions = [
            "Human Resources",
            "Manager",
          ];
          break;
      }
    },
    changeLevel(){
      switch(this.roleSelected){
        case "Healthcare Representative":
            this.levelOptions = [2, 3, 4];
          break;
        case "Laboratory Technician":
            this.levelOptions = [1, 2, 3];
          break;
        case "Manufacturing Director":
            this.levelOptions = [2, 3, 4];
          break;
        case "Research Director":
            this.levelOptions = [3, 4, 5];
          break;
        case "Research Scientist":
            this.levelOptions = [1, 2, 3];
          break;
        case "Sales Representative":
            this.levelOptions = [1, 2];
          break;
        case "Sales Executive":
            this.levelOptions = [2, 3, 4];
          break;
        case "Human Resources":
            this.levelOptions = [1, 2, 3];
          break;
        case "Manager":
          if (this.depSelected === "Human Resource"){
            this.levelOptions = [4, 5];
          }
          else{
            this.levelOptions = [3, 4, 5];
          }
          break;
      }
      /* eslint-disable no-console */
      console.log(this.levelOptions);
    }
  }
};
</script>

<style>
@import "app.css";
</style>
