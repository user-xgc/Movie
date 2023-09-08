<template>
    <div class="box">
        <van-nav-bar
          :title="cinemaName"
          left-text="返回"
          right-text="首页"
          left-arrow
          @click-left="onClickLeft()"
          @click-right="onClickRight"
        />

        <div class="text-box">
            <div class="th-box"><span >{{ th }}</span></div>
            <div class="seat-box">
                <div class="seat" @click="clickBox(index)" :class="{'active1': isActive(index),'active':isActive1(index) }" v-for="index in 100">
                    <!-- <van-icon name="success" size="15" /> -->
                </div>
                <div class="xuXian"></div>
            </div>
            <div class="tab-box">
                <div>
                    <div class="a"></div>
                    <span>可选</span>
                </div>
                <div>
                    <div class="b"></div>
                    <span>已售</span>
                </div>
                <div>
                    <div class="c"></div>
                    <span>最佳观影区</span>
                </div>
            </div>
             <div class="box-text">
            <ul>
                <li><span class="name">{{ movieName }}</span></li>
                <li>
                    <div class="time">
                        <span class="day">今天</span>
                        <span>{{ time }}</span>
                        <span>{{movies.tm}}-{{ movies.outTimes }}</span>
                        <span>{{ movies.lang}}{{ movies.tp }}</span>
                    </div>
                </li>
                <li>
                    <div class="price-box">
                        <div class="p-box" v-for="(item,index) in arr1" :key="index">
                            <div class="box-p">
                              <div>{{ item }}</div>
                              <div>{{ movies.vipPrice}}元</div>
                            </div>
                            <div class="box-x" @click="clickDelete(index)"><van-icon size="20" name="cross" /></div>
                        </div> 
                    </div>
                </li>
            </ul>
        </div>
        <div v-if="!isShow" class="box-btn">请选择座位</div>
        <div @click="clickOk" v-else="isShow" class="box-btn">{{ price1}}元确认选座</div>
        <div>
        </div>
        <div >
           <van-dialog @confirm="clickZui" v-model="show" title="确认订单" show-cancel-button>
            <div class="box-card">
                <van-card
                   num="1"
                   :price="movies.vipPrice"
                   :desc="cinemaName"
                   :title="movieName"
                   :thumb="img"
                   v-for="(item,index) in arr1"
                   :key="index"
                   
                 >
                  <template #tags>
                    <van-tag plain type="danger">{{ item }}</van-tag>
                  </template>
               </van-card>
                <div class="span"><span>总价￥{{ price1 }}元</span></div>
            </div>
             
          </van-dialog> 
        </div>
        
        <van-dialog  @confirm="click12" v-model="show1" title="支付" show-cancel-button>
         <!-- 密码输入框 -->
         <div class="pas-box">
            <van-password-input
           :value="value"
           :focused="showKeyboard"
           @focus="showKeyboard = true"
         />
         </div>
         <!-- 数字键盘 -->
         <van-number-keyboard
           v-model="value"
           :show="showKeyboard"
           @blur="showKeyboard = false"
         />
         </van-dialog>
        
        </div>
       
    </div>
</template>

