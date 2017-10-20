import { polyfill } from 'es6-promise'
polyfill()

import Vue from 'vue';
import App from './components/App.vue'
import Vuex from 'vuex'
import axios from 'axios'
import 'materialize-css/dist/js/materialize.js'
import 'materialize-css/dist/css/materialize.css'
import store from './vuex/store'

Vue.use(Vuex);

new Vue ({
	el:'#app',
	store,
	render: h => h(App)
})

