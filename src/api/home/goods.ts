import request from '@/plugin/request'
import type { Category } from '@/types/Category';
import type { ResponseResult } from '@/types/common';

const allCategories = () => request<Category[]>('/categories', {}, "GET"
    , { Authorization: "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxIiwiaWF0IjoxNzA0OTQxMjg1LCJzdWIiOiIiLCJpc3MiOiIiLCJleHAiOjE3MDc2MTk2ODV9.ly8_wfQs8yCRhr3806AjhfqIQWywfPMzWWc9eybvnOs" })


export {
    allCategories
}
