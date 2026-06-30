import React from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

// ===============================
// 1. 数据看板顶部统计卡片
// 这里先使用 mock 数据，模拟后台接口返回的数据
// 后面如果接真实后端，只需要把这些数据换成接口返回值即可
// ===============================
const statistics = [
  {
    title: '总用户数',
    value: '128',
    desc: '累计加入 Web IDE 的用户数量',
    color: 'primary',
    progress: 75,
  },
  {
    title: '在线房间数',
    value: '12',
    desc: '当前正在协作编辑的房间',
    color: 'success',
    progress: 60,
  },
  {
    title: '今日运行次数',
    value: '86',
    desc: '今日代码运行请求次数',
    color: 'warning',
    progress: 68,
  },
  {
    title: '今日保存次数',
    value: '214',
    desc: '今日代码保存操作次数',
    color: 'info',
    progress: 82,
  },
]

// ===============================
// 2. 最近活跃房间数据
// 对应你主项目里的 roomId、在线人数、文件数量等业务概念
// ===============================
const activeRooms = [
  {
    id: 1,
    roomId: 'react-room-001',
    owner: 'Amanda',
    onlineCount: 3,
    fileCount: 12,
    status: 'active',
    lastActive: '2026-06-30 14:32',
  },
  {
    id: 2,
    roomId: 'interview-demo',
    owner: 'Tom',
    onlineCount: 2,
    fileCount: 8,
    status: 'active',
    lastActive: '2026-06-30 13:48',
  },
  {
    id: 3,
    roomId: 'demo-room-002',
    owner: 'Lucy',
    onlineCount: 0,
    fileCount: 5,
    status: 'idle',
    lastActive: '2026-06-29 22:15',
  },
]

// ===============================
// 3. 最近运行记录
// 对应你主项目里的 executeCode、codeOutput、executionFinished 等运行流程
// ===============================
const runRecords = [
  {
    id: 1,
    roomId: 'react-room-001',
    filename: 'index.js',
    status: 'success',
    exitCode: 0,
    runTime: '2026-06-30 14:35',
  },
  {
    id: 2,
    roomId: 'react-room-001',
    filename: 'test.js',
    status: 'failed',
    exitCode: 1,
    runTime: '2026-06-30 14:02',
  },
  {
    id: 3,
    roomId: 'interview-demo',
    filename: 'main.js',
    status: 'success',
    exitCode: 0,
    runTime: '2026-06-30 13:50',
  },
]

const Dashboard = () => {
  return (
    <>
      {/* 页面标题区域 */}
      <CCard className="mb-4">
        <CCardBody>
          <h4 className="mb-2">Web IDE 数据看板</h4>
          <p className="text-body-secondary mb-0">
            本后台用于展示多人协作 Web IDE
            的核心运行数据，包括用户在线状态、协作房间、项目文件和代码执行记录。
          </p>
        </CCardBody>
      </CCard>

      {/* 顶部统计卡片 */}
      <CRow>
        {statistics.map((item) => (
          <CCol sm={6} xl={3} key={item.title}>
            <CCard className="mb-4">
              <CCardBody>
                {/* 统计标题 */}
                <div className="text-body-secondary small">{item.title}</div>

                {/* 统计数值 */}
                <div className="fs-4 fw-semibold mt-2">{item.value}</div>

                {/* 说明文字 */}
                <div className="small text-body-secondary mt-1">{item.desc}</div>

                {/* 进度条只是做可视化展示，不代表真实计算 */}
                <CProgress thin color={item.color} value={item.progress} className="mt-3" />
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>

      <CRow>
        {/* 最近活跃房间表格 */}
        <CCol lg={7}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>最近活跃房间</strong>
              <span className="text-body-secondary ms-2">展示当前协作房间状态</span>
            </CCardHeader>

            <CCardBody>
              <CTable hover responsive align="middle">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>房间号</CTableHeaderCell>
                    <CTableHeaderCell>创建人</CTableHeaderCell>
                    <CTableHeaderCell>在线人数</CTableHeaderCell>
                    <CTableHeaderCell>文件数</CTableHeaderCell>
                    <CTableHeaderCell>状态</CTableHeaderCell>
                    <CTableHeaderCell>最近活跃</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>

                <CTableBody>
                  {activeRooms.map((room) => (
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
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>

        {/* 最近运行记录表格 */}
        <CCol lg={5}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>最近运行记录</strong>
              <span className="text-body-secondary ms-2">展示代码执行结果</span>
            </CCardHeader>

            <CCardBody>
              <CTable hover responsive align="middle">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>房间号</CTableHeaderCell>
                    <CTableHeaderCell>文件</CTableHeaderCell>
                    <CTableHeaderCell>状态</CTableHeaderCell>
                    <CTableHeaderCell>退出码</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>

                <CTableBody>
                  {runRecords.map((record) => (
                    <CTableRow key={record.id}>
                      <CTableDataCell>{record.roomId}</CTableDataCell>
                      <CTableDataCell>{record.filename}</CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={record.status === 'success' ? 'success' : 'danger'}>
                          {record.status === 'success' ? '成功' : '失败'}
                        </CBadge>
                      </CTableDataCell>
                      <CTableDataCell>{record.exitCode}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* 项目说明卡片 */}
      <CCard className="mb-4">
        <CCardHeader>
          <strong>后台模块说明</strong>
        </CCardHeader>

        <CCardBody>
          <CRow>
            <CCol md={3}>
              <h6>用户管理</h6>
              <p className="text-body-secondary small mb-0">
                管理进入 Web IDE 协作房间的用户信息和在线状态。
              </p>
            </CCol>

            <CCol md={3}>
              <h6>房间管理</h6>
              <p className="text-body-secondary small mb-0">
                查看房间号、在线人数、文件数量和最近活跃时间。
              </p>
            </CCol>

            <CCol md={3}>
              <h6>文件管理</h6>
              <p className="text-body-secondary small mb-0">
                管理协作空间中的代码文件、文件类型和更新时间。
              </p>
            </CCol>

            <CCol md={3}>
              <h6>运行记录</h6>
              <p className="text-body-secondary small mb-0">
                查看代码运行状态、退出码和运行时间，方便问题排查。
              </p>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
