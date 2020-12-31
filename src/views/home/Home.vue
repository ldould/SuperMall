<template>
  <div id="home">
     <nav-bar class="home-nav">
       <div slot="center">购物街</div>
     </nav-bar>
     <home-swiper :banners="banners"/>
     <recommend-view :recommends="recommends"/>
     <feature-view/>
     <tab-control class="tab-control"
      :titles="['流行','新款','精选']"
      @tabClick='tabClick'/>
      <goods-list :goods="showGoods"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import TabControl from 'components/content/tabcontrol/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'

import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

import {getHomeMultidata,getHomeGoods} from 'network/home.js'




export default {
    name:'Home',
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList
       
    },
        
    data(){
      return {
       // result:null,
        banners:[],
        recommends:[],
        goods:{
          // '流行','新款','精选'
          "pop":{page:0,list:[]},
          "new":{page:0,list:[]},
          "sell":{page:0,list:[]},
        },
        currentType:'pop'
      }
    },
    created(){
      //请求多个数据
      this.getHomeMultidata()

      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    computed:{
      showGoods(){
       return this.goods[this.currentType].list
      }
    },
    methods:{

      /**
       * 事件监听相关的方法
       */
      tabClick(index){
        switch(index){
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },



      /**
       * 网络请求相关的方法
       */
      getHomeMultidata(){
         getHomeMultidata().then(res => {
        //this.result = res,
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
         getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
      })
      }
    }
}
       
</script>

<style scoped>
#home{
  padding-top: 44px;
}
.home-nav{
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control{
  position: sticky;
  top: 44px;
}
</style>