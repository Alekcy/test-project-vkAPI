<style>
    body{
        background-color: #E9E9E9
    }
</style>
<template>
	<div>
		<div class="container">
            <Search v-on:load="load"></Search>
            <div v-infinite-scroll="load" infinite-scroll-disabled="busy" infinite-scroll-distance="200">
                <Grid></Grid>
            </div>
        </div>  
	</div>
</template>
<script>
import Search from './Search.vue';
import Grid from './Grid.vue';
import axios from 'axios';


export default{
    data:function(){
        return{
            busy: false,
        }
    },
    computed:{
        domain(){
            return this.$store.state.domain
        },
        offset(){
            return this.$store.state.offset
        }
    },
    components:{
        Search,
        Grid
    },
    methods:{
        load: function() {
          this.busy = true;
          let jsonpAdapter = require('axios-jsonp');
          axios({
                url: this.getUrl(),
                adapter: jsonpAdapter
          })
          .then(response => {
            
            if(typeof response.data.error=="undefined"){
                console.log(typeof response.data.error);
                this.$store.commit('pushToData',{response:response});
                this.$store.state.dataIsSet = true;
                this.$store.commit('changeRequestErrorExistToFalse');
            }else{
                this.$store.commit('changeRequestErrorExistToTrue');
            }
          })
          .catch(e => {
            console.log(e);
          })
          this.$store.commit('incrementOffset');
          this.busy = false;
        },
        getUrl:function(){
            return 'https://api.vk.com/method/wall.get?domain='+this.domain+'&offset='
          +this.offset+
          '&count=20&access_token=9077d41b9077d41b9077d41b769028d2e8990779077d41bc99cbdc04646960d3c61efeb&v=5.68';
        }
    }
    
}
</script>