import request from '@/utils/request'

// 获取YZW下全部Staff人员
export function getStaffListApi(){
    return request({
        url:'/public-information/staff/kind/YZW',
        method:'get'
    })
}

// 获取YZW下全部Professor人员
export function getProfessiorListApi(){
    return request({
        url:'/public-information/professor/kind/YZW',
        method:'get'
    })
}
// 获取YZW下全部PhdStudent人员
export function getPhdStudentListApi(){
    return request({
        url:'/public-information/students/YZW/phd_students',
        method:'get'
    })
}

// 获取YZW下全部UnderGraduate人员
export function getUnderGraduateListApi(){
    return request({
        url:'/public-information/students/YZW/undergraduate',
        method:'get'
    })
}

// 获取YZW下全部Master人员
export function getMasterListApi(){
    return request({
        url:'/public-information/master/YZW/master',
        method:'get'
    })
}
// 获取YZW下全部PostDocs人员
export function getPostDocsListApi(){
    return request({
        url:'/public-information/master/YZW/postdocs',
        method:'get'
    })
}