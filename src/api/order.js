import http from '../utils/request'
export const getGoodsOrder = () =>{
    return http.get('http://localhost:8081/goodsOrder/selectGoodsOrder')
}
export const selectGoodsOrderByPage = (data) =>{
    return http.post('http://localhost:8081/goodsOrder/selectGoodsOrderByPage', data)
}
export const addGoodsOrder = (data) =>{
    return http.post('http://localhost:8081/goodsOrder/addGoodsOrder',data)
}
export const updateGoodsOrder = (data) =>{
    return http.post('http://localhost:8081/goodsOrder/updateGoodsOrder',data)
}
export const deleteGoodsOrder = (data) =>{
    return http.delete("http://localhost:8081/goodsOrder/deleteGoodsOrder", {params: {orderid: data}})
}
