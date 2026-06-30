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

// mock 房间数据：模拟 Web IDE 协作房间列表
const rooms = [
  {
    id: 1,
    roomId: 'react-room-001',
    owner: 'Amanda',
    onlineCount: 3,
    fileCount: 12,
    status: 'active',
    lastActive: '2026-06-30 11:20',
  },
  {
    id: 2,
    roomId: 'demo-room-002',
    owner: 'Lucy',
    onlineCount: 0,
    fileCount: 8,
    status: 'idle',
    lastActive: '2026-06-29 22:10',
  },
  {
    id: 3,
    roomId: 'interview-demo',
    owner: 'Tom',
    onlineCount: 1,
    fileCount: 5,
    status: 'active',
    lastActive: '2026-06-30 09:46',
  },
]

const Rooms = () => {
  const [keyword, setKeyword] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // 根据房间号 / 创建人 / 状态筛选房间
  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const matchKeyword =
        room.roomId.toLowerCase().includes(keyword.toLowerCase()) ||
        room.owner.toLowerCase().includes(keyword.toLowerCase())

      const matchStatus = statusFilter === 'all' || room.status === statusFilter

      return matchKeyword && matchStatus
    })
  }, [keyword, statusFilter])

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>房间管理</strong>
        <span className="text-body-secondary ms-2">查看协作房间状态、在线人数和文件数量</span>
      </CCardHeader>

      <CCardBody>
        <CRow className="mb-3">
          <CCol md={6}>
            <CFormInput
              placeholder="搜索房间号或创建人，例如 react-room-001 / Amanda"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </CCol>

          <CCol md={3}>
            <CFormSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">全部状态</option>
              <option value="active">活跃</option>
              <option value="idle">空闲</option>
            </CFormSelect>
          </CCol>

          <CCol md={3} className="d-flex align-items-center text-body-secondary">
            当前共 {filteredRooms.length} 个房间
          </CCol>
        </CRow>

        <CTable hover responsive align="middle">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>房间号</CTableHeaderCell>
              <CTableHeaderCell>创建人</CTableHeaderCell>
              <CTableHeaderCell>在线人数</CTableHeaderCell>
              <CTableHeaderCell>文件数量</CTableHeaderCell>
              <CTableHeaderCell>状态</CTableHeaderCell>
              <CTableHeaderCell>最近活跃时间</CTableHeaderCell>
              <CTableHeaderCell>操作</CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          <CTableBody>
            {filteredRooms.map((room) => (
              <CTableRow key={room.id}>
                <CTableDataCell>{room.roomId}</CTableDataCell>
                <CTableDataCell>{room.owner}</CTableDataCell>
                <CTableDataCell>{room.onlineCount}</CTableDataCell>
                <CTableDataCell>{room.fileCount}</CTableDataCell>
                <CTableDataCell>
                  <CBadge color={room.status === 'active' ? 'success' : 'warning'}>
                    {room.status === 'active' ? '活跃' : '空闲'}
                  </CBadge>
                </CTableDataCell>
                <CTableDataCell>{room.lastActive}</CTableDataCell>
                <CTableDataCell>
                  <CButton color="primary" size="sm" variant="outline">
                    详情
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

export default Rooms
