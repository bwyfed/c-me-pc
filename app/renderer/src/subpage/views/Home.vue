<template>
  <div class="home">
    <img alt="Vue logo" :src="imgPath" />
    <HelloWorld msg="Welcome to Second App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import imgPath from '../assets/logo.png';
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
    return {
      imgPath
    };
  }
};
</script>
