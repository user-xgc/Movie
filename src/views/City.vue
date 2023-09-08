<template>

    <div class="box">
        <!-- <div ref="textbox"> -->
            <div  v-for="(item,index) in text" :key="index">
            <div :ref="index" class="box1">{{ item.title }}</div>         
                <div class="box2">
                    <div @click="clickCity" class="box3" v-for="(item1,index1) in item.city" :key="index1">{{ item1 }}</div>
                </div>
        </div>
        
        <div class="text" v-for="(item3,index3) in date" :key="index3">
            <div :ref='item3.title' class="box-1">{{item3.title}}</div>
            <div class="box-2" v-for="(item2,index2) in item3.city" :key="index2">
                <div @click="clickCity" class="box-3"> {{item2.nm}}</div>
            </div>
        </div>
        <!-- </div> -->
        
        <div class="table">
            <div @click="clickRight(index4)" v-for="(item4,index4) in data" :key="index4">{{item4}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'City',
        data(){
            return{
                text:[
                    {
                      title:'定位城市',
                      //定位城市
                      city:['广州'],
                    },
                    {
                      title:'最近访问城市',
                      //最近城市
                      city:[]
                    },
                    {
                      title:'热门城市',
                      //热门城市
                      city:'',
                    },
                ], 
                //26字母
                worlds:'',
                //字母开头分类城市
                date:[],
                //右侧当导航
                data:'',
                //所有城市
                cities:''
            }
        },
        created(){
            //获取本地存储最近访问城市
            // let dataId = JSON.parse(localStorage.getItem('city'));
            let data = JSON.parse(localStorage.getItem('city'));

            // this.text1[1].city
            
            let city = [];
            if(!data){
                localStorage.setItem('city',JSON.stringify(city));
            }
            this.text[1].city=[...data]
            //生成26大写英文
            let world = [...Array(26).keys()].map(i => String.fromCharCode(i + 65))
            
            this.worlds=world
            
            this.data=['定位','最近','热门',...world];

            //获取城市
            this.axios({

          method: 'get',

          url: 'https://apic.netstart.cn/maoyan/cities.json'

        }).then(res => {

            //热门城市
          this.text[2].city = res.data.hot

          //所有城市数据
        let cityName = res.data.cts

        this.cities = cityName

        for(let i = 0;i<world.length;i++){

            let a=world[i].toLowerCase()

            let rgb = eval(`/^${a}/`)

            this.findCity(rgb,cityName,world[i])
        }
       
        }).catch(err => {

          console.log('城市详情 err ==> ', err);

        })

        },
        methods:{
            //寻找以a-z开头的城市
            findCity(rgb,cityName,name){

                let arr1 = []
                cityName.forEach(item=>{
                  arr1.push(item.py)
                })
                let arrA = arr1.filter(item=>eval(rgb).test(item))
                  // console.log(arrA);
                let newCityA = []
                //以rgb正则匹配的城市
                for(let i = 0;i<arrA.length;i++){
                  newCityA= [...newCityA,...(cityName.filter(item=>item.py==arrA[i]))]
                }
                let st = {
                  title:name,
                  city:newCityA
                }
                this.date.push(st)
            },
            //右侧导航栏点击
            clickRight(index){
                
                 let top 
                 if(index<3){
                    top = this.$refs[index][0].offsetTop
                }else{
                    let n = this.data[index];
                    top = this.$refs[n][0].offsetTop
                }
               window.scroll({

                 top: top,
                 
                 behavior: "smooth"
                 
                 });
                
               
                
            },

            clickCity(e){
                let name = e.target.textContent

                let id = this.cities.filter(item=>item.nm==name)[0].id;

                // let cityId = [id]

                // console.log(cityId);
                localStorage.setItem('cityId',JSON.stringify(id))

                let city = this.text[1].city

                city.unshift(name)

                //存储3个数据
                if(city.length>3){

                    city.splice(3,1)

                }
                //将城市名字返回给电影页面
                this.$router.push({name:'Movie',params:{name,id}});
                //本地存储最近访问城市
                let data = JSON.parse(localStorage.getItem('city'));

                let a = {
                    name:name,
                    id:id
                }

                let b =JSON.parse(localStorage.getItem('cityId'))

                console.log(b);
                // localStorage.setItem('cityId',JSON.stringify(a))

                // console.log(data);
                data = [...city];
                
                localStorage.setItem('city',JSON.stringify(data))
            }
        }
    }
</script>

<style lang="scss" scoped>
body{
    background-color: rgb(235, 235, 235);
}
.box{
    background-color: rgb(235, 235, 235);
    .box1{
        height: 30px;
        line-height: 30px;
        margin-left: 10px;
    }

        .box2{
        background-color: rgb(255, 255, 255);
        display: flex;
        // justify-content: space-evenly;
        flex-flow: wrap;
        .box3{
            height: 30px;
            width: 100px;
            border: 1px solid rgb(236, 236, 236);
            text-align: center;
            line-height: 30px;
            margin-top: 10px;
            margin-bottom: 5px;
            margin-left: 10px;
         
        }
    }
    .text{
        .box-1{
            height: 30px;
            line-height: 30px;
            margin-left: 10px;
        }
        .box-2{
            background-color: rgb(245, 245, 245);
            .box-3{
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid rgb(218, 217, 220);
            margin-left: 10px;
            margin-right: 40px;
            }
        }
    }

    .table{
        position: fixed;
        right: 0px;
        top: 70px;
        div{
            width: 50px;
            text-align: center;
            margin-bottom: 5px;
        }
    }
}
</style>