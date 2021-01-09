<template>
  <div>
    <input v-model="keywords" 
      placeholder="Search by name or domain"
      class="border rounded w-1/3 px-3 py-1 float-right mb-5">

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