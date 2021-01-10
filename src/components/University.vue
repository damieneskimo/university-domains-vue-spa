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
    this.updateCachedData();
  },
  updated() {
    this.updateCachedData();
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
    },
    updateCachedData() {
      if (Object.prototype.hasOwnProperty.call(this.university, 'id')) {
        const getData = this.getUpdatedCachedData;
        // const ttl = this.university.ttl * 60 * 1000 + 5000; // add 5 seconds lapse to wait source data updated
        setTimeout(getData, 1000);
      }
    }
  }
}
</script>
