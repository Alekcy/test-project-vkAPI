<style>
.card-panel{
    height: 100px;
}

.card-content{
    word-wrap: break-word;
}

@media screen and (min-width:0px) and (max-width:800px) {
    .item{
        width: 100%;
        margin: 0px;
    }
}
@media screen and (min-width:801px){
    .item{
        width: 30%;
        margin: 10px;
    }
}
</style>
<template>
    <div>
        <div v-if="requestErrorExist===true">
            <h2>Ошибка. Введите корректную ссылку.</h2>
        </div>
        <div v-else>
            <div v-if="dataIsSet" v-masonry origin-left="true" transition-duration="1s" item-selector=".item">
                <a target="_blank" v-bind:href="getUrl(element)" v-for="(element, index) in data">   
                    <div v-masonry-tile class="item card hoverable blue-grey darken-1" >
                      <div v-if="imgExist(element)" class="card-image">
                          <img v-bind:src="getImgSrc(element)">
                      </div>
                      <div v-if="textExist(element)" class="card-content white-text">
                      	<p>{{getText(element)}}</p>
                      </div>
                    </div>
                </a>
            </div> 
        </div>
    </div>
</template>
<script>
export default{
    computed:{
        data(){
            return this.$store.state.data
        },
        dataIsSet(){
            return this.$store.state.dataIsSet
        },
        requestErrorExist(){
            return this.$store.state.requestErrorExist
        }
    },
    methods:{
        getUrl:function(element){
            let url = 'https://vk.com/'+this.$store.state.domain+
            '?w=wall'+element.owner_id+'_'+element.id;
            return url;
        },
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
            element = (this.postType(element)=="repost") ? element.copy_history[0] : element;
            return ((typeof element.text !== "undefined")&&(element.text!=="")) ? true : false;
        },
        getText:function(element){
            return (this.postType(element)=="original") ?  this.cutText(element.text) : this.cutText(element.copy_history[0].text);
        },
        cutText:function(text){
            return (text.length>500) ? text.substr(0,500)+"..." : text;
        }
    }
}
</script>