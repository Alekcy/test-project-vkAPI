<style>
    .card{
        /*align-self: flex-start;*/
        width: 100%;
        
    }
    img{
        width: 100%;
    }
    .cont{
        margin-top: 10px;
            /* column width */
    column-width: 15em;
    -moz-column-width: 15em;
    -webkit-column-width: 15em;
    
    /* space between columns */
    column-gap:1em;
    -moz-column-gap: 1em;
    -webkit-column-gap: 1em;/*
        display: -webkit-flex; 
        display: flex; 
        justify-content: center;
        
        flex-direction: row;
        flex-wrap: wrap;
        align-content: space-between;*/
    }

</style>
<template>
	<div>
		<div class="container">
            <Search></Search>
            <div class="cont" v-if="dataIsSet">
                <div v-for="element in data" class="card blue-grey darken-1">
                    <div v-if="imgExist(element)" class="card-image">
                        <img v-bind:src="getImgSrc(element)">
                    </div>
                    <div v-if="textExist(element)" class="card-content white-text">
                      <p>{{getText(element)}}</p>
                    </div>
                </div>
            </div>
		</div>
	</div>
</template>
<script>
import Search from './Search.vue';
export default{
    components:{
        Search
    },
    computed:{
        data(){
            return this.$store.state.data
        },
        dataIsSet(){
            return this.$store.state.dataIsSet
        }
    },
    methods:{
        imgExist:function(element){
            element = (this.postType(element)=="repost") ? element.copy_history[0] : element;
            if(typeof element.attachments!=="undefined"){
                if(element.attachments[0].type=="photo"){
                    if (typeof element.attachments[0].photo!=="undefined") return true;
                }
            }
            return false;
        },
        getImgSrc:function(element){
            element = (this.postType(element)=="repost") ? element.copy_history[0] : element;
            if (element.attachments[0].type=="photo") return this.getImgSize(element.attachments[0].photo);
        },
        getImgSize:function(photo){
            let imgSize;
            for(let key in photo){
                if(key.search(/photo/i)!==-1)imgSize = key;
            }
            return photo[imgSize];
        },
        postType:function(element){
            return (typeof element.copy_history!=="undefined") ?  "repost"  :  "original";
        },
        textExist:function(element){
            if(this.postType(element)=="original"){
                if(typeof element.text !== "undefined") return true;
            }else{
                if(typeof element.copy_history[0].text !== "undefined")return true;
            }
            return false;
        },
        getText:function(element){
            return (this.postType(element)=="original") ?  element.text : element.copy_history[0].text;
        }
    }
}
</script>