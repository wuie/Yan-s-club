import request from '@/utils/request'

// 获取全部interest
export function getInterestListApi(){
    return request({
        url:'/public-information/interest/all',
        method:'get'
    })
}