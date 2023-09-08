<template>
    <div>
        <div class="big-box">
            <div class="table-box">
                <img :src="img1" alt="">
                <div v-show="!isLogin" @click="clickName" class="name">登录</div>
                <div v-show="isLogin" class="name">昵称：{{ name }}</div>
            </div>
            <div class="look-box">
                <div @click="clickWant(0)" class="box1">
                    <div v-show="!isLogin" class="name1">一  想看</div>
                    <div v-show="isLogin" class="name1">{{want.length}}  想看</div>
                   <div class="icon-da"><van-icon name="arrow" /></div>
                </div>
                <div @click="clickLooked(1)" class="box1">
                    <div v-show="!isLogin"  class="name2">一 看过</div>
                    <div v-show="isLogin"  class="name2">{{looked.length}} 看过</div>
                    <div class="icon-da1"><van-icon name="arrow" /></div>
                </div>
            </div>
            <div class="orders-box">
                <span class="myOrder">我的订单</span>
                <ul @click="clickOrder">
                    <li><img :src="img2" alt=""></li>
                    <li><span>电影票</span></li>
                </ul>
            </div>
            <div @click="clickQuit" class="quit">退出登录</div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    export default {
        name:'My',
        data(){
            return{
                img1:require('../assets/蓝白猫64.png'),

                img2:require('../assets/电影.png'),

                isLogin:false,

                msg1:'想看',

                msg2:'看过',

                //用户明
                name:'',

                //用户想看，看过，订单等信息
                //想看
                want:[],

                //看过
                looked:[],

                //订单
                order:[]
            }
        },
 
        created(){

            //查看回话存储找到token数据
            let text = JSON.parse(sessionStorage.getItem('Token'));

            if(text){
               this.isLogin = true;

               this.name = text.username;

               //根据登录手机号查看用户信息
               let dat = JSON.parse(localStorage.getItem('user')).filter(item=>item.phone == text.phone);

               this.want = [...dat[0].want];

               this.looked = [...dat[0].looked];

               this.order = [...dat[0].order];
            }

            

        },
        methods:{
            //点击想看
            clickWant(num){
                if(this.isLogin){
                    this.$router.push({name:'Looked',query:{num}}) ;
                }else{
                    Toast.loading('请先登录');
                    setTimeout(() => {
                        this.$router.push({name:'Login'});
                    }, 1000);
                }
                
            },
            //点击看过
            clickLooked(num){
                console.log(this.isLogin);
                if(this.isLogin){
                    this.$router.push({name:'Looked',query:{num}});
                }else{
                    Toast.loading('请先登录');
                    this.$router.push({name:'Login'});
                }
                
            },
            //点击电影票
            clickOrder(){
                if(this.isLogin){
                    this.$router.push({name:'OrderList'}) ;
                }else{
                    Toast.loading('请先登录');
                    setTimeout(() => {
                        this.$router.push({name:'Login'});
                    }, 1000);
                }
            },
            //点击登录
            clickName(){
                this.$router.push({name:'Login'})
            },
            //退出登录
            clickQuit(){
                if(this.isLogin){

                    //清除vuex中的数据
                    this.$store.commit('changePhone', '');
                    this.$store.commit('changeMsg', '');
                    this.$store.commit('changeLogin', false);

                    Toast.loading('正在退出')
                setTimeout(() => {
                    sessionStorage.clear();
                    this.isLogin = false;
                    Toast('退出成功')
                }, 1000);
                }else{
                    Toast('请先登录')
                }   
                
            }
        }
    }
</script>

<style lang="scss" scoped>
.big-box{
    height: 600px;
    background-image: linear-gradient(to bottom, rgb(252, 217, 216) 0px, rgb(250, 232, 235) 100px, rgb(245, 245, 245) 600px);
    .table-box{
        position: absolute;
        height: 100px;
        display: flex;
        top: 100px;
        left: 10px;
        .name{
            line-height: 100px;
            font-size: 15px;
            margin-left: 10px;
        }
    }
    .look-box{
        position: absolute;
        background-color: rgb(251, 248, 249);
        height: 50px;
        top: 220px;
        width: 330px;
        left: 20px;
        border-radius: 5px;
        display: flex;
        line-height: 50px;
        font-weight: bold;
        font-size: 13px;
        .box1{
            display: flex;
            justify-content: space-between;
            width: 155px;
            margin-left: 7px;
        }
    }
    .orders-box{
        position: absolute;
        height: 100px;
        background-color: rgb(245, 245, 245);
        top: 290px;
        width: 330px;
        left: 20px;
        border-radius: 10px;
        .myOrder{
            font-weight: bold;
            font-size: 13px;
        }
        li{
            margin-left: 20px;
            margin-top: 10px;
        }
    }
    .quit{
        position: absolute;
        right: 10px;
        top: 20px;
    }
}
</style>