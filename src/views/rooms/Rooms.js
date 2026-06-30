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
  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>房间管理</strong>
        <span className="text-body-secondary ms-2">查看协作房间状态</span>
      </CCardHeader>

      <CCardBody>
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
            {rooms.map((room) => (
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