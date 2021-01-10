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
      abortRequest: new AbortController()
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
  beforeDestroy() {
    // Abort fetch request when component unmount to avoid too many unnecessary fetch requests
    this.abortRequest.abort();
  },
  methods: {
    getUpdatedCachedData() {
      let uri = 'http://uni.test/api/universities/' + this.university.id;

      const signal = this.abortRequest.signal;
      fetch(uri, {signal})
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
          if (error.name === 'AbortError') {
            console.log('Fetch aborted');
          } else {
            console.error('There has been a problem with your fetch operation:', error);
          }
        });
    },
    updateCachedData() {
      // do not update if data are retrieved from source api or been removed
      if (Object.prototype.hasOwnProperty.call(this.university, 'id')) {
        const getData = this.getUpdatedCachedData;
        const ttl = this.university.ttl * 60 * 1000 + 5000; // add 5 seconds lapse to wait source data updated
        this.$timeouts.push(setTimeout(getData, ttl));
      }
    }
  }
}
</script>
