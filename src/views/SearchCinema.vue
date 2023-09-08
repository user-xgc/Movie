<template>
    <div>
        <div class="table">
            <span>蓝猫电影</span>
            <div @click="clickLeft" class="back-box"><van-icon name="arrow-left" size="20" /></div>
        </div>

        <div class="cinema-text-box">
                <div class="cinema-text" v-for="(item,index) in cinema">
                        <ul>
                            <li>
                                <div class="van-ellipsis">
                                    <span class="size1">{{ item.info.name }}</span>
                                    <span class="size2">{{ item.info.price }}</span>
                                    <span class="size3">元起</span>
                                </div>
                            </li>
                            <li>
                                <div class="van-ellipsis address">
                                    <span>{{ item.info.address }}</span>
                                </div>
                            </li>
                            <li>
                                <div class="features-box">
                                    <div class="features" :class="{eat:item1=='小吃'}" v-for="(item1,index1) in item.info.tags">{{ item1 }}</div>
                                    <!-- <div class="eat">小吃</div> -->
                                </div>
                            </li>
                        </ul>

                        <div class="last"><span>{{ item.distance }}</span></div>
                        
                </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'SearchCinema',
        data(){
            return{
                cinema:''
            }
        },
        created(){
            this.cinema = this.$route.params.cinemas
            // console.log(this.$route.params.cinemas);
        },
        methods:{
            clickLeft(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="scss" scoped>
.table{
    position: relative;
    height: 40px;
    background-color: rgb(229, 72, 71);
    line-height: 40px;
    text-align: center;
    color: white;
    font-size: 15px;
    .back-box{
        position: absolute;
        top: 2px;
        left: 10px;
    }
}
.cinema-text-box{
    border-top: 1px solid rgb(179, 178, 178);
    border-bottom: 1px solid rgb(179, 178, 178);
    .cinema-text{
        position: relative;
        border-bottom: 1px solid rgb(222, 219, 219);
        height: 100px;
        margin-left: 10px;
        li{
            margin-top: 10px;
            width: 300px;
        }
        .size1{
            font-weight: bold;
            font-size: 15px;
        }
        .size2{
            color: red;
            font-size: 15px;
        }
        .size3{
            color: rgb(179, 178, 178);
        }
        .address{
            color: rgb(179, 178, 178);
        }
        .features-box{
            display: flex;
            flex-flow: wrap;
            .features{
                border: 1px solid rgb(144, 189, 201);
                border-radius: 2px;
                color: rgb(144, 189, 201);
                padding: 2px;
                margin-right: 5px;
                margin-bottom: 5px;
            }
            .eat{
                border: 1px solid rgb(255, 164, 81);
                color: rgb(255, 164, 81);
            }
        }
    }
    .last{
        position: absolute;
        top: 40px;
        right: 10px;
    }

}
</style>