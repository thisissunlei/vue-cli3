import Vue from 'vue';
import Router from 'vue-router';
import newRoute from './newRouter.js';
Vue.use(Router)
const myRoute = []
newRoute.routes = newRoute.routes.concat(myRoute);
//newRoute.mode='history';
export default new Router(newRoute)
