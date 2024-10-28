import request from '@/utils/request'

// 获取全部resources
export function getResourcesListApi(){
    return request({
        url:'/public-information/resources/all',
        method:'get'
    })
}