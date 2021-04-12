<template>
  <div id="app" class="mt-10 mb-40 mx-auto">
    <h1 class="text-5xl">University Domains List</h1>

    <select v-model="selectedCountry" @change="changeCountryHandler()" class="mt-10 text-2xl border border-opacity-50 rounded-lg border-red-400 py-1 px-5">
      <option disabled value="">Please choose a country</option>
      <option>China</option>
      <option>New Zealand</option>
      <option>Russia</option> <!-- will show error message when selected -->
      <option>United States</option>
    </select>

    <Loader v-if="loading" class="mx-auto mt-10"/>

    <div v-if="!loading" class="w-1/2 mx-auto">
      <div v-if="selectedCountry" class="mt-14 text-left ">
        <h3 class="text-xl inline-block mb-4">Universities in {{ selectedCountry }}</h3>
        <button class="border rounded px-3 py-1 bg-gray-100 ml-2" @click="getUniversitiesData(true)">Force update from source API</button>
      </div>

      <div v-if="selectedCountry" class="text-lg border rounded p-5 bg-green-200">
        <p v-if="errorMessage">{{ errorMessage }}</p>
        <UniversitiesList v-else :country="selectedCountry" :universities="universities" />
      </div>
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
      selectedCountry: this.getUrlQueryString('country'),
      universities: [],
      errorMessage: '',
      loading: false,
    }
  },
  methods: {
    changeCountryHandler() {
      this.getUniversitiesData();

      // update url with query string
      this.updateUrlQueryString('country', this.selectedCountry);
    },
    getUniversitiesData(fromSourceApi = false) {
      this.loading = true;

      let uri = 'http://uni.test/api/universities?country=';
      if (fromSourceApi) {
        uri = 'http://universities.hipolabs.com/search?country=';
      }

      fetch(uri + this.selectedCountry)
        .then(response => {
          if (response.status == 200) {
            this.errorMessage = '';
            response.json().then(data => {
              this.universities = fromSourceApi? data: data.data
            })
          } else {
            this.universities = [];
            response.json().then(data => this.errorMessage = data.message)
          }
          this.loading = false;
        })
        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
        });
    },
    getUrlQueryString(key) {
      let searchParams = new URLSearchParams(window.location.search);
      let queryString = searchParams.get(key);
      
      return queryString === null? '' : queryString;
    },
    updateUrlQueryString(key, value) {
      let searchParams = new URLSearchParams(window.location.search);

      if (searchParams.has(key)) {
        searchParams.set(key, value);
      } else {
        searchParams.append(key, value);
      }
      let newUrl = window.location.pathname + '?' + searchParams.toString();

      history.replaceState(null, null, newUrl);
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
