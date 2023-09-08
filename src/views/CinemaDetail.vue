<template>
    <div>
        <div class="table">
            <span>{{ name }}</span>
            <div @click="clickLeft" class="back-box"><van-icon name="arrow-left" size="20" /></div>
            <div @click="home" class="home">首页</div>
        </div>

        <div class="address-box">
            <div class="address-box2">
                <div class="cinema-name">{{ name }}</div>
               <div class="cinema-address">{{ location }}</div>
            </div>
        </div>
        <van-tabs   @click="clickMovie" v-model="active" line-width="80" line-height="5" background="rgb(88,86,87)">
            <van-tab v-for="(item,index) in cinemaMovies" :key="index">
              <template #title>
                  <img class="imgs" :src="item.img" alt="">
              </template>
            </van-tab>
        </van-tabs>
        <div class="movieName-box">
             <div class="box">
                 <span class="movie-name">{{ cinemaMovies[index1].nm }}</span>
                 <span class="score-box">{{ cinemaMovies[index1].sc}}分</span>
             </div>
             <div class="people-box">{{ cinemaMovies[index1].desc }}</div>
        </div>
        <div class="times-box">
            <van-tabs v-model="active1"  @click="clickTime" line-width="85" title-active-color="red">
              <!-- <van-tab title="" disabled></van-tab> -->
                <van-tab  v-for="(item,index) in movies" :key="index" :title="item.showDate"></van-tab>
              <!-- <van-tab title="" disabled></van-tab> -->
            </van-tabs>
        </div>
        <div class="cinema-box">
           <div class="cinema-detail-box" v-for="(item,index) in movieText">
            <div class="time-box">
                <ul>
                    <li><span class="begin-time">{{ item.tm }}</span></li>
                    <li><span class="out-time">{{ item.outTimes}}散场</span></li>
                </ul>
            </div>
            <div class="address-box1">
                <ul>
                    <li>{{ item.lang }} {{ item.tp }}</li>
                    <li><span class="title">{{ item.th }}</span></li>
                </ul>
            </div>
            <div class="price-box">
                <div class="money">￥</div>
                <div class="money money1">{{ item.vipPrice }}</div>
                <div class="card">影城卡</div>
                <div class="price3">￥ {{ item.vipPrice }}</div>
            </div>
            <div @click="clickShop(index)" class="shop-box">购票</div>
           </div> 
           <van-empty v-if="isShow" description="今日放映已结束" />
        </div>
        
        
    </div>
</template>

