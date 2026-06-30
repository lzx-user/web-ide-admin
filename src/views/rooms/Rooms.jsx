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
// mock 房间数据
// 模拟 Web IDE 协作房间列表
// ===============================
const rooms = [
  {
    id: 1,
    roomId: 'react-room-001',
    owner: 'Amanda',
    onlineCount: 3,
    fileCount: 12,
    status: 'active',
    lastActive: '2026-06-30 11:20',
    createTime: '2026-06-29 09:30',
  },
  {
    id: 2,
    roomId: 'demo-room-002',
    owner: 'Lucy',
    onlineCount: 0,
    fileCount: 8,
    status: 'idle',
    lastActive: '2026-06-29 22:10',
    createTime: '2026-06-29 18:20',
  },
  {
    id: 3,
    roomId: 'interview-demo',
    owner: 'Tom',
    onlineCount: 1,
    fileCount: 5,
    status: 'active',
    lastActive: '2026-06-30 09:46',
    createTime: '2026-06-30 08:50',
  },
]

const Rooms = () => {
  const [keyword, setKeyword] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [visible, setVisible] = useState(false)
  const [currentRoom, setCurrentRoom] = useState(null)

  // 根据房间号、创建人、房间状态筛选数据
  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const matchKeyword =
        room.roomId.toLowerCase().includes(keyword.toLowerCase()) ||
        room.owner.toLowerCase().includes(keyword.toLowerCase())

      const matchStatus = statusFilter === 'all' || room.status === statusFilter

      return matchKeyword && matchStatus
    })
  }, [keyword, statusFilter])

  // 查看房间详情
  const handleViewRoom = (room) => {
    setCurrentRoom(room)
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
          <strong>房间管理</strong>
          <span className="text-body-secondary ms-2">查看协作房间状态、在线人数和文件数量</span>
        </CCardHeader>

        <CCardBody>
          {/* 搜索和筛选区域 */}
          <CRow className="mb-3 g-2">
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

            <CCol md={3} className="d-flex gap-2 align-items-center">
              <CButton color="secondary" variant="outline" onClick={handleReset}>
                重置
              </CButton>

              <span className="text-body-secondary small">
                当前共 {filteredRooms.length} 个房间
              </span>
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
              {filteredRooms.length > 0 ? (
                filteredRooms.map((room) => (
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
                      <CButton
                        color="primary"
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewRoom(room)}
                      >
                        详情
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))
              ) : (
                <CTableRow>
                  <CTableDataCell colSpan={7} className="text-center text-body-secondary py-4">
                    暂无匹配房间，请调整搜索条件
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {/* 房间详情弹窗 */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>房间详情</CModalTitle>
        </CModalHeader>

        <CModalBody>
          {currentRoom && (
            <div className="small">
              <p>
                <strong>房间号：</strong>
                {currentRoom.roomId}
              </p>
              <p>
                <strong>创建人：</strong>
                {currentRoom.owner}
              </p>
              <p>
                <strong>在线人数：</strong>
                {currentRoom.onlineCount}
              </p>
              <p>
                <strong>文件数量：</strong>
                {currentRoom.fileCount}
              </p>
              <p>
                <strong>房间状态：</strong>
                <CBadge color={currentRoom.status === 'active' ? 'success' : 'warning'}>
                  {currentRoom.status === 'active' ? '活跃' : '空闲'}
                </CBadge>
              </p>
              <p>
                <strong>创建时间：</strong>
                {currentRoom.createTime}
              </p>
              <p className="mb-0">
                <strong>最近活跃：</strong>
                {currentRoom.lastActive}
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

export default Rooms
