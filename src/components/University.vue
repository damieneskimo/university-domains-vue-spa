<template>
    <tr>
      <td>{{ name }}</td>
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
