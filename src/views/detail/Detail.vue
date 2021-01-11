<template>
    <div class="detail">
        <detail-nav-bar></detail-nav-bar>
        <detail-swiper :topImages='topImages'></detail-swiper>
    </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'


import {getDetail} from 'network/detail.js'


export default {
    name:'Detail',
    components:{
        DetailNavBar,
        DetailSwiper
        
    },
    data(){
        return{
            iid:null,
            topImages:[]
        }
    },
    created(){
        //1.保存存入的iid
        this.iid = this.$route.params.iid

        //2.根据iid请求详情数据

       getDetail(this.iid).then(res => {
                this.topImages = res.result.itemInfo.topImages
            })
           

    },
    methods:{
        // getDetail(id){
        //     getDetail(this.iid).then(res => {
        //         console.log(res)
        //     })
        // }
    }


}
</script>

<style scoped>

</style>