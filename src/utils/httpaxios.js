import Vue from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'
import {Message,MessageBox} from 'element-ui'
axios.defaults.headers.post['Content-Type'] = 'application/json'
export const request = (config) => { return axios(config)}
axios.interceptors.request.use(
    (config) => {
        console.log('this is pre request func')
        return config
    },
    (err) => {
        return Promise.reject(err)
    }    
)
axios.interceptors.response.use(
(response) => {
    console.log('------------- this is response from axios ---------')
    return response
},
(err) => {
    console.log('------------- this is error from axios ---------')
    console.log(err)
    if(err.response){
        console.log(err.response)
        switch (err.response.status){
            case 401:
                Message.error('401')
                break
            case 403:
                Message.error('403')
                break
            default:
                Message.error('return error status : ' + err.response.status)
        }
    }
    return Promise.reject(err)
}

)



