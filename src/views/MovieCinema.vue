<template>
    <div>
        <van-nav-bar
          title="学爸"
          left-text="返回"
          right-text="首页"
          left-arrow
          @click-left="onClickLeft"
          @click-right="onClickRight"
        />

        <div class="movieName-box">
            <div class="movie-box">
                <img :src="img" alt="">
                <div class="movie-text">
                    <ul>
                        <li><span class="movieName">{{ nm }}</span></li>
                        <li class="van-ellipsis">{{ em }}</li>
                        <li><span class="score-box">{{ score }}</span>
                            <span>({{ snum }}人评)</span></li>
                        <li>{{ tap }}</li>
                        <li>{{ src}}/{{ times}}分钟</li>
                        <li class="van-ellipsis">{{ onlineDate }}</li>
                    </ul>
                </div>
                <div @click="clickDetail(movieId)" class="goDetail"><van-icon name="arrow" size="15" /></div>
            </div>
        </div>
        <van-tabs @click="onClick" v-model="active">
          <van-tab v-for="(item,index) in timeDay" :title="item.time"></van-tab>
          <!-- <van-tab title="08-31"></van-tab>
          <van-tab title="09-01"></van-tab> -->
        </van-tabs>

        <van-dropdown-menu>
          <van-dropdown-item @change="cli" @open="clickMenu" v-model="value1" :options="option1" />
          <van-dropdown-item  v-model="value2" :options="option2" />
        </van-dropdown-menu>

        <div class="textbox">
            <div @click="clickCinemas(index,nowCityId,movieId)" class="cinema-text" v-for="(item,index) in cinemas" :key="index">
                <div class="text-box">
                    <ul>
                        <li><span class="title van-ellipsis">{{ item.name }}</span></li>
                        <li class="van-ellipsis">{{ item.addr }}</li>
                        <li class="lei-box">
                            <div v-for="(item1,index1) in item.labels" :key="index1" class="leiXing">{{ item1.name }}</div>
                            
                        </li>
                        <li>{{ item.showTimes }}</li>
                    </ul>
                </div>
                <div class="last-box">
                    <div class="price-movie">33元起</div>
                    <div>19km</div>
                    <!-- <span c></span> -->
                    <!-- <span>19km</span> -->
                </div>
            </div>
        </div>
        <!-- <van-empty description="描述文字" /> -->
    </div>
</template>

