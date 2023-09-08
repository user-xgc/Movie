<template>
    <div>
        <van-nav-bar
          title="订单"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
        />

        <van-empty v-show="show" description="暂无订单" />

        <van-swipe-cell v-for="(item) in a" :key="item.id">
          <van-card
            :num="item.seat.length"
            :price="item.onePrice"
            :desc="item.cinemaName"
            :title="item.movieName"
            class="goods-card"
            :thumb="item.img"
          >
          <template #tags>
            <van-tag v-for="(item1,index) in item.seat" :key="index" plain type="danger">{{ item1 }}</van-tag>
          </template>
        </van-card>
          
          <template #right>
            <van-button @click="clickDelate(item.id)" square text="删除" type="danger" class="delete-button" />
          </template>
        </van-swipe-cell>
    </div>
</template>

<script>
    export default {
        name:'OrderList',
        data(){
            return{
                text:'',
                a:'',
                show:false,
                phone:'',
            }
        },
        created(){
            this.phone = JSON.parse(sessionStorage.getItem('Token')).phone;

            this.text = JSON.parse(localStorage.getItem('user'));

            this.a =this.text.filter(item=>item.phone == this.phone)[0].order

            if(this.a.length == 0){
                this.show = true
            }
            console.log(this.a);
        },
        methods: {
        onClickLeft() {
          this.$router.go(-1)
        },
        clickDelate(id){
            // console.log(id);
            // console.log(this.a.filter(item=>item.id != id));
            this.a = this.a.filter(item=>item.id != id);
            if(this.a.length ==0){
                this.show = true
            }

            this.text.filter(item=>item.phone == this.phone)[0].order = this.text.filter(item=>item.phone == this.phone)[0].order.filter(item=>item.id != id);
            // b = b;
            console.log(this.text);

            localStorage.setItem('user',JSON.stringify(this.text))
        },
  },
    }
</script>

<style lang="scss" scoped>
 .goods-card {
    margin: 0;
    background-color: white;
  }

  .delete-button {
    height: 100%;
  }
  van-tag{
    margin-right: 5px;
  }
</style>