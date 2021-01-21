<template>
    <div>
        <nav-bar>
            <div slot="left"  class="back" @click="backClick">
                <img src="~assets/img/common/back.svg" alt="">
            </div>
            <div slot="center" class="title">
                <div class="title-item" 
                v-for="(item,index) in titles" :key="index"
                :class="{active : index === currentIndex}"
                @click="titleClick(index)">
                    {{item}}
                </div>
            </div>
        </nav-bar>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'


export default {
    name:'DetailNavBar',
     components:{
        NavBar 
    },
    data(){
        return{
            titles:['商品','参数','评论','推荐'],
            currentIndex:0
        }
    },
    methods:{
        titleClick(index){
            this.currentIndex = index
        },
        backClick(){
            this.$router.back()
        }
    }
}
</script>

<style scoped>
.title{
display: flex;
font-size: 13px;
}
.title-item{
    flex: 1;
}
.active{
    color: var(--color-high-text);
}

.left .back{
    text-align: center;
} 
.back img{
   transform: translateY(5px);
    display: inline-block;
}
</style>