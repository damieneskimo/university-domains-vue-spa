<template>
  <div>
    <input v-if="country" v-model="keywords" placeholder="Search a university by name or domain">

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Domains</th>
        </tr>
      </thead>
      <tbody>
        <University 
          v-for="university in universities"
          :key="university.id"
          :name="university.name"
          :domains="university.domains" />
      </tbody>
    </table>
  </div>
</template>

<script>
  import University from './University'

  export default {
    name: 'UniversitiesList',
    components: {
      University
    },
    props: {
      country: String,
      universities: Array
    },
    data: function () {
      return {
        keywords: ''
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>