<script>
import { Toast } from 'vant';
    import {selectItems,selectCinemas,movieDetail} from '../api/api.js';
    export default {
        name:'MovieCinema',
        data(){
            return{
                
                active:0,
                value1:0,
                value2:0,
                option1:[],
                option2:[],

                time1:'',
                //市区id
                cityId:-1,
                //类型ID
                typeId:-1,
                //当前城市id
                nowCityId:20,
                //电影
                movieId:'',

                //影院
                cinemas:'',
                //电影名
                nm:'',
                //英文名
                em:'',
                score:'',
                tap:'',
                times:'',
                img:'',
                onlineDate:'',
                src:'',
                snum:'',

                //时间下标
                timeIndex:'',
                //今天明天后天
                timeDay:[],
            }
                 },
        created(){
            this.time()
            // console.log(this.time1);
            // console.log(new Date().getDay());
            this.movieId = this.$route.query.id
            // this.nowCityId = this.$route.query.cityId
            let id = JSON.parse(localStorage.getItem('cityId'))
            if(id){
               this.nowCityId = id 
            }else{
                this.nowCityId = 20
            }

            
           let a = this.todayTime(0)
           let b = this.todayTime(1)
           let c = this.todayTime(2)
            this.timeDay = [
                {time:a,name:'今天'},
                {time:b,name:'明天'},
                {time:c,name:'后天'},
            ]           
            //电影详情
            movieDetail(this.movieId).then(res=>{
                let a  = res.data.movie;
                this.nm = a.nm;
                this.type = a.cat;
                this.times = a.dur;
                this.img = a.img;
                this.em = a.enm;
                this.onlineDate = a.onlineDate;
                this.src = a.src;
                this.snum = a.snum;
                this.score = a.sc

            console.log(res.data.movie);
        }).catch(err=>{
            console.log('err=>',err);
        })
            selectItems(this.movieId,this.nowCityId).then(res=>{
            // console.log('经典',res.data.data.district.subItems);
            let brands = res.data.data.brand.subItems;
            let arr = brands.map((item,index)=>{
                // console.log(item);
                return {
                    text:item.name,
                    id:item.id,
                    value:index,
                    count:item.count
                }
            })
            this.option2 = [...arr]

            // console.log(this.option2);
            let district = res.data.data.district.subItems;

            // console.log(district);
            let arr1 = district.map((item,index)=>{
                // console.log(item);
                return {
                    text:item.name,
                    id:item.id,
                    value:index,
                    count:item.count
                }
            })
            this.option1 = [...arr1]
            
            // console.log(arr);
        }).catch(err=>{
            console.log('err=>',err);
        })
        this.select()

        // selectCinemas(this.time1,this.movieId,this.nowCityId,this.cityId).then(res=>{
        //     console.log(res.data.data.cinemas);
        //     this.cinemas = res.data.data.cinemas;

        //     // console.log(this.cinemas);
        // }).catch(err=>{
        //     console.log('err=>',err);
        // })

        },
        methods: {
            //获取今天明天后庭
            todayTime(nn){
                let dd = new Date();
               dd.setDate(dd.getDate() + nn); //获取AddDayCount天后的日期
               let y = dd.getFullYear();
               let m = dd.getMonth() + 1; //获取当前月份的日期
               if(m<10){
                m = `0${m}`
               }
               let d = dd.getDate();
               if(d<10){
                d = `0${d}`
               }
               return y + "-" + m + "-" + d;
            },
            onClick(title){

                console.log(this.todayTime(1));
                console.log(this.todayTime(2));
                console.log(this.todayTime(3));
            //   function  GetDateStr(AddCount) {

                this.timeIndex = title;

            //    let dd = new Date();
            //    dd.setDate(dd.getDate() + title); //获取AddDayCount天后的日期
            //    let y = dd.getFullYear();
            //    let m = dd.getMonth() + 1; //获取当前月份的日期
            //    if(m<10){
            //     m = `0${m}`
            //    }
            //    let d = dd.getDate();
            //    if(d<10){
            //     d = `0${d}`
            //    }
               this.time1 = this.todayTime(title)

            //    Toast.length('正在加载')
               this.select()
                console.log(this.time1);
            },
         onClickLeft() {
           this.$router.go(-1)
         },
         onClickRight() {
           this.$router.push({name:'Movie'})
         },
         clickMenu(){
            console.log('q11');
         },
          //获取当前时间
          time(){
                let date = new Date();
            let nowMonth = date.getMonth() + 1;
            let strDate = date.getDate();
            let seperator = "-";
            if (nowMonth >= 1 && nowMonth <= 9) {
               nowMonth = "0" + nowMonth;
            }
            if (strDate >= 0 && strDate <= 9) {
               strDate = "0" + strDate;
            }
            let nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate;
            this.time1 = nowDate
        },
        select(){
            selectCinemas(this.time1,this.movieId,this.nowCityId,this.cityId).then(res=>{
            // console.log(res.data.data.cinemas);
            this.cinemas = res.data.data.cinemas;

            // console.log(this.cinemas);
        }).catch(err=>{
            console.log('err=>',err);
        })
        },
        cli(val){
            // console.log(this.option1[val].id);
            this.cityId = this.option1[val].id;

            // Toast.loading('正在搜索');

            this.select();
        },
        //点击影院
        clickCinemas(index,city,movieId){

            let indexTime = this.timeIndex
            // console.log(indexTime);
            // console.log(this.cinemas[index].id);
            let location = this.cinemas[index].addr;
            let id = this.cinemas[index].id
            // console.log(location,id,city,movieId);
            // Toast.loading('加载中');
            this.$router.push({name:'CinemaDetail',query:{location,id,city,movieId,indexTime}})
        },
        //点击箭头查看电影详情
        clickDetail(id){
            // Toast.loading('加载中');
            console.log('12',id);
            this.$router.push({name:'Detail',params:{id}})
        }
       },
    }
</script>

<style lang="scss" scoped>
.movieName-box{
    height: 200px;
    background-image: radial-gradient(rgb(140, 120, 109), rgb(88, 84, 81));
    .movie-box{
        height: 180px;
        width: 340px;
        // background-color: aquamarine;
        margin: auto;
        display: flex;
        // justify-content: space-between;
        img{
            height: 130px;
            width: 100px;
            margin-top: 35px;
        }
        .movie-text{
            margin-top: 35px;
            margin-left: 20px;
            width: 175px;
            // background-color: aqua;
            li{
                margin-top: 5px;
                
                color: rgb(202, 193, 188);
            }

            .movieName{
                font-weight: bold;
                color: aliceblue;
                font-size: 15px;
            }
            .score-box{
                font-weight: bold;
                color: rgb(254, 203, 0);
            }
        }
        .goDetail{
            line-height: 200px;
            margin-left: 30px;
        }

    }
}
.textbox{
    height: 330px;
    overflow: auto;
   .cinema-text{
    height: 120px;
    width: 350px;
    margin: auto;
    // background-color: aqua;
    border-bottom: 1px solid rgb(207, 203, 200);
       display: flex;
       .text-box{
        li{
            width: 280px;
            margin-top: 10px;
        }
        .title{
            font-weight: bold;
            font-size: 13px;
        }
        .lei-box{
            display: flex;
            // flex-flow: wrap;
            width: 300px;
            overflow: hidden;
            // background-color: aquamarine;
            .leiXing{
            border: 1px solid rgb(135, 196, 211);
            color: rgb(115, 203, 225);
            text-align: center;
            padding: 2px;
            margin-left: 2px;
        }
        }
        
       }
       .last-box{
        margin-left: 10px;
        .price-movie{
        color: rgb(191, 34, 34);
        margin-top: 30px;
        margin-bottom: 10px;
       }
       }
       
   }
}
</style>