<template>
    <div>
        <div>
            <router-view></router-view>
        </div>
        <van-tabbar v-model="active" active-color="rgb(224, 77, 58)" route>
          <van-tabbar-item :to="{name:item.name}" v-for="(item,index) in text" :key="index">
            <span>{{item.title}}</span>
            <template #icon="props">
              <img :src="props.active ? item.activeIcon:item.inactiveIcon" />
            </template>
          </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        name:'Main',
        data(){
            return{
                active:0,
                text:[
                    {
                        title:'电影/影院',
                        inactiveIcon:require('../assets/电影.png'),
                        activeIcon:require('../assets/电影-active.png'),
                        name:'Movie' 
                    },
                    {
                        title:'视频',
                        inactiveIcon:require('../assets/视频.png'),
                        activeIcon:require('../assets/视频-active.png'),
                        name:'Video'
                    },
                    {
                        title:'小视频',
                        inactiveIcon:require('../assets/小视频.png'),
                        activeIcon:require('../assets/小视频-active.png'),
                        name:'SmallVideo'
                    },
                    // {
                    //     title:'演出',
                    //     inactiveIcon:require('../assets/演出.png'),
                    //     activeIcon:require('../assets/演出-active.png'),
                    //     name:'Perform'
                    // },
                    {
                        title:'我的',
                        inactiveIcon:require('../assets/我的.png'),
                        activeIcon:require('../assets/我的-active.png'),
                        name:'My'
                    }
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>