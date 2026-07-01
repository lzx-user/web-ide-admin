import request from '../services/request'

// 管理员登录
// 对应后端：POST /api/admin/login
export function adminLogin(data) {
  return request.post('/admin/login', data)
}

// 数据看板总览
// 对应后端：GET /api/admin/overview
export function getAdminOverview() {
  return request.get('/admin/overview')
}

// 用户管理列表
// 对应后端：GET /api/admin/users
export function getAdminUsers(params) {
  return request.get('/admin/users', { params })
}

// 房间管理列表
// 对应后端：GET /api/admin/rooms
export function getAdminRooms(params) {
  return request.get('/admin/rooms', { params })
}

// 文件管理列表
// 对应后端：GET /api/admin/files
export function getAdminFiles(params) {
  return request.get('/admin/files', { params })
}

// 运行记录列表
// 对应后端：GET /api/admin/runs
export function getAdminRuns(params) {
  return request.get('/admin/runs', { params })
}
