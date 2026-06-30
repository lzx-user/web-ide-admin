import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Users = React.lazy(() => import('./views/users/Users'))
const Rooms = React.lazy(() => import('./views/rooms/Rooms'))
const Files = React.lazy(() => import('./views/files/Files'))
const Runs = React.lazy(() => import('./views/runs/Runs'))

const routes = [
  { path: '/', exact: true, name: '首页' },
  { path: '/dashboard', name: '数据看板', element: Dashboard },
  { path: '/users', name: '用户管理', element: Users },
  { path: '/rooms', name: '房间管理', element: Rooms },
  { path: '/files', name: '文件管理', element: Files },
  { path: '/runs', name: '运行记录', element: Runs },
]

export { routes }
export default routes