<template>
    <div>
        <div class="item">
                    <div class="item1">
                        <div class="item2"><img class="auto" src="" alt=""></div>
                        <div class="item3">
                            <div class="item4">
                                <ul>
                                    <li>
                                    <div class="max">
                                        <span class="item6">名字</span>
                                        <div class="min">
                                            <div class="d2">2D</div>
                                            <div class="imax">IMAX</div>
                                        </div>
                                        
                                    </div></li>
                                    <li>
                                    <span>观众评  </span>
                                    <span>暂无评分</span>
                                    <span class="it">9</span></li>
                                    <li>主演：</li>
                                    <li>题111111111</li>
                                </ul>
                            </div>
                            <div class="item5">购票</div>
                        </div>
                    </div>
            </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.item{
        margin-top: 10px;
        background-color: rgb(255, 255, 255);
        .item1{
            display: flex;
            .item2{
                margin-left: 10px;
                width: 80px;
                height: 100px;
                display: flex;
                .auto{
                  width: 80px;
                  height: 100px;
             }
            }
            .item3{
                display: flex;
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
        }
    }
</style>