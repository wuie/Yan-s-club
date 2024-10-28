import request from '@/utils/request'

// 获取全部bulletin
export function getBulletinListApi(){
    return request({
        url:'/public-information/bulletin/all',
        method:'get'
    })
}

// 点击浏览量加一
export function addBulletinPVsAPI(id){
    const url = `/public-information/bulletin/click/${id}`;
    return request({
        url:url,
        method:"get",
    })
}