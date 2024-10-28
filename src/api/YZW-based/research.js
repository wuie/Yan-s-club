import request from '@/utils/request'

// 获取全部research
export function getResearchListApi(){
    return request({
        url:'/public-information/research/kind/YZW',
        method:'get'
    })
}

// 获取全部图片
export function getPictListApi(){
    return request({
        url:'/public-information/picture/kind/YZW',
        method:'get'
    })
}
