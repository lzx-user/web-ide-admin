import React, { useMemo, useState } from 'react'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormSelect,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

// mock 用户数据：后续可以替换成真实接口返回的数据
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
  {
    id: 4,
    username: 'Jack',
    roomId: 'interview-demo',
    role: '协作者',
    status: 'offline',
    joinTime: '2026-06-29 19:18',
  },
]

const Users = () => {
  // 搜索关键词：支持搜索用户名和房间号
  const [keyword, setKeyword] = useState('')

  // 状态筛选：all / online / offline
  const [statusFilter, setStatusFilter] = useState('all')

  // useMemo 用来根据搜索条件计算过滤后的表格数据
  // 好处：只有 keyword 或 statusFilter 改变时才重新计算
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchKeyword =
        user.username.toLowerCase().includes(keyword.toLowerCase()) ||
        user.roomId.toLowerCase().includes(keyword.toLowerCase())

      const matchStatus = statusFilter === 'all' || user.status === statusFilter

      return matchKeyword && matchStatus
    })
  }, [keyword, statusFilter])

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>用户管理</strong>
        <span className="text-body-secondary ms-2">管理 Web IDE 协作用户和在线状态</span>
      </CCardHeader>

      <CCardBody>
        {/* 搜索和筛选区域 */}
        <CRow className="mb-3">
          <CCol md={6}>
            <CFormInput
              placeholder="搜索用户名或房间号，例如 Amanda / react-room-001"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </CCol>

          <CCol md={3}>
            <CFormSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">全部状态</option>
              <option value="online">在线</option>
              <option value="offline">离线</option>
            </CFormSelect>
          </CCol>

          <CCol md={3} className="d-flex align-items-center text-body-secondary">
            当前共 {filteredUsers.length} 条数据
          </CCol>
        </CRow>

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
            {filteredUsers.map((user) => (
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
