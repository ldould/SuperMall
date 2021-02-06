<template>
  <div class="cart">
      <nav-bar class="nav-bar">
        <div slot="center">购物车({{cartLength}})</div>
      </nav-bar>
      <cart-list></cart-list>
      <cart-buttom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import CartList from './childComps/CartList.vue'
import CartButtomBar from './childComps/CartButtomBar.vue'
import {mapGetters} from 'vuex'

export default {
    name:'Cart',
    components:{
      NavBar,
      CartList,
      CartButtomBar
    },
    computed:{

      // cartLength(){
      //   return this.$store.state.cartList.length
      // }

      ...mapGetters(['cartLength','cartList'])
    }
}
        
</script>

<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>