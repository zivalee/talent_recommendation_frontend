<template>
  <div id="app">
    <div class="row">
      <div class="column">
        <h2>Department</h2>
        <multiselect v-model="depSelected" :options="depOptions"></multiselect>
      </div>
      <div class="column">
        <h2>Job Role</h2>
        <multiselect v-model="roleSelected" :options="roleOptions"></multiselect>
      </div>
      <div class="column">
        <h2>Job Level</h2>
        <multiselect v-model="levelSelected" :options="levelOptions"></multiselect>
      </div>
    </div>
    <div class="column">
      <button @click="getResult">Submit</button>
    </div>
    <div v-if="result" :key="result">
      <li v-for="i in recommend" :key=i.index>
        <a target="_blank" :href="i" >{{i}}</a>
      </li>
    </div>
  </div>
</template>

<script>
import multiselect from "vue-multiselect";
import axios from "axios";

export default {
  name: "app",
  components: {
    multiselect
  },
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
      recommend: []
    };
  },
  methods: {
    getResult() {
      /* eslint-disable no-console */
      let param =
        "department=" +
        this.depSelected +
        "&job_role=" +
        this.roleSelected +
        "&job_level=" +
        this.levelSelected;
      axios
        .get("https://ibm-analysis.herokuapp.com/predict?" + param)
        .then(response =>{
          // console.log(response.data);
          this.recommend = response.data;
          console.log(this.recommend);
        });
      this.result += 1;
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
