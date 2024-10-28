import request from '@/utils/request'

// 根据类型，id查询user
export function getUserDetailApi(kind,id){
    const url = `/public-information/${kind}/${id}`;
    return request({
        url:url,
        method:'get'
    })
}

// 根据传入路径访问接口
export function getAluminListApi(data) {
    const url = `/public-information/alumni/kind/${data}`;
    // 返回请求
    return request({
      url: url,
      method: "get",
    });
  }
  