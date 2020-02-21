import {Message} from 'element-ui'
import {request} from '@/utils/httpaxios'
const config=require('../../../../config/global.js')

const global_util=config.default.util
export function add_data_index(postdata,callbackmethod){
    request(
        {
            method:'post',
            data: postdata,
            url:global_util.BASE + global_util.backendstring + '/data_manage_setindexdata'

        }
    ).then(
        (resp)=>{
            callbackmethod(resp.data)
        }
    ).catch(
        (err) => {
            Message.error('error in backend request data_manage_setindexdata')
            console.log(err)
        }
    )
}

export function data_manage_get_dst_col(colname,callbackmethod){
    request(
        {
            method:'post',
            data: {"colname":colname},
            url:global_util.BASE + global_util.backendstring + '/data_manage_get_dst_col'

        }
    ).then(
        (resp)=>{
            callbackmethod(resp.data)
        }
    ).catch(
        (err) => {
            Message.error('error in backend request data_manage_get_dst_col')
            console.log(err)
        }
    )
}


export function data_manage_get_col_lv2(level,callbackmethod){
    request(
        {
            method:'post',
            data: {"level":level},
            url:global_util.BASE + global_util.backendstring + '/data_manage_get_col_lv2'

        }
    ).then(
        (resp)=>{
            callbackmethod(resp.data)
        }
    ).catch(
        (err) => {
            Message.error('error in backend request data_manage_get_col_lv2')
            console.log(err)
        }
    )
}


export function data_manage_set_data_content(itemlist,data_level,data_name,callbackmethod){
    request(
        {
            method:'post',
            data: {"itemlist":itemlist,"data_level": data_level,"data_name": data_name},
            url:global_util.BASE + global_util.backendstring + '/data_manage_set_data_content'

        }
    ).then(
        (resp)=>{
            callbackmethod(resp.data)
        }
    ).catch(
        (err) => {
            Message.error('error in backend request data_manage_set_data_content')
            console.log(err)
        }
    )
}


export function data_manage_get_data_update_log(postdata,callbackmethod){
    request(
        {
            method:'post',
            data: postdata,
            url:global_util.BASE + global_util.backendstring + '/data_manage_get_data_update_log'

        }
    ).then(
        (resp)=>{
            callbackmethod(resp.data)
        }
    ).catch(
        (err) => {
            Message.error('error in backend request data_manage_get_data_update_log')
            console.log(err)
        }
    )
}

export function data_manage_get_data_content_list(postdata,callbackmethod){
    request(
        {
            method:'post',
            data: postdata,
            url:global_util.BASE + global_util.backendstring + '/data_manage_get_data_content_list'

        }
    ).then(
        (resp)=>{
            callbackmethod(resp.data)
        }
    ).catch(
        (err) => {
            Message.error('error in backend request data_manage_get_data_content_list')
            console.log(err)
        }
    )
}

