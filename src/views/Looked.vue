<template>
    <div>
        <van-nav-bar
           left-text="返回"
           right-text="编辑"
           left-arrow
           @click-left="onClickLeft"
           @click-right="onClickRight"
         />
         <van-tabs @click="clickTab" v-model="active" type="card" color="rgb(25, 137, 250)" background="rgb(248, 248, 248)">
          <van-tab title="想看">
            <van-empty v-show="!isShow" description="暂无想看" />
            <div class="item">
              <div @click="movieDetail(item.movieId)" class="item1" v-for="(item,index) in wantMovies" :key="index">
                  <div class="item2"><img class="auto" :src="item.movieIcon" alt=""></div>
                  <div class="item3">
                            <div class="item4">
                                <ul>
                                    <li>
                                      <div class="max">
                                        <span class="item6">{{ item.name }}</span>
                                        <!-- <div class="min" v-if="item.version">
                                            <div class="d2">2D</div>
                                             <div class="imax">IMAX</div>
                                        </div> -->
                                        
                                      </div>
                                   </li>
                                    <li>
                                    <span>猫眼评分 </span>
                                    <!-- <span v-else="item.sc">暂无评分</span> -->
                                    <span  class="it"> 9.4</span>
                                  </li>
                                    <li class="van-ellipsis">主演：{{ item.star }}</li>
                                    <li class="van-ellipsis">{{ item.date }}</li>
                                </ul>
                            </div>
                            <div @click.stop="introClick(index)" class="item5">购票</div>
                  </div>
                  <div @click.stop="clickXWant(index)" v-show="isDeleteWant" class="last-x"><van-icon name="cross" size="20" /></div>
              </div>
            </div>
          </van-tab>
          <van-tab title="看过">
            <van-empty v-show="!isShowLooked" description="暂无看过" />

            <div class="item">
                <div @click="clickLo(item.movieId)"  class="item1" v-for="(item,index) in lookedMovies" :key="index">
                  <div class="item2"><img class="auto" :src="item.movieIcon" alt=""></div>
                  <div class="item3">
                            <div class="item4">
                                <ul>
                                    <li>
                                      <div class="max">
                                        <span class="item6">{{ item.name }}</span>
                                      </div>
                                   </li>
                                    <li>
                                    <span>我的评分 {{ value }}星</span>
                                    <van-rate
                                        v-model="value"
                                        :size="20"
                                        color="#ffd21e"
                                        void-icon="star"
                                        void-color="#eee"
                                      />
                                  </li>
                                </ul>
                            </div>
                  </div>
                  <div @click.stop="clickXLooked(index)" v-show="isDeleteLooked" class="last-x"><van-icon name="cross" size="20" /></div>
                </div>
            </div>
          </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { Toast } from 'vant';
    export default {
        name:'Looked',
        data(){
            return{
                active: '',
                phone:'',
                wantMovies:'',
                lookedMovies:'',
                isShow:false,
                isShowLooked:false,
                value:4,
                isDeleteWant:false,
                isDeleteLooked:false,
                text1:'',
            }
        },
       
        created(){
            this.active = this.$route.query.num;
            
            this.phone = JSON.parse(sessionStorage.getItem('Token')).phone;

            this.text1 = JSON.parse(localStorage.getItem('user'));

            let text = JSON.parse(localStorage.getItem('user')).filter(item=>item.phone == this.phone)
            if(text[0].want.length!=0){

              this.isShow = true;

               this.wantMovies = text[0].want;

            }else if(text[0].want.length==0){
              
              this.isShow = false;
            }
            if(text[0].looked.length!=0){

              this.isShowLooked = true;

              this.lookedMovies = text[0].looked;

            }else if(text[0].looked.length==0){

              this.isShowLooked = false;
            }

           
        },
        methods: {
          movieDetail(id){
            Toast.loading('正在加载')
            this.$router.push({name:'Detail',params:{id}})
          },
          clickLo(id){
            Toast.loading('正在加载')
            this.$router.push({name:'Detail',params:{id}})
          },
          onClickLeft() {

          this.$router.go(-1)

        },
           onClickRight() {

            this.isDeleteWant = !this.isDeleteWant

            this.isDeleteLooked = !this.isDeleteLooked
           },
           //删除想看
           clickXWant(index){
            // console.log(val);
            this.text1.filter(item=>item.phone == this.phone)[0].want.splice(index,1)
            // console.log(this.text1);
            this.wantMovies.splice(index,1)
            // console.log('想看',index);
            localStorage.setItem('user',JSON.stringify(this.text1))
           },
           //删除看过
           clickXLooked(index){
            this.text1.filter(item=>item.phone == this.phone)[0].looked.splice(index,1);
            this.lookedMovies.splice(index,1);
            localStorage.setItem('user',JSON.stringify(this.text1));
            
           },
           clickTab(title){
            console.log(title);
            this.isDeleteLooked = false;
            this.isDeleteWant  = false;
           },
           //购票
           introClick(index){
            let id =this.wantMovies[index].movieId;
            this.$router.push({name:'MovieCinema',query:{id}})
            // console.log();
           }
         },
    }
</script>

<style lang="scss" scoped>
 .item{
  position: relative;
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
                  background-color: red;
                    height: 25px;
                    width: 50px;
                    text-align: center;
                    line-height: 25px;
                    color: white;
                    border-radius: 10px;
                    margin: auto;
                }
            }
            .last-x{
              position: absolute;
              right: 10px;
            }
        }
    }
</style>