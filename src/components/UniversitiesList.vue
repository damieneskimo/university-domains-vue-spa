<template>
  <div class="text-lg border rounded w-1/2 mt-16 p-5 mx-auto bg-green-200">
    <input v-if="country" 
      v-model="keywords" 
      placeholder="Search by name or domain"
      class="border rounded w-1/3 px-3 py-1 float-right">

    <table class="mt-14 mx-auto clear-both">
      <thead>
        <tr>
          <th class="text-left px-10">Name</th>
          <th class="text-left">Domains</th>
        </tr>
      </thead>
      <tbody class="text-left">
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