<script>
import { Dialog } from 'vant';
import { Toast } from 'vant';
    export default {
        components: {
    [Dialog.Component.name]: Dialog.Component,
  },
        name:'Intro',
        data(){
            return{
                show1:false,

                show:false,

                cinemaName:'',
                movies:'',
                //影厅类型
                th:'',
                time:'',

                //随机高亮10个座位
                activeSeats:[],
                //选择座位
                arr:[],
                //座位几排几座
                //点击后高亮
                arr1:[],

                movieName:'',
                //展示购票
                isShow:false,
                //总价
                price1:'',
                img:'',

                text:'',
                phone:'',
                value: '',
                showKeyboard: false,
            }
            
        },
        created(){

            this.phone = JSON.parse(sessionStorage.getItem('Token')).phone;

            this.text = JSON.parse(localStorage.getItem('user'));

            // console.log(text);
            this.activeSeats = this.getRandomIndexes();
            // this.movieId = this.$route.query.id vipPrice

            this.cinemaName = this.$route.query.name;

            this.movies = this.$route.query.movie;

            this.movieName = this.$route.query.movieName;

            this.img = this.$route.query.img;

            // console.log(this.img);
            this.th = this.movies.th;

            // console.log(this.movies);
            let a =this.movies.dt.split('-');
            this.time = `${a[0]}年${a[1]}月${a[2]}日`;

            // this.price = this.movies.vipPrice*this.arr.length


        },
        methods: {
            click12(){
                Toast.loading('正在支付');
                 // console.log(111);
                 this.activeSeats = [...this.activeSeats,...this.arr]
                let a =this.text.filter(item=>item.phone == this.phone)[0];
                let id = new Date().getTime()
                console.log(id);
                let oderObj = {
                    movieName:this.movieName,
                    cinemaName:this.cinemaName,
                    //座位
                    seat:[...this.arr1],
                    onePrice:this.movies.vipPrice,
                    price:this.price1,
                    //影厅
                    th:this.th,
                    img:this.img,
                    id:id

                }
                // console.log(oderObj);
                a.order = [...a.order,oderObj];

                localStorage.setItem('user',JSON.stringify(this.text));

                this.arr = [];
                this.arr1 = [];
                this.price1 = 0;
                this.isShow = false

                // console.log(this.text);
                setTimeout(() => {
                    Toast('支付成功')
                }, 1100);
            },

            onClickLeft() {
                this.$router.go(-1)
            },
            onClickRight() {
                this.$router.push({name:'Movie'})
            },

             getRandomIndexes() {
               const indexes = [];
               while (indexes.length < 10) {
                 const randomIndex = Math.floor(Math.random() * 100) + 1;
                 if (!indexes.includes(randomIndex)) {
                   indexes.push(randomIndex);
                 }
               }
               return indexes;
              },
              //点击选票
            clickBox(index) {

                this.isShow = true

                let pai = Math.floor(index/10);

                let text = `${pai+1}排${index%10}座`;

                if(this.activeSeats.indexOf(index)==-1){
                    if (this.isActive1(index)) {

                  //将点击的添加到我的选票中的这个座位取消
                  this.arr = this.arr.filter(item=>item !=index);

                  this.arr1 = this.arr1.filter((item,)=>item!=text);
                  if(this.arr1.length==0){
                    this.isShow = false
                  }
                //   console.log(this.arr1);
                  
                //   console.log('点击相同的后=》',this.arr);
                } else {
                  //将点击的添加到我的选票中
                  this.arr.push(index);

                  this.arr1.push(text);
                //   console.log('添加购票=》',this.arr);
                }

                console.log(this.movies.vipPrice*this.arr.length);
                }else{
                    Toast('该座位已经售出')
                }

                this.price()

              },
            isActive(index) {
                // 检查当前盒子的索引是否在activeSeats数组中
                return this.activeSeats.includes(index);
              },
            isActive1(index) {
                // 检查当前盒子的索引是否在activeSeats数组中
                return this.arr.includes(index);
              },
              //删除已选
              clickDelete(index){

                this.arr1.splice(index,1);
                this.arr.splice(index,1);
                this.price();
                if(this.arr1.length==0){
                    this.isShow = false
                  }
              },
              //计算价格
              price(){
                this.price1 = (this.movies.vipPrice*this.arr.length).toFixed(1);

                // console.log(this.price1);
              },
              //确认购票
              clickOk(){
                // if(this.price1==0){
                //     Toast('请先选择座位')
                //     return
                // }
                // console.log('12');
                this.show = true
              },
              //弹出框最终确认
              clickZui(){
                this.show1 = true
                // // console.log(111);
                // this.activeSeats = [...this.activeSeats,...this.arr]
                // let a =this.text.filter(item=>item.phone == this.phone)[0];
                // let id = new Date().getTime()
                // console.log(id);
                // let oderObj = {
                //     movieName:this.movieName,
                //     cinemaName:this.cinemaName,
                //     //座位
                //     seat:[...this.arr1],
                //     onePrice:this.movies.vipPrice,
                //     price:this.price1,
                //     //影厅
                //     th:this.th,
                //     img:this.img,
                //     id:id

                // }
                // // console.log(oderObj);
                // a.order = [...a.order,oderObj];

                // localStorage.setItem('user',JSON.stringify(this.text));

                // this.arr = [];
                // this.arr1 = [];
                // this.price1 = 0;
                // this.isShow = false

                // // console.log(this.text);
              }
              
        },
    }
