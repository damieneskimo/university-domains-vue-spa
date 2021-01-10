<template>
  <div>
    <input v-model="keywords"
      placeholder="Search by name or domain"
      class="border rounded w-1/3 px-3 py-1 float-right mb-5">

    <table class="mt-14 mx-auto clear-both w-full">
      <thead>
        <tr>
          <th class="text-left px-10 w-2/3">Name</th>
          <th class="text-left w-1/3">Domains</th>
        </tr>
      </thead>
      <tbody class="text-left">
        <University v-for="university in filteredUniversities" :key="university.id" :data="university" />
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
    computed: {
      filteredUniversities() {
        return this.universities.filter(university => {
          let haystack = (university.name + ' ' + university.domains.join(' ')).toLowerCase();
          return haystack.includes(this.keywords.toLowerCase())
        })
      }
    }
  }
</script>
