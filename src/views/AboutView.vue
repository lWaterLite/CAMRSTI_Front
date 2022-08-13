<template>
  <div id="AboutView">
    <h1>This is an about page</h1>
    <button @click="click">test</button>
  </div>
</template>

<script>
import {getPhaseData} from "@/Utils/http.aciton"

export default {
  methods: {
    click: function () {
      getPhaseData('11Y1:8', this);
    }
  }
}
</script>