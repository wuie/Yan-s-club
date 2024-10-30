import request from '@/utils/request'

// 获取新闻列表（支持分页）
export function getNewsListApi(params) {
    return request({
        url: '/public-information/news/list',
        method: 'get',
        params: {
            pageNum: params?.pageNum || 1,
            pageSize: params?.pageSize || 20,
            ...params
        }
    })
}