</script>

<style lang="scss" scoped>
.text-box{
.th-box{
    width: 200px;
    margin: auto;
    text-align: center;
    font-size: 13px;
    color: rgb(159, 159, 161);
}
.seat-box{
    display: flex;
    flex-flow: wrap;
    width: 314px;
    // height: 100px;
    margin:20px auto;
    // background-color: aqua;
    // background-color: bisque;
    .seat{
        width:20px;
        height: 20px;
        border: 1px solid rgb(126, 220, 218);
        margin-right: 10px;
        margin-bottom: 10px;
        // background-color: aqua;
        position: relative;
    }
    .xuXian{
        position: absolute;
        height: 185px;
        width: 185px;
        border: 2px dashed rgb(210, 120, 141);
        // background-color: rgb(47, 50, 50);
        opacity: .5;
        left: 88px;
        top: 140px;
        pointer-events: none; /* 关键：设置为none，禁止虚线盒子接受鼠标事件 */
    }
    .active{
        background-color: rgb(126, 220, 218);
    }
    .active1{
        background-color: rgb(55, 48, 187);
    }
}
.tab-box{
    display: flex;
    justify-content: space-around;
    .a{
        width:20px;
        height: 20px;
        border: 1px solid rgb(126, 220, 218);
    }
    .b{
        width:20px;
        height: 20px;
        background-color: rgb(55, 48, 187); 
    }
    .c{
        height: 20px;
        width: 20px;
        border: 1px dashed rgb(210, 120, 141);
    }
    div{
        display: flex;
    }
    span{
        margin-left: 5px;
        margin-top: 2px;
    }
}
.box-text{
    width: 320px;
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(189, 189, 191);
        border-radius: 5px;
    margin: auto;
    margin-top: 20px;
    .name{
        margin-left: 10px;
        font-weight: bold;
        font-size: 15px;
    }
    .time{
        margin-left: 10px;
        span{
            margin-right: 5px;
            color: rgb(165, 165, 165);
        }
        .day{
            color: rgb(238, 168, 168);
            font-weight: bold;
        }
    }
    li{
        margin-top: 5px;
    }
    .price-box::-webkit-scrollbar{
    display: none;
}
    .price-box{
        display: flex;
        width: 320px;
        height: 50px;
        background-color: rgb(246, 253, 253);
        overflow: auto;
        .p-box{
            display: flex;
            background-color: rgb(207, 207, 215);
            padding: 1px;
            height: 35px;
            width: 70px;
            justify-content: space-between;
            border-radius: 5px;
            margin-left: 10px;
            margin-bottom: 5px;
            flex-shrink: 0;
            .box-x{
                height: 10px;
                margin-top: 5px;
                margin-left: 3px;
            }
        }
    }
}
.box-btn{
    width: 320px;
    margin: auto;
    margin:10px auto;
    text-align: center;
    height: 40px;
    line-height: 40px;
    background-color: rgb(255, 139, 2);
    color: aliceblue;
    font-size: 15px;
    border-radius: 20px;
}
.box-card{
    height: 400px;
    overflow: auto;
    .span{
        margin-left: 200px;
        margin-top: 10px;
        color: rgb(238, 84, 156);
        // margin-left: 260px;
    }
}
.pas-box{
    height: 300px;
    background-color: rgb(247, 248, 250);
}
}
</style>