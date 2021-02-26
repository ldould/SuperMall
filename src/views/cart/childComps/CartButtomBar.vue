<template>
  <div class="bottom-bar">
      <div class="check-content">
          <check-button :is-checked="isSelectAll" @click.native="allCheckClick" class="check-button"/>
          <span>全选</span>
      </div>
      <div class="total-price">
          合计:{{totalPrice}}
      </div>
      <div class="calculate" @click="calcClick">
          去计算:({{checkLength}})
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
        },0).toFixed(2)
    },
    checkLength(){
        return this.$store.state.cartList.filter(item => item.checked).length
    },
    isSelectAll(){
    //    return !(this.$store.state.cartList.filter(item => !item.checked).length)

    // for(let item of this.$store.state.cartList){
    //     if(!item.checked){
    //         return false
    //     }
    // }
    // return true

     if(this.$store.state.cartList.length === 0) return false
     return !this.$store.state.cartList.find(item => !item.checked)
    }
},
methods:{
    allCheckClick(){
        if(this.isSelectAll){//全部选中
            this.$store.state.cartList.forEach(item => item.checked = false)
        }else{//部分或全部不选中
            this.$store.state.cartList.forEach(item => item.checked = true)
        }
    },
    calcClick(){
        if(!this.isSelectAll){
            this.$toast.show('请选择购买的商品',2000)
        }
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
    background-color: #eee9;
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
      width: 70px;

}
.total-price{
margin-left: 16px;
flex: 1;
}
.calculate{
    width:80px ;
    color: #fff;
    background-color: var(--color-tint);
    height: 100%;
    line-height: 40px;
    text-align: center;
}
</style>