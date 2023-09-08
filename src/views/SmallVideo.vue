<template>
    <div>
        <div class="table">蓝猫电影</div>
        <div class="video-box">
            <div v-for="(item,index) in feeds" class="box" @click="click(item.video.url,item.user.nickName)">
                <img class="auto-img" :src="item.video.imgUrl" alt="">
                <div class="text1">
                    <div class="van-multi-ellipsis--l2  text">{{ item.title}}</div>
                     <div class="name-box">
                       <img :src="item.user.avatarurl" alt="">
                       <span>{{ item.user.nickName }}</span>
                       <div class="dianZan"><van-icon name="good-job" color="rgb(255,255,255)" /> {{ item.upCount }}</div> 
                     </div>
                     
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
   import {videoShort} from '../api/api.js';
    export default {
        name:'SmallVideo',
        data(){
            return{
                feeds:'',
            }
        },
        created(){
          videoShort().then(res=>{
            this.feeds = res.data.data.feeds;
           console.log(this.feeds);
        }).catch(err=>{
            console.log('err=>',err);
        })
        },
        methods:{
            click(url,name){
                console.log(name);
                this.$router.push({name:'PlaySmallVideo',query:{url,name}})
            }
        }
    }
</script>

<style lang="scss" scoped>
.table{
    height: 50px;
    background-color: rgb(229, 72, 71);
    line-height: 50px;
    text-align: center;
    color: rgb(253, 249, 242);
    font-size: 20px;
}
.video-box{
    width: 375px;
    display: flex;
    flex-flow: wrap;
    .box{
        margin-left: 5px;
        margin-bottom: -47px;
        width: 180px;
        height: 300px;
        position: relative;
        .auto-img{
            width: 180px;
            height: 250px;
        }
        .text1{
            position: absolute;
            background-color: rgb(223, 231, 228);
            opacity: .6;
            color: black;
            font-weight: bold;
            width: 150px;
            left: 15px;
            bottom: 60px;
            .name-box{
                margin-top: 5px;
                display: flex;
                height: 30px;
                line-height: 30px;
                img{
                    width: 30px;
                    height: 30px;
                }
                .dianZan{
                    margin-left: 10px;
                }
            }
        }
    }
}
</style>