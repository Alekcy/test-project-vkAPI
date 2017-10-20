<template>
	<div></div>
</template>
<script>
import axios from 'axios';
export default{
	mounted:function(){
        this.request();
    },
    methods:{
        request:function(){
            let jsonpAdapter = require('axios-jsonp');
            axios({
                  url: 'https://api.vk.com/method/wall.get?domain=extrawebdev&count=20&access_token=c5c9f7d6c5c9f7d6c5c9f7d64dc596f125cc5c9c5c9f7d69c23f0c128cea96b8a24d873&v=5.68',
                  adapter: jsonpAdapter
            })
            .then(response => {
             // let resp = JSON.parse(response);
              console.log(response);

              this.$store.state.data = response.data.response.items;
              this.$store.state.dataIsSet = true;
              response.data.response.items.forEach(function(item){
              		console.log(item);	
              		

              });
            })
            .catch(e => {
              console.log(e);
            })
            
        }
    }
}
</script>