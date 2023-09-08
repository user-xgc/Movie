<template>
    <div class="big-box">
        <div class="title"><span>蓝猫电影</span></div>
        <div class="table">
            <van-tabs @click="onClick" v-model="active">
               <van-tab v-for="(item,index) in text" :key="index" :title="item"></van-tab>
            </van-tabs>
        </div>
        <div class="table-text">
            <div class="text">
                    <div class="img-box" v-for="(item,index) in videos" :key="index">
                        <div class="img"><img :src="item.video.imgUrl" alt=""></div>
                        <div class="title-text">{{ item.title }}</div>
                        <div @click="click(item.user,item.video,item.title)" class="btn"><van-icon name="play" size="30" color="rgb(238, 230, 224)" /></div>
                        <div class="box">
                            <!-- <div class="time">02:33</div> -->
                            <div class="box1">
                                <div class="name-box">
                                    <div class="img-box"><img :src="item.user.avatarurl" alt=""></div>
                                    <span>{{ item.user.nickName }}</span>
                                </div>
                                <div class="box2">
                                    <div class="zan"><van-icon name="thumb-circle-o" /> {{ item.upCount }}</div>
                                <div class="text"><van-icon name="chat-o" /> {{ item.shareCount }}</div>
                                <div class="fen"><van-icon name="guide-o" /></div>
                                </div>
                            </div>
                              
                        </div>
                        
                    </div>
            </div>

            <!-- <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
              >
                <van-cell v-for="item in list" :key="item" :title="item" />
                
              </van-list> -->
        </div>
    </div>
</template>

<script>
     import {feedChannel} from '../api/api.js';
    export default {
        name:'Video',
        data() {
           return {
            active:0,
             list: [],
             loading: false,
             finished: false,
             text:['推荐','热映解读','新片预告','说电影','娱乐'],
             id:0,
             videos:'',
           }
        },
        created(){
  
             this.searchVideo()
        },
        methods: {
           onLoad() {
             // 异步更新数据
             // setTimeout 仅做示例，真实场景中一般为 ajax 请求
             setTimeout(() => {
               for (let i = 0; i < 10; i++) {
                 this.list.push(this.list.length + 1);
               }
       
               // 加载状态结束
               this.loading = false;
       
               // 数据全部加载完成
               if (this.list.length >= 20) {
                 this.finished = true;
               }
             }, 1000);
           },
           click(user,video,title){
                console.log('1111111',user,video);
                this.$router.push({name:'PlayVideo',query:{user,video,title}})
            },
            onClick(title){
                this.id = 5*title;
                this.searchVideo();
            },
            searchVideo(){
                feedChannel(this.id).then(res=>{
                this.videos = res.data.data.feeds
                console.log('视频=>',res.data.data.feeds);
             }).catch(err=>{
                 console.log('err=>',err);
            })
            }
         },
        
    }
</script>

<style lang="scss" scoped>
.big-box{
    height: 620px;
    overflow: auto;
    .title{
    height: 50px;
    background-color: rgb(229, 72, 71);
    line-height: 50px;
    text-align: center;
    color: rgb(253, 249, 242);
    font-size: 20px;
}
.table-text{
    height: 520px;
    overflow: auto;
   .text{
    
    .img-box{
        position: relative;
        // background-color: aqua;
        .img{
            height: 200px;
            width: 375px;
            // background-color: aqua;
            img{
                height: 200px;
                width: 375px;
            }
        }
        .title-text{
            position: absolute;
            top: 10px;
            left: 10px;
            font-weight: bold;
            color: rgb(227, 225, 222);
        }
        .btn{
            width: 40px;
            height: 40px;
            background-color: rgb(136, 131, 127);
            border-radius: 20px;
            text-align: center;
            line-height: 55px;
            opacity: .7;
            position: absolute;
            top: 33%;
            left: 45%;
        }
        .time{
            position: absolute;
            right: 10px;
            bottom: 45px;
        }
        .box1{
            margin-top: 10px;
            display: flex;
            // background-color: aqua;
            // justify-content: space-around;
            .name-box{
                display:flex;
                width: 200px;
                .img-box{
                    width: 30px;
                    height: 30px;
                    img{
                        width: 30px;
                        height: 30px;
                        border-radius: 15px;
                    }
                }
            }
            .box2{
                width: 175px;
                margin-left: 0px;
                display: flex;
                justify-content: space-around;
            }
        }
    }
   }
}
}
</style>