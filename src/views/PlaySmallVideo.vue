<template>
    <div>
        <div class="back">
            <div @click="clickBack" class="arrow">
                <van-icon name="arrow-left" size="20"/>
            </div>
            <span>正在播放{{ name }} 的视频</span>
        </div>
        <div class="video">
            <video ref="video" :src="url" height="624" width="375" controls></video>
        </div>
    </div>
</template>

<script>
    export default {
        name:'PlaySmallVideo',
        data(){
            return{
               url:'',
            name:'', 
            }
            
        },
        created(){
            this.url = this.$route.query.url;
            this.name = this.$route.query.name;
            // console.log(this.$route.query);
        },
        methods:{
            clickBack(){
                // console.log(this.$refs.video);
                this.$refs.video.pause();
                this.$refs.video.currentTime = 0;

                // console.log('11111');
               this.$router.go(-1)
            }
        }
    }
</script>

<style lang="scss" scoped>
.back{
    display: flex;
    line-height: 40px;
    height: 40px;
    font-size: 15px;
    background-color: rgb(121, 127, 127);
    span{
        margin-left: 10px;
    }
    .arrow{
        line-height: 45px;
        margin-left: 5px;
    }
}
.video{
    
}
</style>