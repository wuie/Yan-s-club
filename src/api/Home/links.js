import request from '@/utils/request'

// 获取全部links
export function getLinksListApi(){
    return request({
        url:'/public-information/links/all',
        method:'get'
    })
}