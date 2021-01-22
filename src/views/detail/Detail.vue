<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" @titleClick='titleClick'/>
        <scroll class="content" ref="scroll">
        <detail-swiper :topImages='topImages'></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
        <detail-param-info :paramInfo="paramInfo" ref='params'/>
        <detail-comment-info :comment-info="commentInfo" ref="comment"/>
        <goods-list ref="recommend" :goods='recommends'/>
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
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'

import Scroll from 'components/common/scroll/Scroll.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'


import {getDetail, Goods, Shop,GoodsParam,getRecommend} from 'network/detail.js'
import {debounce} from 'components/common/utils.js'
import {itemListenerMixin} from 'components/common/mixin.js'


export default {
    name:'Detail',
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        
        
    },
    mixins:[itemListenerMixin],
    data(){
        return{
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommends:[],
            themeTopYs:[],
            getThemeTopY:null
        }
    },
    created(){
    //     //1.保存存入的iid
    //     this.iid = this.$route.params.iid

    //     //2.根据iid请求详情数据

    //    getDetail(this.iid).then(res => {
    //             this.topImages = res.result.itemInfo.topImages
    //         })

     this._getDetailData();
     //3.请求推荐数据
     getRecommend().then(res => {
         this.recommends = res.data.list
         console.log(res)
     })
     //4.给getThemeTopY赋值
     this.getThemeTopY = debounce(() => {
          this.themeTopYs = []
                    this.themeTopYs.push(0)
                    this.themeTopYs.push(this.$refs.params.$el.offsetTop)
                    this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
                    this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
                    console.log(this.themeTopYs)
     })
           

    },
    // updated(){
    //     this.themeTopYs = []
    //     this.themeTopYs.push(0)
    //     this.themeTopYs.push(this.$refs.params.$el.offsetTop)
    //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    // },
    methods:{
        _getDetailData(){
             //1.保存存入的iid
            const iid = this.$route.params.iid
             //2.根据iid请求详情数据
            getDetail(iid).then(res => {
                //2.1获取结果
                const data = res.result;
                // console.log(res)
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
                //2.7取出评论信息
                if(data.rate.cRate !== 0){
                    this.commentInfo = data.rate.list[0]
                }
                /*
                //1.第一次获取，值不对
                //原因：this.themeTopYs.push(this.$refs.comment.$el没有渲染
                //  this.themeTopYs = []
                //     this.themeTopYs.push(0)
                //     this.themeTopYs.push(this.$refs.params.$el.offsetTop)
                //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
                //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

                this.$nextTick(() => {
                    //1.第二次获取，值不对
                    //原因：图片没有计算在内
                    //根据最新的数据，对应的DOM是已经被渲染出来
                    //但是因图片依然是没有加载完（目前获取到的offsetTop不包含其中的图片）
                    //offsetTop值不对的时候，都是因为图片的问题
                    this.themeTopYs = []
                    this.themeTopYs.push(0)
                    this.themeTopYs.push(this.$refs.params.$el.offsetTop)
                    this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
                    this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
                    console.log(this.themeTopYs)
                })*/
            })
        },
        imgLoad(){
            //this.$refs.scroll.refresh()
            this.newRefresh()
        },
        destroyed(){
            this.$bus.$off('itemImgLoad',this.itemImgListener)
        },
        titleClick(index){
            console.log(index)
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],300)
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
     overflow: hidden;
}
</style>