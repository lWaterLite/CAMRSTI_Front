<template>
  <div id="AboutView">
    <h1>This is an about page</h1>
    <button @click="click">test</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  methods: {
    click: function () {
      axios.post('http://127.0.0.1:5000/api/upload', {
        'firstName': 'Fred',
        'lastName': 'Flintstone'
      })
          .then(function (response) {
              console.log(response);
          })
          .catch(function (err) {
            console.log(err)
          })
    }
  }
}
</script>