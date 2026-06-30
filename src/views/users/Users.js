import React from 'react'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

const users = [
  {
    id: 1,
    username: 'Amanda',
    roomId: 'react-room-001',
    role: '房主',
    status: 'online',
    joinTime: '2026-06-30 10:24',
  },
  {
    id: 2,
    username: 'Tom',
    roomId: 'react-room-001',
    role: '协作者',
    status: 'online',
    joinTime: '2026-06-30 10:31',
  },
  {
    id: 3,
    username: 'Lucy',
    roomId: 'demo-room-002',
    role: '协作者',
    status: 'offline',
    joinTime: '2026-06-29 21:08',
  },
]

const Users = () => {
  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>用户管理</strong>
        <span className="text-body-secondary ms-2">管理 Web IDE 协作用户</span>
      </CCardHeader>

      <CCardBody>
        <CTable hover responsive align="middle">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>用户名</CTableHeaderCell>
              <CTableHeaderCell>房间号</CTableHeaderCell>
              <CTableHeaderCell>角色</CTableHeaderCell>
              <CTableHeaderCell>在线状态</CTableHeaderCell>
              <CTableHeaderCell>加入时间</CTableHeaderCell>
              <CTableHeaderCell>操作</CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          <CTableBody>
            {users.map((user) => (
              <CTableRow key={user.id}>
                <CTableDataCell>{user.username}</CTableDataCell>
                <CTableDataCell>{user.roomId}</CTableDataCell>
                <CTableDataCell>{user.role}</CTableDataCell>
                <CTableDataCell>
                  <CBadge color={user.status === 'online' ? 'success' : 'secondary'}>
                    {user.status === 'online' ? '在线' : '离线'}
                  </CBadge>
                </CTableDataCell>
                <CTableDataCell>{user.joinTime}</CTableDataCell>
                <CTableDataCell>
                  <CButton color="primary" size="sm" variant="outline">
                    查看
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default Users