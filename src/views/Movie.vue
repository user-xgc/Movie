<template>
    <div class="table">
        <div class="box">
            <div @click="cityClick">
                <van-icon name="location-o" />
               <span>{{ name }}</span>
               <van-icon  name="arrow-down" />
             </div>
             <div>蓝猫电影</div>
            <div @click="search(id)" class="search">
              <van-icon size="20" name="search" />
            </div>
        </div>
        <div>
          <van-tabs v-model="active">
            <van-tab title="热映">
                <div class="text1">
                    <div class="box1">
                    <div class="box2"><span>最受好评电影</span></div>
                    <div class="box3">
                        <div class="box4" v-for="(item,index) in goodMovie" :key="index"> 
                            <div class="text">观众评分  {{ item.score }}</div>
                            <div @click="movieDetail(item.movieId)" class="img"><img class="auto" :src="item.poster" alt=""></div>
                            <div class="span van-ellipsis">
                               <span>{{item.name}}</span> 
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div @click="movieDetail(item.id)" class="item1" v-for="(item,index) in hotMovie" :key="index">
                        <div class="item2"><img class="auto" :src=" item.img" alt=""></div>
                        <div class="item3">
                            <div class="item4">
                                <ul>
                                    <li>
                                    <div class="max">
                                        <span class="item6">{{item.nm}}</span>
                                        <div class="min" v-if="item.version">
                                            <div class="d2">2D</div>
                                        <div class="imax">IMAX</div>
                                        </div>
                                        
                                    </div></li>
                                    <li>
                                    <span v-if="item.sc">观众评  </span>
                                    <span v-else="item.sc">暂无评分</span>
                                    <span v-if="item.sc" class="it">{{ item.sc }}</span></li>
                                    <li class="van-ellipsis">主演：{{ item.star }}</li>
                                    <li>{{ item.showInfo }}</li>
                                </ul>
                            </div>
                            <div @click.stop="introClick(item.id)" :style="{'background-color':item.showStateButton.color}" class="item5">{{item.showStateButton.content}}</div>
                        </div>
                    </div>
                </div>
                </div>
            </van-tab>

            <!-- 影院 -->
            <van-tab title="影院">
                <div class="cinema-box">
                    <van-dropdown-menu>
                  <van-dropdown-item :title="cityName" ref="item">
                    <van-tabs v-model="active1" @click="clickTabs">
                        <div class="box-bo">
                            <van-tab title="商区">
                                
                           </van-tab>
                            <van-tab title="地铁线">
                                <!-- <van-sidebar v-model="activeKey1"> -->
                              <!-- <van-sidebar-item @click="clickCity(index)" title="全部"  /> -->
                          
                            <!-- </van-sidebar> -->
                            </van-tab>
                            <van-sidebar v-model="activeKey" class="city-box">
                                    <van-sidebar-item @click="clickCity1(index,item.name,item.id)" :title="`${item.name}(${item.count})`" v-for="(item,index) in district" :key="index"/>
                                    <div v-show="activeKey!=0" class="text-box">
                                        <van-cell-group>
                                          <van-cell :class="{active: isActive===index}" @click="clickCell(index,item.name)" :title="item.name" :value="item.count" v-for="(item,index) in districtList" :key="index"/>
                                        </van-cell-group>
                                    <!--  -->
                                    </div>  
                                 </van-sidebar>
                        </div>
                      
                    </van-tabs>
                  </van-dropdown-item>
                  <van-dropdown-item @change="clickBrand"  v-model="value1" :options="brand" />
                  <van-dropdown-item :title="teName" ref="item1">
                    <div class="box-cinema">
                        <span class="name-box">特色功能</span>
                        <van-row type="flex" gutter="20">
                          <van-col @click="clickService(index,item.name,item.id)" class="aaa van-ellipsis" :class="{ccc: isService == index}" span="6" v-for="(item,index) in service" :key="index">{{ item.name }}</van-col>                       
                                       
                        </van-row>
                        <span class="name-box">特殊厅</span>
                        <van-row type="flex" gutter="20">
                          <van-col :class="{ccc: isType == index}" @click="clickHallType(index,item.name,item.id)" class="aaa  van-ellipsis" span="6" v-for="(item,index) in hallType" :key="index">{{ item.name }}</van-col>                     
                        </van-row>
                    </div>
                    <div class="last-box1">
                        <van-row type="flex" justify="space-between">
                          <van-col @click="clickBack" class="aaa" span="6">重置</van-col>                       
                          <van-col @click="clickOk" class="aaa bbb" span="6">确定</van-col>                       
                        </van-row>
                    </div>
                   </van-dropdown-item>
                    </van-dropdown-menu>

                    <div class="cinema-text-box">
                        <van-empty v-show="isSearchDi" image="search" description="暂无影院，试试换换搜索条件" />
                      <div @click="goCinemaDetail(item.cinemaId,id,item.location)" class="cinema-text" v-for="(item,index) in cinemaList">
                        <ul>
                            <li>
                                <div class="van-ellipsis">
                                    <span class="size1">{{ item.title }}</span>
                                    <span class="size2">{{ item.price.n }}</span>
                                    <span class="size3">{{ item.price.q }}</span>
                                </div>
                            </li>
                            <li>
                                <div class="van-ellipsis address">
                                    <span>{{ item.location }}</span>
                                </div>
                            </li>
                            <li>
                                <div class="features-box" >
                                    <div class="features" v-for="(item1,index1) in item.services">{{ item1.text }}</div>
                                    <!-- <div class="eat">小吃</div> -->
                                </div>
                            </li>
                        </ul>
                      </div>
                    </div>
                </div>
                
            </van-tab>

            <van-tab title="待映">
                <div class="text2">
                    <div class="box1">
                        <div class="box2"><span>近期最受期待</span></div>
                        <div class="box3" >
                            <div @click="clickDateWant(item.id)" class="box4" v-for="(item,index) in mostExpectedMovie" :key="item.id"> 
                                <div class="text">{{item.wish}}人想看</div>
                                <div class="img"><img class="auto" :src="item.img" alt=""></div>
                                <div class="span van-ellipsis"><span>{{ item.nm }}</span></div>
                                <div class="day"><span>{{ item.comingTitle.split(' ')[0] }}</span></div>
                                <div class="like"><van-icon color="#fff" name="like" /></div>
                           </div>
                        </div>
                    </div>
                    <div class="item">
                    <div class="item1" >
                        <!-- <div class="date">8月22日 周二</div> -->
                        <div @click="clickWant(item.id)" class="text" v-for="(item,index) in hotMovies">
                            <div class="item2"><img class="auto" :src="item.img" alt=""></div>
                            <div class="item3">
                            <div class="item4">
                                <ul>
                                    <li>
                                    <div class="max">
                                        <span class="item6">{{ item.nm }}</span>
                                        <!-- <div class="min">
                                            <div class="d2">2D</div>
                                            <div class="imax">IMAX</div>
                                        </div> -->
                                        <!-- <div class="dian">点映</div> -->
                                    </div></li>
                                    <li>
                                    <span>{{ item.wish}}人看</span>
                                    </li>
                                    <li class="van-ellipsis">主演：{{ item.star }}</li>
                                    <li>{{ item.rt}}上映</li>
                                </ul>
                            </div>
                            <!-- <div class="item5">预售</div> -->
                            </div>
                        </div>
                        
                    </div>
                    </div>
                </div>
            </van-tab>
            <van-tab title="经典电影">
                   <div ref="jingdian" class="item0">
                        <div @click="clickDian(item.movieId)" class="item1" v-for="(item,index) in moreClassicList">
                           <div class="item2"><img class="auto" :src="item.poster" alt=""></div>
                              <div class="item3">
                                 <div class="item4 van-ellipsis">
                                <ul>
                                    <li><span class="item6">{{ item.movieInfo.title }}</span></li>
                                    <li><span>{{ item.movieInfo.englishTitle }}</span></li>
                                    <li>{{ item.movieInfo.actors }}</li>
                                    <li>{{ item.movieInfo.showInfo }}</li>
                                </ul>
                            </div>
                            <div class="item5"><span>{{ item.score }}</span>分</div>
                          </div>
                        </div>
                    </div>
            </van-tab>
          </van-tabs>
        </div>
        
    </div>
