<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name:'Scroll',
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{
            scroll:null,
            
        }
    },
    mounted(){
        //若页面上还有其它几个类名也是wrapper的，通过document.querySelector('.wrapper')
        // 找到的就不一定是我们想要的
        // 因此用ref来确定
        this.scroll = new BScroll(this.$refs.wrapper,{
            observeDOM:true,
            click:true,
            probeType:this.probeType,
            pullUpLoad:this.pullUpLoad
            
        })

        // 2.监听滚动的位置
        if(this.probeType === 2 || this.probeType === 3){
        this.scroll.on('scroll',(position) => {
       
        this.$emit('scroll',position)
        //console.log(position,'position')

       }) 
        }
       

       //3.监听上拉事件
       if(this.pullUpLoad){
           this.scroll.on('pullingUp',() => {
           this.$emit('pullingUp')
       })
       }
       
           
    },
    methods:{

        scrollTo(x,y,time=300){
           this.scroll && this.scroll.scrollTo(x,y,time)
        },
        finishPullUp(){
           this.scroll && this.scroll.finishPullUp()
        },
        refresh(){
           this.scroll && this.scroll.refresh()
        },
        getScrollY(){
            return this.scroll ? this.scroll.y : 0
        }
    }
}
</script>


<style scoped>
/* // scoped作用域 */

</style>