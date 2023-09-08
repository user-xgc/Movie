<template>
    <div>
        <div class="box4"> 
            <div class="text">观众评分 </div>
            <div class="img"><img class="auto" src="" alt=""></div>
            <div class="span"><span >{{name}}</span></div>
            <!-- <div class="span1"><span>9.9</span></div> -->
        </div>
    </div>
</template>

<script>
    export default {
        prop:{
            name:{
                type:String,
                default:'',
            },
            people:{
                type:String,
                default:'',
            },
            text:{
                type:String,
                default:'',
            },
            score:{
                type:String,
                default:'',
            },
            //观众平
            text1:{
                type:String,
                default:'',
            },
        },
    }
</script>

<style lang="scss" scoped>
.text1::-webkit-scrollbar{
    display: none;
}

        .box3::-webkit-scrollbar{
    display: none;
}
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
                    }
                    .span1{
                        margin-top: 4px;
                    }
                }

    
    
</style>