</template>

<script>
import { Toast } from 'vant';
import {getGoodMovie,getMovie,getMovie1,moreClassicList,filterCinemas,moreCinemas,getMovie2} from '../api/api.js';
// import HotMovie from '../components/Style.vue';
    export default {
        name:'Movie',
    //     components: {
    //         HotMovie,
    // },
        data(){
            return{
                active:0,

                active1:0,

                activeKey:0,

                activeKey1:0,
                //品牌名字
                paiName:'品牌',
                //特色名字
                teName:'特色',

                //城市名字
                cityName:'全城',

                name:'广州',
                //好评
                goodMovie:'',
                //最受期待
                hotMovie:'',
                //热映
                hotMovies:'',
                //城市id
                id:'',
                //待映
                mostExpectedMovie:'',
                //经典
                moreClassicList:'',
                //滑动到底部在加载10组数据，
                // isBottom:0

                //所有品牌
                brand:'',      
                value1:0,
                //所有区/地铁
                district:'',
                //复制
                district1:'',

                index1:0,

                //区对应的街道/地铁沿线
                districtList:'',
                //
                subway:'',
                //
                subwayList:'',
                //商区还是地铁
                isSubWay:false,
                //是否高亮
                isActive:0,
                //点击的城市或地铁
                texts:'',
                //影院服务
                service:'',
                //影厅类型
                hallType:'',
                //服务高亮
                isService:0,
                //类型高亮
                isType:0,
                //点击的服务
                serviceText:'全部',
                //点击的影院类型
                typeText:'全部',
                //当前时间
                time1:'',
                //行政区id
                districtId:-1,
                //影厅类型id
                hallTypeId:-1,
                //品牌id
                brandId:-1,
                //影院服务id
                serviceId:-1,
                //影院
                cinemaList:'',
                //是否按地铁搜索
                isSearchDi:false,
            }
        },
        computed:{
            phone(){
                return this.$store.state.phone;
            },
            msg(){
                return this.$store.state.msg;
            },
            isLogin(){
                return this.$store.state.isLogin;
            },
            // async moreCinema(){
            //     try {
            //        const res = await moreCinemas(this.time1,this.id, this.districtId, this.hallTypeId, this.brandId, this.serviceId);
            //     //    console.log(res);
            //        this.cinemaList = res.data;
            //        console.log(this.cinemaList);
            //        return this.cinemaList;
            //        } catch (err) {
            //        console.log('err=>', err);
            //        return err;
            //        }
            // }
        },
        created(){
            // console.log(this.time());
            
            let dat = JSON.parse(sessionStorage.getItem('Token'))

            //将数据放
            if(dat){
                this.$store.commit('changePhone', dat.phone);
                //根据登录手机号查看用户信息
            let dats = JSON.parse(localStorage.getItem('user')).filter(item=>item.phone == dat.phone);

            this.$store.commit('changeMsg', dats[0]);

            this.$store.commit('changeLogin', true);

            }
            
            // console.log(this.phone,this.msg,this.isLogin);
            let name1 = JSON.parse(localStorage.getItem('city'));

            console.log(name1);
            if(name1==null){
                this.name = '广州'
            }else{
                this.name = name1[0]
            }

            // console.log(name1);
            let id1 = JSON.parse(localStorage.getItem('cityId'));
            if(id1==null){
                this.id = 20
            }else{
                this.id = id1
            }


        //好评
        getGoodMovie().then(res=>{
            this.goodMovie=res.data.movieList;
            // console.log(this.goodMovie);
        }).catch(err=>{
            console.log('err=>',err);
        })

        //热映
        getMovie2(this.id).then(res=>{
            this.hotMovies = res.data.coming
        //    console.log(res);
        }).catch(err=>{
            console.log('err=>',err);
        })

        //影院筛选条件
        filterCinemas(this.id).then(res=>{
            
            //品牌
           let myBrand = res.data.brand.subItems.map((item,index)=>{
            return {
                text:`${item.name}(${item.count})`,
                name:item.name,
                value:index,
                count:item.count,
                id:item.id,
            }
            })
            this.brand = myBrand

            //区+街道
            this.district = res.data.district.subItems;
            
            this.district1 = res.data.district.subItems;
            //地铁线;
            this.subway = res.data.subway.subItems;

            //服务
            this.service = res.data.service.subItems;
            //类型
            this.hallType = res.data.hallType.subItems;
            // console.log(this.hallType);
            // console.log(this.service);

        }).catch(err=>{
            console.log('err=>',err);
        })

        //影院
        this.searchCinema()
        // moreCinemas(this.time,this.id,this.districtId,this.hallTypeId,this.brandId,this.serviceId).then(res=>{
        //     this.cinemaList = res.data;
        //     console.log(this.cinemaList);
        // }).catch(err=>{
        //     console.log('err=>',err);
        // })
        //热映最受期待
        getMovie().then(res=>{
            this.hotMovie=res.data.movieList;
            // console.log(this.hotMovie);
        }).catch(err=>{
            console.log('err=>',err);
        })


        //获取最受期待电影
        getMovie1(this.id).then(res=>{
            // console.log('最受期待',res);
            this.mostExpectedMovie= res.data.coming;
            // console.log(this.mostExpectedMovie);
        }).catch(err=>{
            console.log('err=>',err);
        })


        getMovie1(this.id).then(res=>{
            // console.log('最受期待',res);
            this.mostExpectedMovie= res.data.coming;
            // console.log(this.mostExpectedMovie);
        }).catch(err=>{
            console.log('err=>',err);
        })


        //获取经典电影
        moreClassicList().then(res=>{
            // console.log('经典',res);
            this.moreClassicList= res.data;
            // console.log(this.moreClassicList);
        }).catch(err=>{
            console.log('err=>',err);
        })
        },
        // directives: {
        //     scroll: {
        //       inserted(el, binding) {
        //         el.addEventListener('scroll', binding.value);
        //       },
        //       unbind(el, binding) {
        //         el.removeEventListener('scroll', binding.value);
        //       }
        //     }
        // },
        
        methods:{
            //点击待映-近期最受期待
            clickDateWant(id){
                // console.log(id);
                // Toast.loading('正在加载')
                this.$router.push({name:'Detail',params:{id}});
            },
            //点击待映
            clickWant(id){
                // Toast.loading('正在加载')
                console.log(id);
                this.$router.push({name:'Detail',params:{id}});
            },

            
            //点击经典
            clickDian(id){
                // console.log(id);
                // Toast.loading('正在加载')
                this.$router.push({name:'Detail',params:{id}});
            },
            //点击影院服务
            clickService(index,name,id){
                console.log(name);
                this.serviceId = id
                this.serviceText = name
                this.isService = index
            },
            //点击类型
            clickHallType(index,name,id){
                // console.log('类型',id);
                // console.log(this.hallType);
                console.log(name);
                this.hallTypeId = id
                this.typeText = name
                this.isType = index
            },
            //点击重置
            clickBack(){
                // console.log(this.hallType);
                this.serviceId = -1
                this.hallTypeId = -1
                this.serviceText = '全部';
                this.typeText = '全部';
                this.isType = 0;
                this.isService = 0
            },
            //点击确定
            clickOk(){
                // console.log(this.hallType);
                // console.log(this.cinemaList);
                console.log(this.typeText,this.serviceText);
                if(this.typeText=='全部'){
                    if(this.serviceText!='全部'){
                        this.teName = this.serviceText
                    }else{
                     this.teName = '特色'
                    }   
                }
                if(this.typeText!='全部'){
                    if(this.serviceText!='全部'){
                        this.teName = `${this.serviceText}/${this.typeText}`
                    }else{
                        this.teName = this.typeText
                    }

                }

                this.searchCinema()
                
                this.$refs.item1.toggle();
            },

            //获取影院
            searchCinema(){
                // Toast.loading('搜索中');
                moreCinemas(this.time,this.id,this.districtId,this.hallTypeId,this.brandId,
                this.serviceId).then(res=>{
                     if(res.data.length==0){
                        this.cinemaList = '';
                   this.isSearchDi = true;
                   return
                }else{
                    this.isSearchDi = false;
                    this.cinemaList = res.data;
                }
                
               
                    //  console.log(this.cinemaList);
                 }).catch(err=>{
                     console.log('err=>',err);
                 })
            },
            // 点击影院
            goCinemaDetail(id,city,location){
                console.log(id);
                console.log(city);
                // Toast.loading('正在加载')
                this.$router.push({name:'CinemaDetail',query:{id,city,location}})
            },
            //点击地铁站点
            clickCell(index,name){
                // console.log(index,name);
                console.log('12');
                if(name == '全部'){
                    // console.log('1212');
                    // console.log(this.texts);
                    this.cityName = this.texts;
                    this.$refs.item.toggle();
                    this.searchCinema()
                    return
                }
                this.cityName = name
                this.isActive = index;
                this.$refs.item.toggle();
                this.searchCinema()
            },
            //点击商区或地铁站
            clickTabs(title){
                // console.log(title);
                if(title==1){
                    this.isActive=0
                    this.activeKey = 0
                    this.district = this.subway
                }else{
                    this.isActive=0
                    this.activeKey = 0
                    this.district = this.district1
                }
                
            },
            //获取影厅
            cinemas(){
                moreCinemas(this.time,this.id,this.districtId,this.hallTypeId,this.brandId,this.serviceId).then(res=>{
                 console.log(res.data);
                }).catch(err=>{
                console.log('err=>',err);
             })
            },
            cityClick(){
                this.$router.push({name:'City'})
            },
            //滚动事件
            // handleScroll() {
            //     let divTop = this.$refs.jingdian.scrollTop
            //     console.log(divTop);
            //     if(divTop>530){
            //         this.isBottom=1
            //     }
            // },
            //影片详情
            movieDetail(id){
                console.log(id);
                // Toast.loading('正在加载')
                this.$router.push({name:'Detail',params:{id}})
            },
            //购票
            introClick(id){
                // console.log(this.id);
                let cityId = this.id
                console.log('点击了购票',id);
                this.$router.push({name:'MovieCinema',query:{id,cityId}})
            },
            //搜索
            search(id){
                console.log(id);
                this.$router.push({name:'Search',query:{id}})
            },
            //点击品牌
            clickBrand(val){
                // console.log(val);
                this.brandId = this.brand[val].id;
                this.searchCinema()
            },
            //点击行政区或地铁id
            clickCity1(index,name,id){

                this.districtId = id;

                this.districtList = this.district[index].subItems;

                this.texts = name;

                if(index ==0){
                    this.cityName = '全城';
                    this.searchCinema()
                    this.$refs.item.toggle();
                }
                // console.log(this.districtList);
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
            }
        }
    }
