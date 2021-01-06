<template>
    <div class="detail">
        <detail-nav-bar></detail-nav-bar>
    </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'



export default {
    name:'Detail',
    components:{
        DetailNavBar
        
    },
    data(){
        return{
            iid:null
        }
    },
    created(){
        //1.保存存入的iid
        this.iid = this.$route.params.iid

        //2.根据iid请求详情数据

    }

}
</script>

<style scoped>

</style>