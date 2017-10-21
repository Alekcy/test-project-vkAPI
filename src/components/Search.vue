<style>
    input{
        width: 100%;
    }
    button{
        width: 100%;
    }
    .card-panel{
        height: 50px!important;
    }
    #domain{
        font-weight: 700;
    }
</style>
<template>
    <div class="row">
        <div class="row">
            <div class="col s12">
                <p>Введите ссылку на сообщество/группу ВК. Например, https://vk.com/extrawebdev</p>
            </div>
        </div>
        <div class="row">
            <div class="col m8 s12">
                <input v-model="searchText" type="text" name="">
            </div>
            <div class="col m4 s12">
                <button v-on:click="clickSearchBtn" class="btn waves-effect waves-light btn-primary">ПОИСК</button>
            </div>
        </div>
        <div class="row">
             <div class="col s12 card-panel purple accent-4 ">
                 <p class="white-text">Посты из <span id="domain">{{domain}}</span></p>
             </div>
        </div>
    </div>
   
</template>
<script>
export default{
    data:function(){
        return{
            searchText:""
        }
    },
    computed:{
        domain(){
            return this.$store.state.domain
        }
    },
    methods:{
        clickSearchBtn:function(){
            if(this.searchText!==""){
                if(this.searchText.lastIndexOf("/")!==-1){
                    let domain = this.findDomainInStr(this.searchText);
                    this.$store.commit('changeDomain',domain);
                    this.$store.commit('removeAllData');
                    this.$emit('load');
                    this.searchText = "";
                }
            }
        },
        findDomainInStr:function(str){
            return str.substr(str.lastIndexOf("/")+1);
        }
    }
}
</script>