</script>

<style lang="scss" scoped>
.table{
    .box{
        display: flex;
        justify-content: space-around;
        height: 40px;
        text-align: center;
        line-height: 40px;
        .search{
            line-height: 47px;
        }
    }
    .text1::-webkit-scrollbar{
    display: none;
}
    .text1{
        height: 530px;
        overflow: auto;
        .box1{
        height: 180px;
        margin-top: 3px;
        background-color: rgb(255, 255, 255);
        .box2{
            margin-left: 10px;
            height: 40px;
            line-height: 40px;
        }
        .box3::-webkit-scrollbar{
    display: none;
}
        .box3{
            margin: auto;
                width: 350px;
                display: flex;
                overflow: auto;
                .box4{
                    position: relative;
                    .text{
                        width: 70px;
                        text-align: center;
                        margin: auto;
                        position: absolute;
                        bottom: 30px;
                        font-weight: bold;
                        color:rgb(245, 172, 1);
                    }
                    .img{
                        margin-right: 10px;
                        width: 80px;
                        height: 100px;
                        display: flex;
                        box-shadow: 0px 0px 0px 1px rgba(170,170,170, .9);
                        background-image: linear-gradient(to top, #000 0px, #eeeeee 20px);
                        // z-index: 1;
                        .auto{
                            width: 80px;
                            height: 100px;
                        }
                    }
                    
                    .span{
                        display: block;
                        margin-top: 10px;
                        color: black;
                        font-weight: bold;
                        width: 80px;
                    }
                }
            }
    }
    .item{
        margin-top: 10px;
        background-color: rgb(255, 255, 255);
        .item1{
            display: flex;
            margin-bottom: 10px;
            .item2{
                margin-top: 5px;
                margin-left: 10px;
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
                height: 100px;
                border-bottom: 1px solid rgb(157, 155, 155);
                .item4{
                    width: 220px;
                    .max{
                        display: flex;
                        text-align: center;
                        line-height: 20px;
                        
                        .min{
                            display: flex;
                            .d2{
                            border-top-left-radius: 3px;
                            border-bottom-left-radius: 3px;
                            width: 30px;
                            margin-left: 10px;
                            color: white;
                            background-color: rgb(80, 159, 201);
                        }
                        .imax{
                            border-top-right-radius: 3px;
                            border-bottom-right-radius: 3px;
                            width: 40px;
                            color:rgb(132, 199, 238);
                            border:  1px solid rgb(158, 201, 224);
                        }
                        }
                        .item6{
                        font-weight: bold;
                        font-size: 15px;
                    }
                    }
                    .it{
                        font-weight: bold;
                        color:rgb(245, 172, 1);
                    }
                    li{
                        margin-top: 7px;
                        margin-left: 10px;
                    }
                }
                .item5{
                    height: 25px;
                    width: 50px;
                    text-align: center;
                    line-height: 25px;
                    color: white;
                    border-radius: 10px;
                    margin: auto;
                }
            }
        }
    }
    }


    .text2::-webkit-scrollbar{
    display: none;
}
    .text2{
        height: 530px;
        overflow: auto;
        .box1{
        height: 200px;
        margin-top: 3px;
        background-color: rgb(255, 255, 255);
        .box2{
            margin-left: 10px;
            height: 40px;
            line-height: 40px;
        }
        .box3::-webkit-scrollbar{
    display: none;
}
        .box3{
            margin: auto;
                width: 350px;
                display: flex;
                overflow: auto;
                .box4{
                    position: relative;
                    .text{
                        width: 80px;
                        text-align: center;
                        margin: auto;
                        position: absolute;
                        bottom: 50px;
                        font-weight: bold;
                        color:rgb(245, 172, 1);
                    }
                    .img{
                        margin-right: 10px;
                        width: 80px;
                        height: 100px;
                        display: flex;
                        box-shadow: 0px 0px 0px 1px rgba(170,170,170, .9);
                        background-image: linear-gradient(to top, #000 0px, #eeeeee 20px);
                        // z-index: 1;
                        .auto{
                            width: 80px;
                            height: 100px;
                        }
                    }
                    .day{
                        color: #858383;
                        margin-top: 5px;
                    }
                    .like{
                        position: absolute;
                        top: 0px;
                        width: 20px;
                        height: 20px;
                        text-align: center;
                        line-height: 20px;
                        background-color: #2b2a2a;
                        opacity: .7;
                        border-bottom-right-radius: 7px;
                    }
                    .span{
                        display: block;
                        margin-top: 10px;
                        color: black;
                        font-weight: bold;
                        font-size: 10px;
                        width: 80px;
                    }
                }
            }
    }
    .item{
        margin-top: 10px;
        background-color: rgb(255, 255, 255);
        .item1{
            .date{
                margin-left: 10px;
                height: 30px;
                line-height: 30px;
                color: rgb(90, 90, 90);
            }
            .text{
                display: flex;
                .item2{
                margin-left: 10px;
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
                height: 100px;
                border-bottom: 1px solid rgb(157, 155, 155);
                .item4{
                    width: 220px;
                    .max{
                        display: flex;
                        text-align: center;
                        line-height: 20px;
                        
                        .min{
                            display: flex;
                            .d2{
                            border-top-left-radius: 3px;
                            border-bottom-left-radius: 3px;
                            width: 30px;
                            margin-left: 10px;
                            color: white;
                            background-color: rgb(80, 159, 201);
                        }
                    
                        .imax{
                            border-top-right-radius: 3px;
                            border-bottom-right-radius: 3px;
                            width: 40px;
                            color:rgb(132, 199, 238);
                            border:  1px solid rgb(158, 201, 224);
                        }
                        }
                        .dian{
                            // width: 50px;
                            margin-left: 5px;
                            border-radius: 3px;
                            width: 30px;
                            background-color: rgb(250, 175, 0);
                            color: #eeeeee;
                            font-size: 1px;
                        }
                        .item6{
                        font-weight: bold;
                        font-size: 15px;
                    }
                    }
                    .it{
                        font-weight: bold;
                        color:rgb(245, 172, 1);
                    }
                    li{
                        margin-top: 7px;
                        margin-left: 10px;
                    }
                }
                .item5{
                    background-color: rgb(66, 108, 224);
                    height: 25px;
                    width: 50px;
                    text-align: center;
                    line-height: 25px;
                    color: white;
                    border-radius: 10px;
                    margin: auto;
                }
            }
            }
            
        }
    }
    }


    .item0::-webkit-scrollbar{
    display: none;
}
    // .text3{
    //     height: 530px;
    //     overflow: auto;
    .item0{
        height: 530px;
        overflow: auto;
        margin-top: 10px;
        background-color: rgb(255, 255, 255);
        .item1{
            display: flex;
            margin-bottom: 10px;
            .item2{
                margin-top: 5px;
                margin-left: 10px;
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
                    width: 220px;
                    .item6{
                        font-weight: bold;
                        font-size: 15px;
                    }
                    li{
                        margin-top: 7px;
                        margin-left: 10px;
                    }
                }
                .item5{
                    height: 25px;
                    width: 50px;
                    text-align: center;
                    line-height: 25px;
                    margin: 10px auto;
                    span{
                        color: rgb(245, 172, 1);
                    }
                }
            }
        }
    }
    .cinema-box{
        .box-cinema{
            width: 350px;
            margin: auto;
            color: rgb(157, 155, 155);
            height: 250px;
            overflow: auto;
            .aaa{
                height: 40px;
                width: 80px;
                border-radius: 5px;
                border: 1px solid rgb(157, 155, 155);
                line-height: 40px;
                text-align: center;
                margin-left: 5px;
                margin-bottom: 10px;
            }
            .ccc{
                background-color: rgb(252, 240, 240);
                border: 1px solid rgb(240, 61, 55);
            }
            .name-box{
                height: 40px;
                width: 80px;
                line-height: 40px;
                text-align: center;
            }
            
        }
        .last-box1{
            // height: 48px;
            .aaa{
                height: 40px;
                width: 80px;
                border-radius: 5px;
                border: 1px solid rgb(157, 155, 155);
                line-height: 40px;
                text-align: center;
                margin-left: 5px;
                margin-bottom: 10px;
                margin-top: 8px;
                
            }
            .bbb{
                background-color: rgb(240, 61, 55);
                margin-right: 10px;
                color: #eeeeee;
            }
        }
        .cinema-text-box{
            height: 500px;
            overflow: auto;
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
                    flex-flow: wrap;
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
        .box-bo{
            height: 250px;
            .city-box::-webkit-scrollbar{
                display: none;
            }
            .city-box{
                color: red;
                // background-color: #d27a7a;
                height: 240px;
            }
            .text-box::-webkit-scrollbar{
                display: none;
            }
            .text-box{
            // background-color: #d27a7a;
            position: absolute;
            top: 50px;
            left: 80px;
            height: 240px;
            width: 290px;
            overflow: auto;
            .active{
                color: red;
            }
        }
        } 
       
    }
    }

// }
</style>