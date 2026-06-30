import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilNotes,
  cilDescription,
  cilCalculator,
  cilChartPie,
} from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'Web IDE 管理后台',
  },
  {
    component: CNavItem,
    name: '数据看板',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '用户管理',
    to: '/users',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '房间管理',
    to: '/rooms',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '文件管理',
    to: '/files',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '运行记录',
    to: '/runs',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
]

export default _nav