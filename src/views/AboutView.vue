<template>
  <div id="AboutView">
    <h1>This is an about page</h1>
    <button @click="click">test</button>
  </div>
</template>

<script>
// import axios from "axios";
import {local} from '@/Utils/axios.config'

export default {
  methods: {
    click: function () {
      local.post('api/upload', {
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