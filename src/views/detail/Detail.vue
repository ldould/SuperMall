<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav"/>
        <scroll class="content" ref="scroll">
        <detail-swiper :topImages='topImages'></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
        <detail-param-info :paramInfo="paramInfo"/>
        </scroll>
        
    </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'

import Scroll from 'components/common/scroll/Scroll.vue'


import {getDetail, Goods, Shop,GoodsParam} from 'network/detail.js'


export default {
    name:'Detail',
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo
        
    },
    data(){
        return{
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{}
        }
    },
    created(){
    //     //1.保存存入的iid
    //     this.iid = this.$route.params.iid

    //     //2.根据iid请求详情数据

    //    getDetail(this.iid).then(res => {
    //             this.topImages = res.result.itemInfo.topImages
    //         })

     this._getDetailData()
           

    },
    methods:{
        _getDetailData(){
             //1.保存存入的iid
            const iid = this.$route.params.iid
             //2.根据iid请求详情数据
            getDetail(iid).then(res => {
                //2.1获取结果
                const data = res.result;
                console.log(res)
                //2.2.获取顶部图片信息
                 this.topImages = data.itemInfo.topImages
                //2.3.获取商品信息
                this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
                // 2.4获取店铺信息 创建店铺信息的对象
                this.shop = new Shop(data.shopInfo)
                //2.5保存商品的详情数据
                this.detailInfo = data.detailInfo
                //2.6获取参数信息
                this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
            })
        },
        imgLoad(){
            this.$refs.scroll.refresh()
        }
    }


}
</script>

<style scoped>
#detail{
    height: 100vh;
    position: relative;
    z-index: 11;
    background-color: #fff;
}
.detail-nav{
    position: relative;
    z-index: 11;
    background-color: #fff;
}
.content{
    height: calc(100% - 44px);
}
</style>