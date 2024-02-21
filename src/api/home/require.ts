import {request} from '@/plugin/request'
import type { RequireInfo } from '@/types/RequireInfo'
/**
 * 新增需求
 *
 * @param {RequireInfo} data
 */
const addRequireInfo = (data:RequireInfo)=>request<string>("/requireInfo",data,"POST")

/**
 * 分页获取需求
 *
 * @param {number} categoryId
 * @param {number} current
 * @param {number} size
 */
const pageRequireInfo = (categoryId:number,current:number,size:number)=>request(`/requireInfo?categoryId=${categoryId}&current=${current}&size=${size}`,{},"GET")


/**
 * 根据id获取需求信息
 *
 * @param {string} id
 */
const getInfoById = (id:string)=>request(`/requireInfo/${id}`,{},"GET")
/**
 * 获取用户的需求数量
 *
 * @param {string} userId
 */
const getInfoCount = ()=>request<number>(`/requireInfo/count`,{},"GET")

/**
 * 根据userId获取所有的需求信息
 *
 */
const getInfoByUserId = ()=>request<number>(`/requireInfo/user`,{},"GET")
/**
 * 下架需求
 *
 * @param {string} id
 */
const cancelRequireInfo = (id:string)=>request<string>(`/requireInfo/cancle/${id}`,{},"GET")


export{
    addRequireInfo,
    pageRequireInfo,
    getInfoById,
    getInfoCount,
    getInfoByUserId,
    cancelRequireInfo
}