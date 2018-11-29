<template>
  <div class="home">
    <img alt="Vue logo" src="~images/home/logo.png">
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <Page :current="1" :total="100"></Page>
  </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue'
  import { Page } from 'iview';

  export default {
    name: 'home',
    components: {
      HelloWorld,
      Page
    },
    mounted() {
      this.test();
    },
    methods: {
      test() {
        let a = 1;
        console.log(a, 'test')
        console.log(this.$baseUrl)
      }
    }
  }
</script>
