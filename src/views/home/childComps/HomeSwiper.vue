<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="item.index">
         <a :href="item.link">
           <img :src="item.image" @load="imageLoad">
         </a>
       </swiper-item >
     </swiper >
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper/index.js'
export default {
    name:'HomeSwiper',
    data(){
      return{
        isLoad:false
      }
    },
    props:{
        banners:{
            type:Array,
            default(){
                return []
            }
        }
    },
    components:{
      Swiper, 
      SwiperItem
       
    },
    methods:{
      imageLoad(){
        //加载一次能得到高度即可
        if(!this.isLoad){
          this.$emit('swiperImageLoad')
          this.isLoad = true
        }
        
      }
    }
}
</script>

<style>

</style>