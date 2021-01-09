<template>
  <div id="app" class="mt-10 mb-40 mx-auto">
    <h1 class="text-5xl">University Domains List</h1>

    <select v-model="selectedCountry" @change="getUniversitiesData" class="mt-10 text-2xl border border-opacity-50 rounded-lg border-red-400 py-1 px-5">
      <option disabled value="">Please choose a country</option>
      <option>China</option>
      <option>New Zealand</option>
      <option>Russia</option> <!-- will show error message when selected -->
      <option>United States</option>
    </select>

    <Loader v-if="loading" class="mx-auto mt-10"/>

    <div v-if="selectedCountry && !loading" class="text-lg border rounded w-1/2 mt-16 p-5 mx-auto bg-green-200">
      <p v-if="errorMessage">{{ errorMessage }}</p>
      <UniversitiesList v-else :country="selectedCountry" :universities="universities" />
    </div>
  </div>
</template>

<script>
import Loader from './components/Loader.vue';
import UniversitiesList from './components/UniversitiesList'

export default {
  name: 'App',
  components: {
    UniversitiesList,
    Loader
  },
  data: function () {
    return {
      selectedCountry: '',
      universities: [],
      errorMessage: '',
      loading: false,
    }
  },
  methods: {
    getUniversitiesData() {
      this.loading = true;

      fetch('http://uni.test/api/universities?country=' + this.selectedCountry)
        .then(response => {
          if (response.status == 200) {
            this.errorMessage = '';
            response.json().then(data => this.universities = data)
          } else {
            response.json().then(data => this.errorMessage = data.message)
          }
          this.loading = false;
        })
        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
        });
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>