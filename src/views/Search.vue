<template>
    <div>
        <div class="table">
            <span>蓝猫电影</span>
            <div @click="clickLeft" class="back-box"><van-icon name="arrow-left" size="20" /></div>
        </div>
        
        <div class="search">
            <form action="/">
              <van-search
                v-model="value"
                show-action
                placeholder="搜电影，搜影院"
                @search="onSearch"
                @cancel="onCancel"
                @input="onInput"
                @clear="clear"
              />
            </form>
        </div>
        <van-empty v-if="isShowEmpty" image="search" description="没有找到相关内容" />
        <!-- 搜索历史 -->
        
            <div v-show="!isSearch" class="history-box">
            <div class="history" v-for="(item,index) in user.searchHistory">
                <div class="aa">
                    <div class="time"><van-icon name="clock-o" size='20' color="rgb(181, 181, 181)" /></div>
                    <span @click="clickHis(item)" class="van-ellipsis">{{ item }}</span>
                </div>
                <div @click="clickX(index)" class="box-x"><van-icon name="cross" size='20' color="rgb(181, 181, 181)" /></div>
            </div>
       
        </div>
        

        <!-- 电影搜索内容 -->
        <div v-if="isShowMovie" class="search-movie-text" ref="movie">
                <div class="search-box" >
                   <div class="span1">
                      <span >电影/电视剧/综艺</span> 
                   </div>
                
                    <div class="item1" @click="clickItem1(item.id)" v-for="(item,index) in threeMovie">
                     <div class="item2"><img class="auto" :src="item.poster" alt=""></div>
                     <div class="item3" >
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
                          <div v-else="!item.score" class="item5">{{ item.wish}}人想看</div>
                          <!-- <div class="item7">购票</div>  -->
                        </div>
                         
                    </div>
                    </div>

                </div>
               <div @click="clickBott(movie)" class="bott">
                   <span>查看全部{{ movie.length }}部影视剧</span>
               </div>
        </div>

        <!-- 影院搜索内容 -->
        <div v-if="isShow" class="search-cinema">
            <div class="tables">
                <span >影院</span>
            </div>
            <div class="cinema-text-box">
                <div class="cinema-text" @click="clickCinema(item.id,index)" v-for="(item,index) in twoCinema">
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
                                <div class="features-box" >
                                    <div class="features" :class="{eat:item1=='小吃'}" v-for="(item1,index1) in item.info.tags">{{ item1 }}</div>
                                    <!-- <div class="eat">小吃</div> -->
                                </div>
                            </li>
                        </ul>
                </div>
            </div>
            <div @click="clickSearchCinema(cinema)" class="someCinema">查看全部{{ cinema.length}}家电影院</div>
        </div>
    </div>
</template>

<script>

