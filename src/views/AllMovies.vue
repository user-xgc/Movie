<template>
 <div>
     <div class="table">
            <span>蓝猫电影</span>
            <div @click="back" class="back-box"><van-icon name="arrow-left" size="20" /></div>
     </div>
     <div class="all-box">
        <div class="item1" v-for="(item,index) in movie">
          <div class="item2"><img class="auto" :src="item.poster" alt=""></div>
          <div class="item3">
             <div class="item4 van-ellipsis">
                 <ul>
                    <li>
                        <div class="van-ellipsis">
                            <span class="item6">{{ item.name }}</span>
                            <!-- <span class="d3">3D</span>
                            <span class="max">IMAX</span> -->
                        </div> 
                    </li>
                     <li><div class="van-ellipsis"><span>{{ item.ename }}</span></div></li>
                     <li>{{ item.catogary }}</li>
                     <li>{{ item.release }}</li>
                 </ul>
         </div>
         <div>
            <div v-if="item.score" class="item5">{{ item.score}}分</div>
            <div v-if="item.wish" class="item5">{{ item.wish}}分人想看</div>
            <!-- <div class="item7">购票</div>  -->
         </div>
   
          </div>
        </div>
        
     </div>
     
 </div>
</template>

<script>
    export default {
        name:'AllMovies',
        data(){
            return{
                movie:''
            }
        },
        created(){
            this.movie = this.$route.params.movies
            console.log(this.movie);
        },
        methods:{
            back(){
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
.item1{
    border-bottom: 1px solid rgb(210, 205, 205);
    display: flex;
    height: 105px;
    margin-bottom: 5px;
    margin-left: 10px;
    .item2{
        margin-top: 5px;
        width: 80px;
        height: 90px;
        display: flex;
        .auto{
          width: 80px;
          height: 90px;
     }
    }
    .item3{
        display: flex;
        .item4{
            width: 170px;
            .item6{
                font-weight: bold;
                font-size: 15px;
            }
            .d3{
                background-color:rgb(80, 159, 201);
                color: white;
                padding: 3px;
                margin-left: 5px;
            }
            .max{
                color: rgb(154, 213, 243);
                border: 1px solid rgb(191, 220, 235);
                padding: 2px;
            }
            li{
                margin-top: 7px;
                margin-left: 10px;
            }
        }
        .item5{
            height: 25px;
            width: 100px;
            text-align:right;
            line-height: 25px;
            margin-top: 10px;
            color: rgb(245, 172, 1);
        }
        .item7{
            background-color: rgb(229, 72, 71);
            width: 50px;
            margin-top: 10px;
            margin-left: 50px;
            height: 25px;
            line-height: 25px;
            text-align: center;
            border-radius: 15px;
            color: white;
        }
    }
}
</style>