import request from '@/utils/request'

// 获取全部publications
export function getPublicationsListApi(){
    return request({
        url:'/public-information/publications/all',
        method:'get'
    })
}