<template>
    <div class="box">
        <van-nav-bar
           left-text="返回"
           right-text="首页"
           left-arrow
           @click-left="onClickLeft"
           @click-right="onClickRight"
         />
        <video :src="url" width="375" height="200" controls></video>
        <div class="title">正在播放:{{ title }}</div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                url:'',
                title:'',
            }
        },
        created(){
            console.log(this.$route);

            this.url = this.$route.params.url;

            this.title = this.$route.params.title;
            
        },
        methods: {
          onClickLeft() {
            this.$router.go(-1)
           },
           onClickRight() {
            this.$router.push({name:'Movie'})
           },
          }
    }
</script>

<style lang="scss" scoped>
.box{
    background-color: rgb(230, 232, 231);
}
.title{
    height: 400px;
    line-height: 40px;
    font-weight: bold;
    font-size: 15px;
}
</style>