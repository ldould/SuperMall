<template>
  <div class="cart-list">
      <scroll class="content">
          <cart-list-item v-for="(item,index) in cartList" :key="index" :itemInfo="item"/>
      </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll.vue'

import CartListItem from './CartListItem.vue'

import {mapGetters} from 'vuex'
export default {
name:'CartList',
components:{
    Scroll,
    CartListItem
},
computed:{
    ...mapGetters(['cartList'])
}
}
</script>

<style scoped>
.cart-list{
    height: calc(100vh - 44px - 49px - 40px);
}
.content{
    height: 100%;
    overflow: hidden;
}
</style>