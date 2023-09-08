//封装请求方法

import { Toast } from 'vant';

import axios from 'axios'; 

//配置基础请求路径
axios.defaults.baseURL = 'https://apic.netstart.cn/maoyan/';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    Toast({
      type: 'loading',
      message: '加载中...',
      duration: 0,
      forbidClick: true
    });
    return config;
}, function (error) {
    // 对请求错误做些什么
    Toast.clear();
    return Promise.reject(error);
  });

  // 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
  
    Toast.clear();
  
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    Toast.clear();
    
    return Promise.reject(error);
  });

  //获取最受好评电影
export const getGoodMovie = function () {
    return axios({
      method: 'get',
      url: 'index/topRatedMovies'
    })
  }
  
    //获取最受好评电影
export const getMovie = function () {
    return axios({
      method: 'get',
      url: 'index/movieOnInfoList'
    })
  }

      //获取最受期待电影
export const getMovie1 = function (id) {
  return axios({
    method: 'get',
    url: 'index/mostExpected',
    query:{
      ci:id,
      limit:10,
      offset:0,
    }
  })
}
      //待应电影
export const getMovie2 = function (id) {
  return axios({
    method: 'get',
    url: 'index/comingList',
    query:{
      ci:id,
      limit:20
    }
  })
}
      //小视频
export const videoShort = function (id) {
  return axios({
    method: 'get',
    url: 'video/short/10',
   
  })
}
      //视频电影
export const feedChannel = function (feedChannelId) {
  return axios({
    method: 'get',
    url: `video/${feedChannelId}`,
  })
}
      //获取经典电影
export const moreClassicList = function () {
  return axios({
    method: 'get',
    url: 'index/moreClassicList',
    query:{
      sortId:2,
      showType:3,
      limit:10,
      offset:0
    }
    
  })
}
      //获取电影详情页面
export const movieDetail = function (id) {
  return axios({
    method: 'get',
    url: 'movie/detail',
    params:{
      movieId:id
    }
  })
}

 //搜索电影（首页）
 export const searchMovie = function (key,id) {
   return axios({
     method: 'get',
     url: 'search/movies',
     params:{
       keyword:key,
       ci:id
     }
   })
 }
 //搜索影院（首页）
 export const searchCinemas = function (key,id) {
   return axios({
     method: 'get',
     url: 'search/cinemas',
     params:{
       keyword:key,
       ci:id
     }
   })
 }
 //影院筛选条件
 export const filterCinemas = function (id) {
   return axios({
     method: 'get',
     url: 'index/filterCinemas',
     params:{
       ci:id
     }
   })
 }
 //电影搜影院条件
 export const selectItems = function (id,cityId) {
   return axios({
     method: 'get',
     url: 'movie/select/items',
     params:{
      movieId:id,
      cityId:cityId
     }
   })
 }
 //影片上映影院
 export const selectCinemas = function (showDate,movieId,cityId,districtId,brandIds) {
   return axios({
     method: 'get',
     url: 'movie/select/cinemas',
     params:{
      limit:20,
      offset:0,
      showDate:showDate,
      movieId:movieId,
      cityId:cityId,
      districtId:districtId,
      // brandIds:brandIds
     }
   })
 }

 //影院正在上映电影
 export const cinemaShows = function (cinemaId,id) {
   return axios({
     method: 'get',
     url: 'cinema/shows',
     params:{
      cinemaId:cinemaId,
       ci:id
     }
   })
 }
 //附近影院
 export const moreCinemas = function (day,cityId=20,districtId=-1,hallType=-1,brandId=-1,serviceId=-1) {
   return axios({
     method: 'get',
     url: 'index/moreCinemas',
     params:{
       day:day,
       offset:0,
       limit:20,
       districtId:districtId,
       lineId:-1,
       hallType:hallType,
       brandId:brandId,
       serviceId:serviceId,
       areaId:-1,
       stationId:-1,
       updateShowDay:true,
       reqId:1636710166221,
       cityId:cityId
     }
   })
 }