import http from '../utils/request'
export const login = (data) =>{
    return http.post('http://localhost:8081/user/login',data)
}
