<template>
  <div class="bottom-bar">
      <div class="check-content">
          <check-button class="check-button"/>
          <span>全选</span>
      </div>
      <div class="total-price">
          合计:{{totalPrice}}
      </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'

export default {
name:"CartButtomBar",
components:{
    CheckButton
},
computed:{
    totalPrice(){
        return '￥' + this.$store.state.cartList.filter(item => {
            return item.checked
            
        }).reduce((preValue,item) => {
            console.log(item)
            return preValue + item.price * item.count
        },0)
    }
}
}
</script>

<style scoped>
.bottom-bar{
     position: relative;
    display: flex;
    align-items: center;
    height: 40px;
    background-color: pink;
   font-size: 14px;
    
}
.check-button{
    width: 20px;
    height: 20px;
    margin-left: 10px;
    margin-right: 6px;
}
.check-content{
    display: flex;
    align-items: center;
    height: 100%;

}
.total-price{
margin-left: 16px;
}
</style>