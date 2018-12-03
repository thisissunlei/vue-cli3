<template>
  <div id="app">
    <div class="layout"  :class="{'layout-hide-text': spanLeft < 5}">
      <div id="_layout_box_hander" ></div>
      <Row type="flex">
        <Col :span="spanRight">
        <div id="layout-content_id" class="layout-content" style="paddingLeft:180px;">
          <div id="layout-content-main" class="layout-content-main" :style="bodyStyle">
            <div id="nav">
              <router-link to="/">Home</router-link> |
              <router-link to="/about">About</router-link>
            </div>
            <router-view/>
          </div>
        </div>
        </Col>
      </Row>
    </div>
    <div class="layout-copy">
      <!-- | 京公网安备11010802012285号 -->
      &copy;  2011-2018 氪空间(北京)信息技术有限公司 | 京ICP备16012805号
    </div>
  </div>
</template>

<script>
  import {Row, Col} from 'iview';

  export default {
    name: 'App',
    data() {
      return {
        spanRight: 24,
        spanLeft: "",
        bodyStyle: {
          height: "auto",
          overflow: "auto"
        }
      };
    },
    components: {
      Row,
      Col
    },
    mounted() {
      vueNavRender(
        document.getElementById("_layout_box_hander"),
        document.getElementById("layout-content_id")
      );
      this.bodyStyle.height = document.documentElement.clientHeight - 130 + "px";
      window.onresize = () => {
        const dom = document.getElementById("layout-content-main");
        if (dom) {
          dom.style.height = document.documentElement.clientHeight - 130 + "px";
        }
      };
    },
    methods: {

    }
  }
</script>

<style lang="scss">

body {
  min-height: 100%;
  margin: 0;
  padding: 0;

  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
     text-align: center;
    color: #2c3e50;
  }
  .layout {
    min-height: 100%;
    overflow: hidden;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
  }

  .layout-content {
    padding-top: 63px;
  }
  .layout-content-main {
    min-height: 200px;
    background: #fff;
  }
  .layout-copy {
    text-align: center;
    /* padding: 10px 0 20px; */
    color: #9ea7b4;
    width: 100%;
    height: 40px;
    line-height: 40px;
    position: absolute;
    left: 0;
    bottom: 0;
    border-top: solid 1px #e8e9e9;
    background: #fff;
  }

  .layout-hide-text .layout-text {
    display: none;
  }
  .ivu-col {
    transition: width 0.2s ease-in-out;
  }

  #nav {
    padding: 30px;
    background: url($src + 'images/500.png');
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
}

</style>
