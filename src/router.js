import Vue from "vue";
import Router from "vue-router";
import MainView from "./views/Main.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "main-view",
      component: MainView
    },
    {
      path: "/settings",
      name: "settings",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "settings" */ "./views/Settings.vue")
    },
    {
      path: "/history",
      name: "history",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "history" */ "./views/History.vue")
    },    
    {
      path: "/player",
      name: "player",
      props: true,
      component: () => import(/* webpackChunkName: "player" */ "./views/Player.vue")
    }   
  ]
});
