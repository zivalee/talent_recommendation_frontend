<template>
    <div>
    <b-container class="mt-5">
      <h3>How to use:</h3>
      <p>
        Please give us information about your talent and the job role he applied for. 
        We will make analysis based on our model and give he or she a rating.
      </p>
      <!-- filter area-->
      <b-row>
        <b-col>
          <h4>Age</h4>
          <b-form-input v-model="age"></b-form-input>
        </b-col>
        <b-col>
          <h4>Gender</h4>
          <b-form-select v-model="genderSelected" :options="genderOptions"></b-form-select>
        </b-col>
        <b-col>
          <h4>Education</h4>
          <b-form-select v-model="educationSelected" :options="educationOptions"></b-form-select>
        </b-col>
        <b-col>
          <h4>EducationField</h4>
          <b-form-select v-model="fieldSelected" :options="fieldOptions"></b-form-select>
        </b-col>
        <b-col>
          <h4>TotalWorkingYears</h4>
          <b-form-input v-model="WorkingYears"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col>
          <h4>CompaniesWorked</h4>
          <b-form-input v-model="CompaniesWorked"></b-form-input>
        </b-col>
        <b-col>
          <h4>Department</h4>
          <b-form-select v-model="depSelected" :options="depOptions" @change="changeRole"></b-form-select>
        </b-col>
        <b-col>
          <h4>Job Role</h4>
          <b-form-select v-model="roleSelected" :options="roleOptions" @change="changeLevel"></b-form-select>
        </b-col>
        <b-col>
          <h4>Job Level</h4>
          <b-form-select v-model="levelSelected" :options="levelOptions"></b-form-select>
        </b-col>
        <b-col></b-col>
      </b-row>

      <b-row>
        <b-button @click="getResult" variant="warning" class="mt-3 ml-3">Submit</b-button>
      </b-row>

      <!-- result area-->
      <b-spinner v-if="spinner" :key="spinner" variant="primary" label="Spinning" class="mt-3 ml-3"></b-spinner>
      <div v-if="result" :key="rating" class="mt-2">
        <p>{{rating}}</p>
        <div v-if="rating===0">Predicted Attrition = 1, PerformanceRating = 3</div>
        <div v-else-if="rating===1">Predicted Attrition = 1, PerformanceRating = 4</div>
        <div v-else-if="rating===2">Predicted Attrition = 0, PerformanceRating = 3</div>
        <div v-else-if="rating===3">Predicted Attrition = 0, PerformanceRating = 4</div>
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
      age: null,
      WorkingYears: null,
      CompaniesWorked: null, 
      depSelected: null,
      roleSelected: null,
      levelSelected: null,
      genderSelected: null,
      fieldSelected: null,
      educationSelected: null,
      genderOptions: ["Male", "Female"],
      educationOptions: [1, 2, 3, 4],
      fieldOptions: ['Life Sciences', 'Medical', 'Marketing', 'Technical Degree', 'Human Resources', 'Other'],
      depOptions: ["Research & Development", "Sales", "Other"],
      roleOptions: [],
      levelOptions: [],
      result: 0,
      rating: 0,
      spinner: false,
      warning: false,
    };
  },
  methods: {
    getResult() {
      /* eslint-disable no-console */
      this.warning = false; // reset warning when submit again
      this.spinner = true; // show spinner
      this.result = 0;
      let param =
        "gender=" +
        this.genderSelected +
        "&education=" +
        this.educationSelected +
        "&education_field=" +
        this.fieldSelected+
        "&age=" +
        this.age +
        "&working_year=" +
        this.WorkingYears +
        "&company_num=" +
        this.CompaniesWorked+
        "&department=" +
        this.depSelected +
        "&job_role=" +
        this.roleSelected +
        "&job_level=" +
        this.levelSelected;
      if (this.genderSelected && this.educationSelected && this.fieldSelected && this.age && this.WorkingYears && this.CompaniesWorked && this.depSelected && this.roleSelected && this.levelSelected) {
        axios
          .get("https://ibm-analysis.herokuapp.com/predict?" + param)
          .then(response => {
            this.rating = response.data;
            this.result = 1;
            this.spinner = false;
          });
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
    }
  }
};
</script>

<style>
@import "app.css";
</style>
