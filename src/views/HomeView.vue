<template>
  <div class="home">
    <img alt="Vue logo" src="https://i.postimg.cc/sDhkDx1m/gamer.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>

<style>
 body {
  color: white;
 }
img {
  height: 300px;
  width: 300px;
}
</style>