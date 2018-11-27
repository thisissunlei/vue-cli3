<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <Page :current="1" :total="100"></Page>
  </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue'

  export default {
    name: 'home',
    components: {
      HelloWorld
    },
    mounted() {
      this.test();
    },
    methods: {
      test() {
        let a = 1;
        console.log(a)
        console.log(this.$baseUrl)
      }
    }
  }
</script>
