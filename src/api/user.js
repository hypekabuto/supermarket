import http from '../utils/request'

export const getUser = () =>{
    return http.get('http://localhost:8081/user/selectUser')
}
export const addUser = (data) =>{
    return http.post('http://localhost:8081/user/addUser',data)
}
export const updateUser = (data) =>{
    return http.post('http://localhost:8081/user/updateUser',data)
}
export const deleteUser = (data) =>{
    return http.delete("http://localhost:8081/user/deleteUser", {params: {id: data}})
}
export const selectUserByPage = (data) =>{
    return http.post("http://localhost:8081/user/selectUserByPage", data)
}
