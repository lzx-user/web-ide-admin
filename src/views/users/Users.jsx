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
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

// ===============================
// mock 用户数据
// 当前版本先使用本地模拟数据，后续可以替换成后端接口返回的数据
// ===============================
const users = [
  {
    id: 1,
    username: 'Amanda',
    roomId: 'react-room-001',
    role: '房主',
    status: 'online',
    joinTime: '2026-06-30 10:24',
    lastActive: '2026-06-30 14:32',
  },
  {
    id: 2,
    username: 'Tom',
    roomId: 'react-room-001',
    role: '协作者',
    status: 'online',
    joinTime: '2026-06-30 10:31',
    lastActive: '2026-06-30 14:18',
  },
  {
    id: 3,
    username: 'Lucy',
    roomId: 'demo-room-002',
    role: '协作者',
    status: 'offline',
    joinTime: '2026-06-29 21:08',
    lastActive: '2026-06-29 22:15',
  },
  {
    id: 4,
    username: 'Jack',
    roomId: 'interview-demo',
    role: '协作者',
    status: 'offline',
    joinTime: '2026-06-29 19:18',
    lastActive: '2026-06-29 20:40',
  },
]

const Users = () => {
  // 搜索关键词：支持搜索用户名和房间号
  const [keyword, setKeyword] = useState('')

  // 状态筛选：all / online / offline
  const [statusFilter, setStatusFilter] = useState('all')

  // 控制详情弹窗是否显示
  const [visible, setVisible] = useState(false)

  // 当前点击查看的用户
  const [currentUser, setCurrentUser] = useState(null)

  // ===============================
  // 根据搜索条件过滤用户列表
  // useMemo 的作用：
  // 只有 keyword 或 statusFilter 变化时才重新计算 filteredUsers
  // ===============================
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchKeyword =
        user.username.toLowerCase().includes(keyword.toLowerCase()) ||
        user.roomId.toLowerCase().includes(keyword.toLowerCase())

      const matchStatus = statusFilter === 'all' || user.status === statusFilter

      return matchKeyword && matchStatus
    })
  }, [keyword, statusFilter])

  // 点击查看按钮时，记录当前用户，并打开弹窗
  const handleViewUser = (user) => {
    setCurrentUser(user)
    setVisible(true)
  }

  // 重置搜索和筛选条件
  const handleReset = () => {
    setKeyword('')
    setStatusFilter('all')
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>用户管理</strong>
          <span className="text-body-secondary ms-2">管理 Web IDE 协作用户和在线状态</span>
        </CCardHeader>

        <CCardBody>
          {/* 搜索和筛选区域 */}
          <CRow className="mb-3 g-2">
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

            <CCol md={3} className="d-flex gap-2 align-items-center">
              <CButton color="secondary" variant="outline" onClick={handleReset}>
                重置
              </CButton>

              <span className="text-body-secondary small">
                当前共 {filteredUsers.length} 条数据
              </span>
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
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
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
                      <CButton
                        color="primary"
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewUser(user)}
                      >
                        查看
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))
              ) : (
                // 空状态：当搜索不到数据时展示
                <CTableRow>
                  <CTableDataCell colSpan={6} className="text-center text-body-secondary py-4">
                    暂无匹配用户，请调整搜索条件
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {/* 用户详情弹窗 */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>用户详情</CModalTitle>
        </CModalHeader>

        <CModalBody>
          {currentUser && (
            <div className="small">
              <p>
                <strong>用户名：</strong>
                {currentUser.username}
              </p>
              <p>
                <strong>所在房间：</strong>
                {currentUser.roomId}
              </p>
              <p>
                <strong>用户角色：</strong>
                {currentUser.role}
              </p>
              <p>
                <strong>在线状态：</strong>
                <CBadge color={currentUser.status === 'online' ? 'success' : 'secondary'}>
                  {currentUser.status === 'online' ? '在线' : '离线'}
                </CBadge>
              </p>
              <p>
                <strong>加入时间：</strong>
                {currentUser.joinTime}
              </p>
              <p className="mb-0">
                <strong>最近活跃：</strong>
                {currentUser.lastActive}
              </p>
            </div>
          )}
        </CModalBody>

        <CModalFooter>
          <CButton color="secondary" variant="outline" onClick={() => setVisible(false)}>
            关闭
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Users
