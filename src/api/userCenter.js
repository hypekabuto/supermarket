import http from '../utils/request'
export const selectUserById = (data) =>{
    return http.get('http://localhost:8081/user/selectUserById',{params: {id: data}})
}
export const updataUserImage = (data) =>{
    return http.get('http://localhost:8081/user/updataUserImage',data)
}
export const updateUser = (data) =>{
    return http.post('http://localhost:8081/user/updateUser',data)
}
