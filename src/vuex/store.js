import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)

const state={
	data:[],
	dataIsSet:false,
	domain:"extrawebdev",
	offset:0,
	requestErrorExist:false
}	
const mutations = {
	pushToData(state,response){
		for(let item in response.response.data.response.items){
			state.data.push(response.response.data.response.items[item]);
		}
	},
	removeAllData(state){
		state.data = [];
	},
	changeDomain(state,newDomain){
		console.log(newDomain);
		state.domain = newDomain;
		state.offset = 0;
	},
	incrementOffset(state){
		state.offset+=20;
	},
	changeRequestErrorExistToFalse(state){
		state.requestErrorExist = false;
	},
	changeRequestErrorExistToTrue(state){
		state.requestErrorExist = true;
	}
}

export default new Vuex.Store({
  state,
  mutations,

})      