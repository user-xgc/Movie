<template>
    <div>
        <div class="big-box">
            <div class="top-box">
                <div class="top-box1">
                    <div class="tittle-box">
                        <span @click="clickMao">蓝猫电影</span>
                        <span> &gt; </span>
                        <span class="movie-name">{{name}}</span>
                   </div>
                   <div class="movie-text" >
                        <!-- <div class="icon" @click="showPopup(vdUrl,videoName)" >
                            <van-icon size="30" color="rgb(95, 93, 87)" name="play-circle" />
                            <div>
                        </div>
                        </div> -->
                        <div class="img-box"><img :src="movieIcon" alt=""></div>
                        <div class="text">
                            <div class="text1">
                                <ul>
                                    <li><span>{{name}}</span></li>
                                    <li><div class="van-ellipsis">{{eName}}</div></li>
                                    <li>{{ cat }}</li>
                                    <li>{{ star }}</li>
                                    <li>{{ date }} / {{ time}}分钟</li>
                                </ul>
                            </div>
                            <div v-show="!isLookedMovie" class="btn">
                                <div class="my-score" v-if="isLooked"><span>我的评分 {{ show2 }}星</span>
                                    <van-rate
                                         v-model="show2"
                                         :size="20"
                                         color="#ffd21e"
                                         void-icon="star"
                                         void-color="rgb(200, 201, 204)"
                                         readonly 
                                       /></div>
                                <div v-else="!isLooked" class="btn-text">
                                    <div v-show="isWantMovie">
                                        <div  class="like">已想看</div>
                                    </div>
                                    <div v-if="!isWantMovie">
                                        <div v-if="!isWant" @click="clickWant" class="like"><van-icon name="like" />想看</div>
                                        <div v-else="isWangMovie" @click="clickWant" class="like">已想看</div>
                                    </div>
                                <div @click="clickLooked" class="star"><van-icon name="star" />看过</div>
                                </div>
                                
                                <van-dialog @confirm="clickOk" v-model="shows" title="评分" show-cancel-button>
                                    <div class="star-text">
                                        <van-rate
                                         v-model="value"
                                         :size="25"
                                         color="#ffd21e"
                                         void-icon="star"
                                         void-color="rgb(200, 201, 204)"
                                         @change="clickScore"
                                       />
                                    </div>
                                </van-dialog>
                            </div>
                            <div v-show="isLookedMovie" class="looked-box">
                                <div class="kan">
                                    <span>我的评分 {{ show3 }}星</span>
                                    <van-rate
                                         v-model="show3"
                                         :size="20"
                                         color="#ffd21e"
                                         void-icon="star"
                                         void-color="rgb(200, 201, 204)"
                                         readonly 
                                       />
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div class="stars">
                        <div class="str1"><van-icon name="medal" />蓝猫购票评分</div>
                        <div class="like">{{ wish}}人想看</div>
                        <div class="likes">{{ watched}}人看过</div>
                        <div class="score">
                            <div class="score1">
                                <div class="score2"><span>{{ score }}</span></div>
                                <div class="score3"><span>{{ num}}人评</span></div>
                            </div> 
                            <div class="star1">
                                <div class="b">
                                    <ul>
                                        <li><van-rate :size="10" v-model="value1" readonly color="rgb(78, 63, 50)" void-color="rgb(108, 96, 84)" void-icon="star" /></li>

                                        <li><van-rate :size="10" void-color="rgb(108, 96, 84)" v-model="value2" readonly color="rgb(78, 63, 50)" void-icon="star" /></li>

                                        <li><van-rate :size="10" void-color="rgb(108, 96, 84)" v-model="value3" readonly color="rgb(78, 63, 50)" void-icon="star" /></li>

                                        <li><van-rate :size="10" void-color="rgb(108, 96, 84)" v-model="value4" readonly color="rgb(78, 63, 50)" void-icon="star" /></li>

                                        <li><van-rate :size="10" void-color="rgb(108, 96, 84)" v-model="value5" readonly color="rgb(78, 63, 50)" void-icon="star" /></li>
                                    </ul>
                                </div> 
                                <div class="a">
                                    <ul>
                                        <li v-for="(item,index) in movieScore"><van-progress track-color="rgb(80, 66, 52)" :percentage="item"  pivot-text="" color="rgb(136, 126, 116)" stroke-width="8" /></li>
                                    </ul>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="spake"><van-icon class="i" color="rgb(150, 132, 90)" name="thumb-circle-o" />{{ text }}</div>
                    </div>
                    <div class="synopsis">
                        <div>
                            <div class="jian"><span>简介</span></div>
                            <div class="zhan" @click="clickZhan">
                                <span v-show="!isClickZhan">展开</span>
                                <span v-show="isClickZhan">收起</span>
                                <van-icon :name="isClickZhan?'arrow-up' :'arrow-down'" />
                            </div>
                        </div>
                        <div class="c" :class="{'van-multi-ellipsis--l3': !isClickZhan}" >
                            <span>{{ movieSynopsis }}</span>
                        </div>
                    </div>
                    <div class="actorList">
                        <div class="people">演职人员</div>
                        <div class="all">全部 &gt;</div>
                        <div class="acto-box">
                            <div class="acto" v-for="(item,index) in starList">
                                <div class="img-box"><img :src="item.avatar" alt=""></div>
                                <div class="aa">{{ item.cnm }}</div>
                                <div class="bb">{{ item.desc }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="video">
                        <div class="a">视频</div>
                        <div class="b">全部{{ videos.length }}部</div>
                        <div class="vide">
                            <div class="video-box" v-for="(item,index) in videos">
                                <img :src="item.video.imgUrl" alt="">
                                <div class="nn" @click="clickIcon(item.video.url,item.title)">
                                   <van-icon  name="play" color="rgb(34, 34, 34)" size="20" /> 
                                </div>                           
                             </div> 
                             
                        </div>
                        
                    </div>
                    <div class="imgs-box">
                        <div class="ju">剧照</div>
                        <div class="juAll">全部{{imgs.length}}张</div>
                        <div class="imgs">
                            <img @click="showPopup(index)" v-for="(img,index) in imgs" v-lazy="img" />
                            <van-popup v-model="show"><img class="big-img" :src="imgs[imgIndex]" alt=""></van-popup>
                        </div>
                    </div>
            </div>
            <div class="bottom-box">
                <div class="comment-box">
                    <div class="short-comment">
                        <div class="tt"><span>短评</span></div>
                          <div class="people-text" v-for="(item,index) in comments">
                            <div class="img-box"><img :src="item.avatarUrl" alt=""></div>
                            <div class="text">
                                <div class="thumb"><van-icon name="thumb-circle-o" />{{item.upCount}}</div>
                                <div @click="clickShop" class="shop">购票</div>
                                <ul>
                                    <li>{{ item.nick }}</li>
                                    <li>
                                        <van-rate
                                       v-model="value6"
                                       :size="15"
                                       color="#ffd21e"
                                       void-icon="star"
                                       void-color="#eee"
                                       readonly 
                                     />
                                     <span class="fen">{{ item.score}}分</span>
                                    </li>
                                    <li><div class="van-multi-ellipsis--l3">
                                        {{ item.content }}
                                    </div></li>
                                    <li>
                                        <div class="bot">
                                            <span>{{ item.startTime }}</span>
                                        <span class="hui">{{ item.replyCount}}回复</span>
                                        </div>
                                        
                                    </li>
                                </ul>
                            </div>
                          </div>
                    </div>
                </div>
                <div class="long-comment">
                    <div class="long-box">
                       <div class="long">长评论</div>
                       <div class="text-box" v-for="(item,index) in filmReviews">
                            <div class="img-box"><img :src="item.author.avatarurl" alt=""></div>
                            <div class="text">
                                <ul>
                                    <li>{{ item.author.nickName }}</li>
                                    <li>   <van-rate
                                       v-model="value6"
                                       :size="15"
                                       color="#ffd21e"
                                       void-icon="star"
                                       void-color="#eee"
                                       readonly 
                                     />
                                     <span class="fen">10分</span></li>
                                    <li class="biao cv"><div class="van-ellipsis">{{ item.title }}</div></li>
                                    <li class="cv"><div @click="showPopup1" class="van-ellipsis">{{ item.text }}</div></li>
                                    <li class="last">
                                        <span>{{ item.created }}</span>
                                        <span><van-icon name="chat-o" />{{ item.commentCount }}</span>
                                    </li>
                                </ul>
                                <van-popup v-model="show1">{{ item.text }}</van-popup>
                            </div>
                        </div> 
                      
                    </div>
                    
                </div>
                <div class="price-box">
                    <div class="box">
                        <div class="gou"><span>票房</span></div>
                        <div class="price-text">
                            <div class="box1">
                                <div class="a">{{ lastDayRank }}</div>
                                <div>昨日排名</div>
                            </div>
                            <div class="box1">
                                <div class="a">{{ firstWeekBox }}</div>
                                <div>首周票房(万)</div>
                            </div>
                            <div class="box1">
                                <div class="a">{{ sumBox }}</div>
                                <div>累计票房(万)</div>
                            </div>
                        </div>
                        <div class="lookSumBox">
                            <a :href="url"><span>查看票房详情</span></a>
                            <van-icon name="arrow" />
                        </div>
                    </div>
                </div>
                <div class="last-box">
                    <span>违法和不良信息举报电话：18352011214</span>
                </div> 
            </div>
        </div>
            
            <div class="table-box">
                <div @click="showShare = true" class="icon"><van-icon size="25" name="share-o" /></div>
                <div @click="clickPr(movieId)" class="shop-box">特惠购票</div>
            </div>

            <van-share-sheet
              v-model="showShare"
              title="立即分享给好友"
              :options="options"
              @select="onSelect"
            />
        </div>
    </div>
</template>

<script>
import {movieDetail} from '../api/api.js';
import { Toast } from 'vant';
import { Dialog } from 'vant'
    export default {
        name:'Detail',
        data(){
            return{
                //分享面板
                showShare: false,
                options: [
                  { name: '微信', icon: 'wechat' },
                  { name: '微博', icon: 'weibo' },
                  { name: '复制链接', icon: 'link' },
                  { name: '分享海报', icon: 'poster' },
                  { name: '二维码', icon: 'qrcode' },
                ],
                value1:0,
                value2:1,
                value3:2,
                value4:3,
                value5:4,
                value6:5,
                isClickZhan:false,
                //是否登录
                isLogin:false,
                //登录的人的电话
                phone:'',
                //登录信息
                userText:'',
                //未登陆用户
                noUserText:'',
                //电影是已经想看
                isWantMovie:false,
                //电影是否已经看过
                isLookedMovie:false,
                //已经看过的星级
                show3:'',
                show:false,
                imgIndex:'',

                //个人看过后评分
                value:0,
                //是否看过
                isLooked:false,

                //展示看过弹窗
                shows:false,

                //展示个人评分的星级分数
                show2:0,
                //弹出框星级分数
                show1:false,
                //电影id
                movieId:'',
                //电影名字
                name:'',
                //英文名
                eName:'',
                //电影图标
                movieIcon:'',
                //电影简介
                movieSynopsis:'',
                //上映时间
                date:'',
                //类型
                cat:'',
                //主演
                star:'',
                //时间
                time:'',
                //电影预告
                vdUrl:'',
                //预告名字
                videoName:'',
                //评分人数
                num:'',
                //想看的人数
                wish:'',
                //看过的人数
                watched:'',
                //平分
                score:'',
                //平分下的内容
                text:'',
                //评分
                movieScore:[],
                //演员
                starList:'',
                //视频
                videos:'',
                //图片
                imgs:[],
                //短评热评
                comments:'',
                //长评
                filmReviews:'',
                //首周票房
                firstWeekBox:'',
                //累计票房
                sumBox:'',
                //昨日排名
                lastDayRank:'',
                //票房详情url
                url:'',
                //是否已经想看
                isWant:false
            }
        }, 
        components: {
            [Dialog.Component.name]: Dialog.Component,
        },
        created(){

            //查看回话存储找到token数据
            let text = JSON.parse(sessionStorage.getItem('Token'));
             let movId = this.$route.params.id;

            this.movieId = movId

            movieDetail(movId).then(res=>{

                let data = res.data

                // console.log(data.mbox);

                let movie9 = data.movie.distributions[0].proportion;

                let movie5 = data.movie.distributions[1].proportion;

                let movie1 = data.movie.distributions[2].proportion;

                this.movieScore = [movie9/1,movie5/2,movie5/2,movie1/2,movie1/2];

                let message = data.$share.wechat.message;

                // this.comments = data.comments.hotComments.slice(0,5);

                let comments = data.comments.hotComments.slice(0,5);

              
                comments.map(item=>{
                    let time = this.timestampToTime(parseInt(item.startTime))
                    item.startTime = time
                });

                this.comments = comments;

                let filmReviews = data.filmReviews.filmReviews

                filmReviews.map(item=>{
                    item.created = this.timestampToTime(parseInt(item.created))
                });

                this.filmReviews = filmReviews;

                this.firstWeekBox = this.toThousands(data.mbox.mbox.firstWeekBox);

                this.sumBox = this.toThousands(data.mbox.mbox.sumBox);

                this.lastDayRank = data.mbox.mbox.lastDayRank;

                this.url = data.mbox.url;

                this.videos = data.feedVideos.feeds;

                this.starList = data.celebrities;

                this.movieIcon = message.icon;

                this.movieSynopsis = message.desc.replace(/[\r\n]/g,"");

                this.score = data.movie.sc;

                console.log(this.score);

                this.text = data.movie.scm

                this.name = data.movie.nm;
                
                this.date = data.movie.pubDesc; 

                this.cat = data.movie.cat;

                this.imgs = [...data.movie.photos]

                let img1 = data.newsList.newsList[0].previewImages

                let img2 = data.newsList.newsList[1].previewImages

                img1.forEach(item=>{
                    this.imgs = [...this.imgs,item.url]
                })

                img2.forEach(item=>{
                    this.imgs = [...this.imgs,item.url]
                })

                this.star = data.movie.star;

                this.eName = data.movie.enm;

                this.time = data.movie.dur;

                this.vdUrl = data.movie.videourl;

                this.videoName = data.movie.videoName
                
                this.num = this.toThousands(data.movie.snum);

                this.wish = this.toThousands(data.movie.wish);

                this.watched = this.toThousands(data.movie.watched);

                // console.log(this.movieSynopsis,this.name,this.date,this.cat,this.eName,this.time,this.vdUrl,this.num,this.wish,this.watched,this.score);
                
            }).catch(err=>{
                console.log('err=>',err);
            })
            // console.log(text.phone);
            if(text){
                this.phone = text.phone;

                this.isLogin = true;

                this.userText = JSON.parse(localStorage.getItem('user')).filter(item=>item.phone == this.phone)

                this.noUserText = JSON.parse(localStorage.getItem('user')).filter(item=>item.phone != this.phone)

                // console.log(this.noUserText);
                //查看该电影是否已经想看
                // console.log(this.movieId);
                let movieWant = this.userText[0].want.filter(item=>item.movieId == this.movieId)
                if(movieWant.length!=0){
                    console.log('已经想看',movieWant);
                    this.isWantMovie = true;
                    // this.isWant = true;
                }else if(movieWant.length ==0) {
                    console.log('没想');
                    this.isWantMovie = false
                }

                //查看该电影是否已经看过
                // console.log(this.movieId);
                 let movieLooked = this.userText[0].looked.filter(item=>item.movieId == this.movieId)
                 if(movieLooked.length!=0){
                    console.log('已经看过',movieLooked);
                    this.show3 = movieLooked[0].score
                    this.isLookedMovie = true
                }else if(movieLooked.length ==0){
                    console.log('没看');
                    this.isLookedMovie = false
                }
            }
           

            

        },
        methods:{
            //分享
            onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },
            clickZhan(){
                this.isClickZhan=!this.isClickZhan
            },
            clickMao(){
                this.$router.push({name:'Movie'})
            },
            showPopup(url,title) {
                this.$router.push({name:'PlayDetailVideo',params:{url,title}})
            },
            showPopup1() {
                this.show1 = true;
                console.log('1212');
            },
            //点击购票
            clickShop(){
                this.$router.push({name:''})
            },
            
            toThousands(num) {
                
                let initNum = (num || 0).toString(), result = '', formatNum = '';
                if (initNum.indexOf('.') > -1) formatNum = (num || 0).toString().split('.')
               num = formatNum ? formatNum[0] : initNum;
              while (num.length > 3) {
              result = ',' + num.slice(-3) + result;
              num = num.slice(0, num.length - 3);
              }
              if (num) { result = formatNum ? num + result + '.' + formatNum[1] : num + result; }
              return result;
            },
            //点击小图标
            clickIcon(url,title){
                console.log(title);
                this.$router.push({name:'PlayDetailVideo',params:{url,title}})
            },
            //展开
            showPopup(index) {
                this.imgIndex = index
               this.show = true;
            },
            //点击想看
            clickWant(){
                console.log(this.movieId,this.name,this.eName,this.movieIcon,this.cat,this.star,this.date,this.time);

                if(this.isLogin){
                   if(this.isWant){
                    Toast('已经想看')
                   }
                this.isWant = true;

                let obj = {
                    movieId:this.movieId,
                    movieIcon:this.movieIcon,
                    name:this.name,
                    eName:this.eName,
                    cat:this.cat,
                    star:this.star,
                    time:this.time,
                    date:this.date,
                    score:this.score
                }
                   
                   this.userText[0].want.push(obj);

                   let date = [this.userText[0],...this.noUserText];

                   console.log(date);

                   localStorage.setItem('user',JSON.stringify(date))
                //    console.log(this.userText);

                

                }else{
                    Toast('请先登录')
                    setTimeout(() => {
                        this.$router.push({name:'Login'})
                    }, 1000);
                    
                }
                
            },
            //点击看过
            clickLooked(){
                // console.log(this.movieId,this.name,this.eName,this.movieIcon,this.cat,this.star,this.date,this.time);

                if(this.isLogin){

                    this.shows = true;

                }else{
                    Toast('请先登录')

                    setTimeout(() => {

                        this.$router.push({name:'Login'})

                    }, 1000);
                }
                
            },
            //点击看过后点击确认
            clickOk(){
                this.isLooked = true;

                let obj = {
                    movieId:this.movieId,
                    movieIcon:this.movieIcon,
                    name:this.name,
                    eName:this.eName,
                    cat:this.cat,
                    star:this.star,
                    time:this.time,
                    date:this.date,
                    score:this.show2
                }

                

                this.userText[0].looked.push(obj);

                // let date = [...this.userText,...this.noUserText];
                 let date = [this.userText[0],...this.noUserText];
                console.log(date);

                localStorage.setItem('user',JSON.stringify(date))

                // console.log(this.userText);
                console.log('121');
            },
            //个人评分
            clickScore(val){
                this.show2 = val;
                console.log(val);
            },
            //点击购票
            clickPr(id){
                this.$router.push({name:'MovieCinema',query:{id}})
            },
            timestampToTime (time) {
                 //时间戳转日期
                let date = new Date(time);
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? ('0' + MM) : MM;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                let m = date.getMinutes();
                m = m < 10 ? ('0' + m) : m;
                let s = date.getSeconds();
                s = s < 10 ? ('0' + s) : s;
                // return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
                // return y + '-' + MM + '-' + d;
                return MM + '-' + d;

			},

           
        }
    }
