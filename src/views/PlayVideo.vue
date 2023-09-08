<template>
    <div class="box">
        <div @click="back" class="table"><van-icon name="arrow-left" />返回</div>
        <div class="video-box">
           <video ref="video" :src="video.url" width="375" controls></video> 
        </div>
        <div class="text-box">
            <div class="text1">
               <div class="text">{{ title }}</div>
               <div class="name-box">
                   <div class="img-box"><img :src="user.avatarurl" alt=""></div>
                   <span>{{ user.nickName }}</span>
                   <span><van-icon name="checked" color="rgb(249, 195, 69)" /></span>
               </div> 
            </div>
            
        </div>
    </div>
</template>

<script>
    export default {
        name:'PlayVideo',
        data(){
            return{
                user:'',
                video:'',
                title:'',
            }
        },
        created(){
            this.user = this.$route.query.user;
            this.video = this.$route.query.video;
            this.title = this.$route.query.title;
            // console.log(this.$route);
        },
        methods:{
            back(){
                this.$refs.video.pause();
                this.$refs.video.currentTime = 0;
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang="scss" scoped>
.box{
    background-color: rgb(244, 244, 244);
}
.table{
    height: 50px;
    line-height: 50px;
}
.text-box{
    height: 100px;
    background-color: rgb(255,255,255);
    .text1{
        width: 350px;
        margin:10px auto;
        .text{
            line-height: 20px;
        }
    }
    .name-box{
        margin-top: 10px;
        display: flex;
        .img-box{
            width: 30px;
            height: 30px;
            img{
                width: 30px;
                height: 30px;
            }
        }
        span{
            height: 30px;
            line-height: 30px;
            margin-left: 10px;
        }
    }
}
</style>