<template>
  <div id="home">
     <nav-bar class="home-nav">
       <div slot="center">购物街</div>
     </nav-bar>
     <scroll class="content" ref="scroll" :probe-type="3" 
     @scroll="contentScroll"
     :pull-up-load='true' @pullingUp="loadMore">
     <home-swiper :banners="banners"/>
     <recommend-view :recommends="recommends"/>
     <feature-view/>
     <tab-control class="tab-control"
      :titles="['流行','新款','精选']"
      @tabClick='tabClick'/>
      <goods-list :goods="showGoods"/>
     </scroll>
      <!-- 加上.native组件才可以监听点击事件 -->
     <back-top @click.native="backClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import TabControl from 'components/content/tabcontrol/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import BackTop from 'components/content/backTop/BackTop.vue'

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
      GoodsList,
      Scroll,
      BackTop,
       
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
        currentType:'pop',
        isShowBackTop:false
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

      backClick(){
        this.$refs.scroll.scrollTo(0,0,3000)
      },
      contentScroll(position){
        this.isShowBackTop = (-position.y) > 1000
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.scroll.refresh()
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
        this.$refs.scroll.finishPullUp()
      })
      }
    }
}
       
</script>

<style scoped>
#home{
  padding-top: 44px;
  height: 100vh;
  position: relative;
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
  z-index: 9;
}
.content{
  /* height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px; */

  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>