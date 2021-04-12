<template>
  <tr v-if="Object.keys(university).length != 0">
    <td class="py-1 px-10">{{ university.name }}</td>
    <td>
      <a v-for="(domain, index) in university.domains" 
        :key="index" :href="'//' + domain"
        class="block hover:underline"
        target="_blank"
        >{{ domain }}</a>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'University',
  data: function () {
    return {
      university: Object.assign({}, this.data),
    }
  },
  props: {
    data: Object,
  },
  mounted() {
    window.Echo.channel('university.domains.' + this.university.id)
    .listen('.UniversityCacheUpdated', (e) => {
        console.log(e)
        this.university = e.university
    })
    .listen('.UniversityCacheDeleted', (e) => {
        console.log(e)
        this.university = {}
    })
  },
  methods: {
    getUpdatedCachedData() {
      let uri = 'http://uni.test/api/universities/' + this.university.id;

      fetch(uri)
        .then(response => {
          if (response.status == 200) {
            response.json().then(data => {
              const university = data.data
              this.university.name = university.name
              this.university.domains = university.domains
            })
          } else {
            // remove from the list if the university is not found
            this.university = {}
          }
        })
        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
        });
    }
  }
}
</script>
