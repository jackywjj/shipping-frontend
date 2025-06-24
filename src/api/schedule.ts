import {get, post, put, del} from '../serve/http.ts'
// 获取用户管理列表
const getSchedulesList = (params: any) => {
  return get('schedules', params)
}
// 获取用户信息
const getOneSchedule = (id: number) => {
  return get(`schedules/${id}`)
}

// 修改状态为运输中
const editStatusToProgress = (id: number) => {
  return put(`schedules/${id}/in_progress`)
}

// 修改状态为已完成
const editStatusToComplete = (id: number) => {
  return put(`schedules/${id}/completed`)
}


export {
  getSchedulesList,
  getOneSchedule,
  editStatusToProgress,
  editStatusToComplete
}