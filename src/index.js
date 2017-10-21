import { polyfill } from 'es6-promise'
polyfill()

import Vue from 'vue';
import App from './components/App.vue'
import Vuex from 'vuex'
import axios from 'axios'
import 'materialize-css/dist/js/materialize.js'
import 'materialize-css/dist/css/materialize.css'
import store from './vuex/store'
import {VueMasonryPlugin} from 'vue-masonry';
import infiniteScroll from 'vue-infinite-scroll';

Vue.use(infiniteScroll);
Vue.use(VueMasonryPlugin);
Vue.use(Vuex);

new Vue ({
	directives: {infiniteScroll},
	el:'#app',
	store,
	render: h => h(App)
})

