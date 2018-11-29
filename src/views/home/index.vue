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
  import {Page} from 'iview';

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
        const a = 1;
        console.log(a, 'test')
        console.log(this.$baseUrl);
        this.$http.get("test-get", {name: 1})
          .then(response => {
            console.log('response', response);
          })
          .catch(err => {
            console.log('error', err);
          });
      }
    }
  }
</script>