<script>
    
    import { Notify,Toast } from 'vant';
    import {cinemaShows} from '../api/api.js';
    export default {
        components: {
          [Notify.Component.name]: Notify.Component,
        },
        name:'CinemaDetail',
        data(){
            return{
                // text:["今天8月23日","明天8月24日","后天8月25日","周六8月26日","周天8月27日"],
                cinemaId:'',

                cityId:'',

                cinemaMovies:'',

                location:'',

                name:'',
                // isActive:0,
                active1:0,

                active:0,
                //电影索引号
                index1:0,
                //电影时间等数据
                movies:'',
                //点击的时间索引号
                timeIndex:0,
                //放映电影数据
                movieText:'',
                //电影时间
                lastTime:'',
                isLogin:false,

                isShow:false,

                
            }
        },
        // computed:{
        //     isLogin(){
        //         return this.$store.state.isLogin
        //     }
        // },
        created(){

            // console.log(this.isLogin);
            let text = JSON.parse(sessionStorage.getItem('Token'));
            if(text){
                this.isLogin = true
            }

            this.cinemaId = this.$route.query.id;

            this.cityId = this.$route.query.city;

            // console.log(cinemaId,cityId);
            let movieId = this.$route.query.movieId;
            // console.log(this.$route.query.indexTime);
            


            this.location = this.$route.query.location;

            // console.log(this.cinemaId,this.cityId,this.location);

            // console.log(this.location);
            cinemaShows(this.cinemaId,this.cityId).then(res=>{

                this.name = res.data.data.cinemaName;
                
                this.cinemaMovies = res.data.data.movies;

                
                // console.log(this.cinemaMovies);
                if(movieId!=undefined){
                    // let movie1 = this.cinemaMovies.filter(item=>item.id == movieId);
                    for(let i = 0;i<this.cinemaMovies.length;i++){
                    if(this.cinemaMovies[i].id==movieId){
                        this.index1 = i;
                        this.active = i
                        
                    }
                 }
                }
                

                console.log();

                // console.log(this.cinemaMovies[0].nm);

                this.movies = this.cinemaMovies[this.index1].shows;

                this.lastTime = this.cinemaMovies[this.index1].dur;
                // console.log(this.movies,this.$route.query.indexTime);

             if(this.$route.query.indexTime){
                if(this.$route.query.indexTime<=this.movies.length){
                    this.active1 = this.$route.query.indexTime;

                   this.timeIndex = this.$route.query.indexTime;
                }else{
                    Toast('暂无该天电影,看看其他时间的吧')
                }
                
            }

                this.cinema();
                if(this.movieText.length==0){
                    this.isShow = true
                }else{
                    this.isShow = false
                }
                
             }).catch(err=>{
                 console.log('err=>',err);
             })

             

            //  this.cinemaMovies.filter(item=>item)

        },
        methods:{
            clickLeft(){
                this.$router.go(-1)
            },
            home(){
                this.$router.push({name:'Movie'})
            },
            //点击电影
            clickMovie(title){

                // console.log(title);

                this.timeIndex = 0;

                this.active1 = 0;

                this.index1 = title;

                this.movies = this.cinemaMovies[this.index1].shows;

                this.cinema();

            },
            //点击时间
            clickTime(title){

                this.timeIndex = title;

                this.cinema();

                // console.log(this.movieText);
                if(this.movieText.length==0){
                    this.isShow = true
                }else{
                    this.isShow = false
                }

            },
            //修改电影数据增加结束时间
            cinema(){
                let arr =[]
                // console.log(this.movieText);
                this.movies[this.timeIndex].plist.map(item=>{
                    // console.log(item.tm.split(':'));
                    // let ti = item.time;
                    // console.log(Math.floor(this.lastTime/60));
                    let h =Math.floor(this.lastTime/60) + Number(item.tm.split(':')[0]);
                    if(h==24){
                        h = '00'
                    }
                    if(h>24){
                        h = h-24
                    }
                    // console.log(h);
                    let s = this.lastTime%60 + Number(item.tm.split(':')[1]);

                    if(s>=60){
                        s = s-60
                        h = h+1
                    }
                    // console.log(h,s);

                   let outTime = `${h}:${s}`;

                   arr.push(Object.assign({},item,{outTimes:outTime}));
                })

                this.movieText = arr;

                // console.log(this.movieText);
            },

            //点击购票
            clickShop(index){

                // console.log(this.movieText);

                let movieName = this.cinemaMovies[this.index1].nm;

                let name = this.name;

                let img = this.cinemaMovies[this.index1].img

                console.log(img);

                let movie = this.movieText[index];

                
                let t = new Date().toLocaleTimeString().substring(0,5);

                let nowTime = t.split(':')[0]*60 + Number(t.split(':')[1]);

                let movieTime = movie.tm.split(':')[0]*60 + Number(movie.tm.split(':')[1]);

                // let cinemaId = this.cinemaId ;
                // let cityId = this.cityId ;
                // console.log(nowTime-movieTime);
                if(this.isLogin){
                    if(nowTime-movieTime <= -30){
                    console.log(name,movie);
                    
                    this.$router.push({name:'Intro',query:{movie,name,movieName,img}});

                }else if(nowTime-movieTime>=0){

                    Toast('放映已结束，请选择其他场次');
                    // Notify({ type: 'warning', message: '放映已结束，请选择其他场次' });
                }else{

                    Toast('电影快开始了哦，再看看其他场次吧');
                    // Notify({ type: 'warning', message: '电影快开始了哦，再看看其他场次吧' });
                }
                }else{
                    Toast('请先登录')
                    setTimeout(() => {
                        this.$router.push({name:'Login'})
                    }, 1000);
                    
                }
                
                
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
    .home{
        position: absolute;
        top: 0;
        right: 10px;
    }
}
.address-box{
    height: 50px;
    background-color: rgb(255, 255, 255);
    position: relative;
    .address-box2{
       position: absolute;
       left: 10px;
       top: 10px;
        .cinema-name{
           font-weight: bold;
           font-size: 13px;
        }
        .cinema-address{
            color: rgb(190, 190, 190);
        }
    }
    
}
::v-deep .van-tabs--line .van-tabs__wrap {
    height: 100px;
}


.imgs{
    height: 90px;
    width: 70px;
}

.movieName-box{
    height: 50px;
    margin: auto;
    text-align: center;
    background-color: rgb(255, 255, 255);
    border-bottom: 1px solid rgb(210, 209, 209);
    .box{
        .movie-name{
            font-weight: bold;
            font-size: 13px;
        }
        .score-box{
            margin-left: 4px;
            color: rgb(255, 180, 4);
            font-weight: bold;
        }
    }
    .people-box{
        margin-top: 10px;
        color: rgb(190, 190, 190);
    }
}
.times-box{
    ::v-deep .van-tabs--line .van-tabs__wrap {
    height: 40px;
}
}
.cinema-box::-webkit-scrollbar{
    display: none;
}
.cinema-box{
    height: 425px;
    overflow: auto;
  .cinema-detail-box{
    margin-top: 5px;
    display: flex;
    justify-content: space-around;
    background-color: rgb(255, 255, 255);
    border-top: 2px solid rgb(241, 241, 241);
    ul{
        margin-top: 15px;
    }
    li{
        margin-top: 2px;
    }
    .time-box{
       
        .begin-time{
            font-weight: bold;
            font-size: 13px;
        }
        .out-time{
            color: rgb(190, 190, 190);
        }
    }
    .address-box1{
        width: 120px;
        .title{
            color: rgb(190, 190, 190);
        }
    }
    .price-box{
        display: flex;
        margin-top: 10px;
        .money{
            color: rgb(240, 71, 66);
        }
        .money1{
            font-size: 13px;
            font-weight: bold;
        }
        .card{
            color: white;
            background-color: rgb(255, 180, 4);
            border: 1px solid rgb(255, 180, 4);
            height: 15px;
        }
        .price3{
            color: rgb(255, 180, 4);
            border: 1px solid rgb(255, 180, 4);
            height: 15px;
        }
    }
    .shop-box{
        color: rgb(240, 71, 66);
        border: 1px solid rgb(240, 71, 66);
        height: 20px;
        width: 30px;
        text-align: center;
        line-height: 20px;
        border-radius: 9px;
        margin-top: 20px;
    }
}  
}
</style>