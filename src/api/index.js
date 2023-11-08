import http from '../utils/request'

//请求首页数据
export const  getDataTable = () =>{
    return http.get('http://localhost:8081/goodsOrder/mainShow')
}
export const getTodayNum = () =>{
    return http.get('http://localhost:8081/goodsOrder/selectNum')
}
export const getMouthNum = () =>{
    return http.get('http://localhost:8081/goodsOrder/selectMouthNum')
}
export const getNoMouthNum = () =>{
    return http.get('http://localhost:8081/goodsOrder/selectNoMouthNum')
}
export const getNoTodayNum = () =>{
    return http.get('http://localhost:8081/goodsOrder/selectNoNum')
}
export const getBarEcharts = () =>{
    return http.get('http://localhost:8081/goodsOrder/selectEcharts')
}
export const getEchartsTwo = () =>{
    return http.get('http://localhost:8081/goodsOrder/selectEchartsTwo')
}

