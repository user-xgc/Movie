<template>
    <div>
        <van-nav-bar 
           title="登录蓝猫"
           left-text="返回"
           right-text="注册"
           @click-left="onClickLeft"
           @click-right="onClickRight"
         />

         <van-action-sheet v-model="show"  title="注册">
          <van-form @submit="onSubmit1" validate-first @failed="onFailed">
            <van-field
                  v-model="username"
                  name="username"
                  label="用户名"
                  placeholder="请输入用户名"
                  :rules="[{ required: true, message: '请填写用户名' }]"
                />
                <van-field
                  v-model="phone1"
                  name="phone"
                  label="手机号"
                  placeholder="请输入11位手机号"
                  :rules="[{ pattern, message: '请输入正确手机号' }]"
                />
                <van-field
                  v-model="password1"

                  :type="`${isClick?'text':'password' }`"
                  class=''
                  name="password"
                  label="密码"

                  :right-icon="isClick?'eye-o':'closed-eye'"

                  placeholder="请输入6-10位密码"
                  
                  :rules="[{ pattern, message: '请填写正确密码' }]"
                  @click-right-icon="clickRight"
                />
                <div style="margin: 16px;">
                  <van-button round block type="info" native-type="submit">注册</van-button>
                </div>
              </van-form>
          </van-action-sheet>
          
         <div class="logo">
            <ul>
                <li><img :src="img" alt=""></li>
                <li><span class="name">蓝猫电影</span></li>
            </ul>
         </div>

         <div class="phone-box">

              <van-form @submit="onSubmit" validate-first @failed="onFailed">
                <van-field
                  v-model="phone"
                  name="phone"
                  label="手机号"
                  placeholder="请输入11位手机号"
                  :rules="[{ pattern, message: '请输入正确手机号' }]"
                />
                <van-field
                  v-model="password"

                  :type="`${isClick?'text':'password' }`"
                  class=''
                  name="password"
                  label="密码"

                  :right-icon="isClick?'eye-o':'closed-eye'"

                  placeholder="请输入6-10位密码"
                  
                  :rules="[{ pattern, message: '请填写正确密码' }]"
                  @click-right-icon="clickRight"
                />
                <div style="margin: 16px;">
                  <van-button round block type="info" native-type="submit">登录</van-button>
                </div>
              </van-form>
         </div>

         <div class="tip">
          <span>*注意：</span>
          <ul>
            <li>1.手机号是以1开头的11位数字</li>
            <li>2.密码以字母开头(不区分大小写),6-10位数字、字母、下划线组合</li>
          </ul>
         </div>
    </div>
</template>

<script>
     import { Toast } from 'vant';
    export default {
        name:"Login",
        data(){
            return{
              show:false,
              img:require('../assets/蓝白猫.png'),
              username:'',
              phone: '',
              password: '',
              phone1: '',
              password1: '',
              //正则
              // pattern:/^1[3|4|5|7|8][0-9]{9}$/,
              pattern:/^1[0-9]{10}$|^[a-zA-Z]\w{5,9}$/,
              // pattern:/^[a-zA-Z]\w{5,9}$/,
              isClick:false,
              //是否成功登陆
              isTrue:false,
            }
        },
        methods:{
            onClickLeft() {
              this.$router.go(-1)
            },
            onClickRight(){
              this.show = true
            },
            //登录，通过验证
            onSubmit(values) {
              // console.log('submit', values);

              let data = JSON.parse(localStorage.getItem('user'));

              if(data == null){
                Toast('请先注册')
                this.password = '';
                this.phone = '';
              }
  
              let user = data.filter(item=>item.phone == values.phone);


              if(!user){
                Toast('手机号未注册，请先注册')
              }else{
                if(values.password == user[0].password){

                 let name = JSON.parse(localStorage.getItem('user')).filter(item=>item.phone == values.phone)
 
                 let token = Math.random().toString(36).slice(-8);

                let obj = {
                  username:name[0].username,
                  phone:name[0].phone,
                  password:name[0].password,
                  token:token
                }
                //登录保存
                 sessionStorage.setItem('Token', JSON.stringify(obj));

                 Toast.loading('正在登录')

                 setTimeout(() => {

                  Toast('登陆成功');

                  this.$router.go(-1)

                  this.password = '';

                 this.phone = '';
                 }, 1000);
                }else{
                  Toast('密码错误')
                }
              }
              
            },
            //登录未通过
            onFailed(errorInfo) {
              console.log('failed', errorInfo);
            },
            //注册
            onSubmit1(values) {
              Toast('正在注册')

              let data = JSON.parse(localStorage.getItem('user'))

              //构造用户信息对象
              let value = {
                ...values,
                want:[],
                looked:[],
                order:[],
                searchHistory:[],
                cityHistory:[],
              }

              setTimeout(() => {

                if(data == null){

                localStorage.setItem('user',JSON.stringify([value]));

                this.show = false;
                
                Toast('注册成功');
              }

              if(data){
                console.log(data);

                

                let phone = data.filter(item=>item.phone == values.phone)

                if(phone.length == 0){

                  let value1 = {
                ...values,
                want:[],
                looked:[],
                order:[],
                searchHistory:[],
                cityHistory:[],
              }
                  let data1 = [...data,value1];
            
                  localStorage.setItem('user',JSON.stringify(data1));

                  this.show = false;

                  Toast('注册成功');

                }else if(phone.length == 1){

                  this.show = false;

                  Toast('手机号已经注册，请登录')
                }
                
              }
              }, 1000);

              this.password1 = '';

              this.phone1 = '';

              this.username = '';


            },
            //点击眼镜
            clickRight(){
              console.log('12');
                this.isClick=!this.isClick
            }
        }
    }
</script>

<style lang="scss" scoped>
.logo{
    margin-top: 80px;
    text-align: center;
    .name{
        color: rgb(18, 150, 219);
        font-size: 20px;
    }
}
.phone-box{
  margin-top: 20px;
}
.tip{
    li{
      margin-top: 10px;
      margin-left: 20px;
      font-weight: bold;
    }
    span{
      color: red;
    }
  }
  .content {
    padding: 16px 16px 160px;
  }
</style>