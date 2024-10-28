import request from '@/utils/request'

// 获取HZAU下全部Staff人员
export function getStaffListApi(){
    return request({
        url:'/public-information/staff/kind/HZAU',
        method:'get'
    })
}

// 获取HZAU下全部PhdStudent人员
export function getPhdStudentListApi(){
    return request({
        url:'/public-information/students/HZAU/phd_students',
        method:'get'
    })
}


// 获取HZAU下全部professor
export function getProfessiorListApi(){
    return request({
        url:'/public-information/professor/kind/HZAU',
        method:'get'
    })
}
// 获取HZAU下全部UnderGraduate人员
export function getUnderGraduateListApi(){
    return request({
        url:'/public-information/students/HZAU/undergraduate',
        method:'get'
    })
}

// 获取HZAU下全部Master人员
export function getMasterListApi(){
    return request({
        url:'/public-information/master/HZAU/master',
        method:'get'
    })
}
// 获取HZAU下全部PostDocs人员
export function getPostDocsListApi(){
    return request({
        url:'/public-information/master/HZAU/postdocs',
        method:'get'
    })
}