<template>
  <div id="app" class="mt-10 mb-40 mx-auto">
    <h1 class="text-5xl">University Domains List</h1>

    <select v-model="selectedCountry" @change="getUniversitiesData" class="mt-10 text-2xl border border-opacity-50 rounded-lg border-red-400 py-1 px-5">
      <option disabled value="">Please choose a country</option>
      <option>China</option>
      <option>New Zealand</option>
      <option>Russia</option>
      <option>United States</option>
    </select>

    <UniversitiesList :country="selectedCountry" :universities="universities" />
  </div>
</template>

<script>
import UniversitiesList from './components/UniversitiesList'

export default {
  name: 'App',
  components: {
    UniversitiesList
  },
  data: function () {
    return {
      selectedCountry: '',
      universities: []
    }
  },
  methods: {
    getUniversitiesData() {
      fetch('http://uni.test/api/universities?country=' + this.selectedCountry)
        .then(response => response.json())
        .then(data => this.universities = data)
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