import { Toast } from 'vant';
import {searchMovie,searchCinemas} from '../api/api.js';
export default {
    name:'Search',
  data() {
    return {
        isLogin:false,
      value: '',
      //登录用户
      user:'',
      //未登录用户
      noUser:'',
      //未登录搜索历史
      
    //   searchHistory:'',
      //是否展示没有搜索到的图标
      isShowEmpty:false,
      //是否搜索
      isSearch:false,
      //是否展示定影页面
      isShowMovie:false,
      //城市id
      cityId:'',
      //搜索的电影
      movie:'',
      //搜索的前三部
      threeMovie:'',
      //搜索的影院
      cinema:'',
      //是否显影院
      isShow:false,
      //全部影院
      cinema:'',
      //前两个影院
      twoCinema:'',
    };
  },
  computed:{
    phone(){
        return this.$store.state.msg.phone;
    },
    // history(){
    //     return this.$store.state.msg.searchHistory;
    // }
  },
  created(){

    // console.log(this.phone);
    let text = JSON.parse(sessionStorage.getItem('Token'));
    if(text){
        this.isLogin = true
        console.log('1212');
         //获取登录人的本地信息
    this.user = JSON.parse(localStorage.getItem('user')).filter(item=>item.phone == this.phone)[0];

    // this.searchHistory = this.user.searchHistory;

    // console.log(this.user.searchHistory);
    //非登录人员
    this.noUser = JSON.parse(localStorage.getItem('user')).filter(item=>item.phone != this.phone);
    }else{

    }

   

    this.cityId = this.$route.query.id;

  },
  methods: {
    //确定搜索时触发
    onSearch(val) {
        // this.value = '

     //搜索电影
     searchMovie(val,this.cityId).then(res=>{

        // console.log(this.$refs.movie);
        if(res.data.length==0){
            this.isShowEmpty = true;
            this.isShowMovie = false
            return
        }
        this.isShowMovie = true
        this.movie = res.data;

        this.threeMovie = res.data.slice(0,3)

        // console.log(this.threeMovie);
    }).catch(err=>{
        console.log('err=>',err);
    })
    //搜索影院
    searchCinemas(val,this.cityId).then(res=>{

        if(res.data.length!=0){
            
            this.isShow = true;

            this.cinema = res.data;

            this.twoCinema = res.data.slice(0,2);
        }

    }).catch(err=>{
        console.log('err=>',err);
    })

    if(!val){
            Toast('请输入搜索内容');
            return
        }
        console.log(val);
     this.isSearch = true

     if(this.user.searchHistory.indexOf(val)==-1){
        this.user.searchHistory.unshift(val)
     }
     if(this.user.searchHistory.length>=4){
        this.user.searchHistory.splice(3,1)
     }
    //  console.log(this.user);

      let dat = [this.user,...this.noUser];

    //   console.log(dat);
     localStorage.setItem('user',JSON.stringify(dat))
    },
    //点击搜索历史
    clickHis(val){
        console.log(val);

        this.value = val;

        this.onSearch(val)
    },
    //点击X
    clickX(index){
        // this.history.splice(index,1)
        this.user.searchHistory.splice(index,1);

        console.log('new',this.user);
        let dat = [this.user,...this.noUser];

     localStorage.setItem('user',JSON.stringify(dat))
    },
    //点击取消
    clear(){
        this.isSearch = false;
        this.isShowMovie = false;
        this.isShow = false
    },
    //点击左箭头
    clickLeft(){
        this.$router.go(-1)
    },
    //点击取消文字
    onCancel() {
      this.$router.go(-1)
    },
    
    //输入框内容变化时触发,返回输入的内容
    onInput(val){
        //   console.log(val);
    },
    //点击查看更多影视剧
    clickBott(movies){
        this.$router.push({name:'AllMovies',params:{movies}})
    },
    //点击查看其他影院
    clickSearchCinema(cinemas){
        this.$router.push({name:'SearchCinema',params:{cinemas}})
    },
    //点击电影
    clickItem1(id){
        console.log(id);
        this.$router.push({name:'Detail',params:{id}})
    },
    //点击影院
    clickCinema(id,index){
        let city =this.cityId;
        let location = this.twoCinema[index].info.address
        console.log(id,city,location);
        this.$router.push({name:'CinemaDetail',query:{id,city,location}})
    }
  },
};
    
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
.history-box{
    background-color: rgb(255, 255, 255);
    border-top: 2px solid rgb(179, 178, 178);
    .history{
        margin-left: 10px;
        display: flex;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid rgb(179, 178, 178);
        .aa{
            // background-color: aqua;
            display: flex;
            .time{
                line-height: 47px;
                margin-right: 10px;
            }
            span{
                width: 150px;
                font-weight: bold;
            }
        }
        .box-x{
            margin-left: 130px;
            line-height: 47px;
        }
    }
}
.search-movie-text{
    background-color: rgb(255, 255, 255);
    border-top: 2px solid rgb(239, 239, 239);
        .search-box{
        .span1{
            height: 40px;
            line-height: 40px;
            color: rgb(156, 154, 153);
            font-size: 15px;
            border-bottom: 1px solid rgb(206, 201, 201);
            span{
                margin-left: 10px;
            }
        }
        .item1{
            display: flex;
            // margin-bottom: 10px;
            // margin-top: 10px;
            height: 110px;
            border-bottom: 1px solid rgb(224, 222, 222);
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
                     height: 25px;
                     line-height: 25px;
                     text-align: center;
                     border-radius: 15px;
                     color: white;
                     margin-top: 10px;
                     margin-left: 50px;
                   }
            }
        }
    }

    .bott{
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: rgb(242, 107, 96);
        font-size: 15px;
    }
    }

    .search-cinema{
        margin-top: 10px;
        background-color: rgb(255, 255, 255);
        .tables{
            height: 40px;
            line-height: 40px;
            span{
                margin-left: 10px;
                color: rgb(162, 167, 180);
                font-size: 15px;
            }
        }
        .cinema-text-box{
            border-top: 1px solid rgb(179, 178, 178);
            border-bottom: 1px solid rgb(179, 178, 178);
            .cinema-text{
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
                    
                    // background-color: aqua;
                    width: 250px;
                    
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
        }
        .someCinema{
            height: 40px;
            line-height: 40px;
            text-align: center;
            color: rgb(242, 107, 96);
            font-size: 15px;
        }
    }
</style>