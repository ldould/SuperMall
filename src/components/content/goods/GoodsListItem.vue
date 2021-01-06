<template>
  <div class="goods-item" @click="itemClick">
    <img :src="goodsItem.show.img" alt=""  @load="imageLoad"/>
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods:{
    imageLoad(){
      //事件总线
      this.$bus.$emit('itemImageLoad')
    },
    itemClick(){
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  }
};
</script>

<style scoped>
.goods-item {
  padding-bottom: 16px;
  position: relative;
  width: 46%;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info{
    font-size: 14px;
    line-height: 18px;
    color: var(--color-text); 
}
.goods-info p{
     padding-bottom: 8px;
     display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 38px;
}
.price{
    color: var(--color-high-text);
}
.collect{
    float: right;
    position: relative;
    display: inline-block;
}
.collect::before{
    contain: "";
    position: absolute;
    display: inline-block;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url(~assets/img/common/collect.svg) 0 0/14px 14px;
}
</style>