</script>

<style lang="scss" scoped>
.big-box{
    .top-box::-webkit-scrollbar{
        display: none;
    }
    .top-box{
        overflow: auto;
        height: 617px;
        background-color: rgb(89, 71, 54);
        .top-box1{ 
            width: 350px;
            margin: auto;
            .tittle-box{
                height: 40px;
                line-height: 40px;
                color: rgb(204, 203, 202);
            }
             .movie-text{
                display: flex;
                position: relative;
                .icon{
                    position: absolute;
                    bottom: 10px;
                    // background-color: white;
                }
                 .img-box{
                     width: 100px;
                     height: 130px;
                     img{
                         width: 100px;
                         height: 130px;
                     }
                 }
                 .text{
                    margin-left: 10px;
                    .looked-box{
                        // background-color: aqua;
                        .kan{
                        color: azure;
                    }
                    }
                    
                    .text1{
                        li{
                            width: 250px;
                            color: rgb(152, 141, 130);
                            margin-top: 3px;
                        }
                        span{
                            color: white;
                            font-weight: bold;
                            height: 30px;
                            font-size: 18px;
                            display: block;
                        }
                    }
                    .btn{
                        
                        width: 240px;
                        margin-top: 3px;
                        .my-score{
                            // border: 1px solid black;
                            // border-radius: 3px;
                            color: azure;
                        }
                        .btn-text{
                            display: flex;
                            justify-content:space-between;
                        }
                        .star-text{
                            margin-left: 90px;
                        }
                        .like{
                            color: rgb(255, 255, 255);
                            text-align: center;
                            line-height: 30px;
                            width: 110px;
                            height: 30px;
                            border-radius: 5px;
                            background-color: rgb(147, 135, 124);
                        }
                        .star{
                            color: rgb(255, 255, 255);
                            text-align: center;
                            line-height: 30px;
                            // margin-left: 10px;
                            width: 110px;
                            height: 30px;
                            border-radius: 5px;
                            background-color: rgb(147, 135, 124);
                        }
                    }
                 }
             }
             .stars{
                height: 150px;
                background-color: rgb(73, 58, 44);
                margin-top: 20px;
                border-radius: 10px;
                position: relative;
                .str1{
                    color: white;
                    position: absolute;
                    top: 10px;
                    left: 10px;
                }
                .like{
                    position: absolute;
                    top: 10px;
                    left: 150px;
                    color: rgb(149, 140, 132);
                }
                .likes{
                    position: absolute;
                    top: 10px;
                    width: 110px;
                    left: 230px;
                    text-align: right;
                    color: rgb(149, 140, 132);
                }
                .score{
                    position: absolute;
                    top: 35px;
                    left: 50px;
                    display: flex;
                    .score1{
                        .score2{
                            // background-color: aqua;
                            color: rgb(255, 180, 0);
                            font-weight: bold;
                            font-size:35px;
                            text-align: right;
                        }
                        .score3{
                            margin-top: 5px;
                            color: rgb(105, 92, 80);
                        }
                    }
                    .star1{
                        display: flex;
                        // background-color: aqua;
                        margin-left: 15px;
                        width: 200px;
                        .a{
                            width: 100px;
                            li{
                                margin-bottom: 7px;
                                margin-left: 10px;
                            }
                        }
                    }
                }
                .spake{
                    position: absolute;
                    bottom: 10px;
                    background-color: rgb(64, 51, 39);
                    border-radius: 5px;
                    width: 330px;
                    height: 25px;
                    line-height: 25px;
                    left: 10px;
                    color: rgb(220, 209, 165);
                    .i{
                        width: 20px;
                        margin-left: 10px;
                    }
                }
             }
             .synopsis{
                
                color: rgb(244, 249, 248);
                .zhan{
                    margin-top: -16px;
                    margin-left: 300px;               
                    color:rgb(160, 149, 140);
                }
                .jian{
                    margin-top: 10px;
                }
                .c{
                    margin-top: 10px;
                    line-height: 18px;
                }
             }
             .actorList{
                margin-top: 20px;
                .people{
                    color: rgb(244, 249, 248);
                }
                .all{
                    margin-top: -16px;
                    margin-left: 300px; 
                    color:rgb(160, 149, 140);
                }
                .acto-box::-webkit-scrollbar{
                    display: none;
                }
                .acto-box{
                    margin-top: 10px;
                    display: flex;
                    overflow: auto;
                    .acto{
                        margin-right: 10px;
                        .img-box{
                            width: 80px;
                            height: 100px;
                            img{
                                width: 80px;
                                height: 100px; 
                            }
                        }
                        .aa,.bb{
                            width: 80px;
                            text-align: center;
                        }
                        .aa{
                            margin-top: 2px;
                            color: rgb(244, 249, 248);
                        }
                        .bb{
                            margin-top: 4px;
                            color: rgb(160, 149, 140);
                        }
                    }
                }
             }
             .video{
                margin-top: 20px;
                .a{
                    color: rgb(244, 249, 248);
                }
                .b{
                    margin-top: -16px;
                    margin-left: 300px; 
                    color:rgb(160, 149, 140);
                }
                .vide::-webkit-scrollbar{
                    display: none;
                }
                .vide{
                    display: flex;
                    width: 350px;
                    height: 120px;
                    overflow: auto;
                    // background-color: aquamarine;
                    
                    .video-box{
                        margin-right: 10px;
                        position: relative;
                        margin-top: 10px;
                        width: 130px;
                        height: 100px;
                        img{
                            border-radius: 10px;
                            width: 130px;
                            height: 100px; 
                        }
                    .nn{
                        position: absolute;
                        background-color: azure;
                        border-radius: 15px;
                        width: 30px;
                        height: 30px;
                        top: 35px;
                        left: 55px;
                        text-align: center;
                        line-height: 35px;
                    }
                }
                }
             }

             .imgs-box{
                margin-top: 20px;
                .ju{
                    color: rgb(244, 249, 248);
                }
                .juAll{
                    text-align: right;
                    margin-top: -16px;
                    margin-left: 280px; 
                    color:rgb(160, 149, 140);
                }
                .imgs::-webkit-scrollbar{
                    display: none;
                }
                .imgs{
                    margin-top: 10px;
                    display: flex;
                    overflow: auto;
                    height: 110px;
                    img{
                        width: 130px;
                        height: 100px;
                        margin-right: 5px;
                    }
                    .big-img{
                        width: 250px;
                        height: 250px;
                    }
                }
             }
        }
        .bottom-box{
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            //  height: 100px;
             background-color: rgb(244, 244, 244);
           .comment-box{
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
             background-color: rgb(255, 255, 255);
            .short-comment{
                margin: auto;
                width: 350px;
                // background-color: aqua;
              .tt{
                height: 40px;
                line-height: 40px;
              }
              .people-text{
                display: flex;
                margin-top: 10px;
                .img-box{
                    width: 30px;
                    height: 30px;
                    img{
                        width: 30px;
                        height: 30px; 
                    }
                }
                .text{
                    position: relative;
                    margin-left: 10px;
                    height: 130px;
                    width: 300px;
                    border-bottom: 1px solid rgb(171, 171, 171);
                    .shop{
                        position: absolute;
                        top: 20px;
                        left: 120px;
                        width: 30px;
                        color: rgb(114, 166, 207);
                        border: 1px solid rgb(114, 166, 207);
                        border-radius: 10px;
                        text-align: center;
                    }
                    .fen{
                        color: rgb(252, 196, 104);
                    }
                    .bot{
                        width: 120px;
                        display: flex;
                        text-align: center;
                        span{
                            margin-right: 10px;
                            height:25px;
                            line-height:25px;
                        }
                        .hui{
                           width: 60px;
                            background-color: rgb(238, 241, 246);
                            border-radius: 10px;
                            color: rgb(129, 155, 191);
                        }
                    }
                    .thumb{
                        width: 50px;
                        height: 20px;
                        line-height: 20px;
                        text-align: center;
                        position: absolute;
                        right: 5px;
                        border: 1px solid rgb(171, 171, 171);
                        border-radius: 10px;
                        color: rgb(171, 171, 171);
                        top: 17px;
                    }
                    li{
                        margin-bottom: 5px;
                    }
                }
              }
             }
            }
            .long-comment{
                margin-top: 20px;
                background-color: rgb(255, 255, 255);
                .long-box{
                    width: 350px;
                    margin: auto;
                    .text-box{
                        margin-top: 20px;
                        display: flex;
                        .img-box{
                            width: 30px;
                            height: 30px;
                            img{
                                width: 30px;
                                height: 30px;
                            }
                        }
                        .text{
                            margin-left: 10px;
                            .fen{
                                color: rgb(252, 196, 104);
                            }
                            li{
                                margin-bottom: 5px;
                            }
                            .biao{
                                font-weight: bold;
                            }
                            .last{
                                width: 300px;
                                display: flex;
                                justify-content: space-between;
                            }
                            .cv{
                                width: 300px;
                            }
                        }
                    }
                }
            }
            .price-box{
                margin-top: 20px;
                background-color: rgb(255, 255, 255);
                .box{
                    width: 350px;
                    height:150px;
                    margin: auto;
                    .gou{
                        height: 30px;
                        line-height: 30px;
                    }
                    .price-text{
                        display: flex;
                        justify-content: space-around;
                        background-color: rgb(248, 248, 248);
                        .box1{
                            margin-top: 15px;
                            height: 80px;
                            div{
                                text-align: center;
                                height: 30px;
                                line-height: 30px;
                            }
                            .a{
                                color: rgb(251, 57, 61);
                            }
                        }
                    }
                    .lookSumBox{
                        margin-top: -120px;
                        margin-left: 260px;
                    }
                }
            }
            .last-box{
                height: 100px;
                text-align: center;
                line-height: 100px;
            }
        }
    }
}
.table-box{
    height: 50px;
    width: 100%;
    background-color: rgb(251, 252, 254);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    position: fixed;
    bottom: 0px;
    display: flex;
    justify-content: space-between;
    .icon{
        height: 40px;
        text-align: center;
        line-height: 40px;
        margin-top: 10px;
        margin-left: 40px;
    }
    .shop-box{
        background-color: rgb(251, 57, 61);
        color: azure;
        width: 250px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        margin-top: 5px;
        border-radius: 20px;
        margin-right: 10px;
    }
}
</style>