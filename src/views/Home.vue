<template>
  <div class="home">
    <img src="https://e7.pngegg.com/pngimages/609/174/png-clipart-shadowrun-dragonfall-shadowrun-returns-logo-emblem-others-emblem-logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
