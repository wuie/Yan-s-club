import request from '@/utils/request'

// 获取全部news
export function getNewsListApi(){
    return request({
        url:'/public-information/news/list?pageNum=1&pageSize=20np',
        method:'get'
    })
}