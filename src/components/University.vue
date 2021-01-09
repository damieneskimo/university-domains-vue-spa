<template>
    <tr>
      <td class="py-1 px-10">{{ name }}</td>
      <td>
        <a v-for="(domain, index) in domains" 
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

    }
  },
  props: {
    name: String,
    domains: Array
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
