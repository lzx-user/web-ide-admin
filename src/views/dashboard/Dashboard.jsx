import React, { useEffect, useState } from 'react'
import {
  CAlert,
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { getAdminOverview } from '../../api/admin'

const Dashboard = () => {
  // 后端真实统计数据
  const [statistics, setStatistics] = useState([])
  const [activeRooms, setActiveRooms] = useState([])
  const [runRecords, setRunRecords] = useState([])
  const [charts, setCharts] = useState({
    successRate: 0,
    failedRate: 100,
  })

  // 页面状态
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const loadOverview = async () => {
    setLoading(true)
    setErrorMsg('')

    try {
      // 请求后端后台总览接口
      // 实际地址：http://localhost:3000/api/admin/overview
      const res = await getAdminOverview()

      if (!res.success) {
        setErrorMsg(res.message || '数据加载失败')
        return
      }

      const data = res.data || {}

      setStatistics(data.statistics || [])
      setActiveRooms(data.activeRooms || [])
      setRunRecords(data.runRecords || [])
      setCharts(data.charts || { successRate: 0, failedRate: 100 })
    } catch (err) {
      setErrorMsg(err.message || '无法连接后端，请检查 localhost:3000 是否启动')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOverview()
  }, [])

  return (
    <>
      <CCard className="mb-4">
        <CCardBody className="d-flex justify-content-between align-items-start">
          <div>
            <h4 className="mb-2">Web IDE 数据看板</h4>
            <p className="text-body-secondary mb-1">
              本后台用于展示多人协作 Web IDE
              的核心运行数据，包括用户在线状态、协作房间、项目文件和代码执行记录。
            </p>
          </div>

          <CButton color="primary" variant="outline" onClick={loadOverview} disabled={loading}>
            {loading ? '刷新中...' : '刷新数据'}
          </CButton>
        </CCardBody>
      </CCard>

      {errorMsg && (
        <CAlert color="danger" className="mb-4">
          {errorMsg}
        </CAlert>
      )}

      {loading && (
        <CCard className="mb-4">
          <CCardBody className="text-center py-4">
            <CSpinner size="sm" className="me-2" />
            正在加载后台真实数据...
          </CCardBody>
        </CCard>
      )}

      <CRow>
        {statistics.map((item) => (
          <CCol sm={6} xl={3} key={item.title}>
            <CCard className="mb-4">
              <CCardBody>
                <div className="text-body-secondary small">{item.title}</div>
                <div className="fs-4 fw-semibold mt-2">{item.value}</div>
                <div className="small text-body-secondary mt-1">{item.desc}</div>
                <CProgress thin color={item.color} value={item.progress} className="mt-3" />
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>

      <CRow>
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
                  {activeRooms.length > 0 ? (
                    activeRooms.map((room) => (
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
                    ))
                  ) : (
                    <CTableRow>
                      <CTableDataCell colSpan={6} className="text-center text-body-secondary py-4">
                        暂无房间数据
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>

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
                  {runRecords.length > 0 ? (
                    runRecords.map((record) => (
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
                    ))
                  ) : (
                    <CTableRow>
                      <CTableDataCell colSpan={4} className="text-center text-body-secondary py-4">
                        暂无运行记录
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CCard className="mb-4">
        <CCardHeader>
          <strong>运行成功率</strong>
          <span className="text-body-secondary ms-2">根据运行记录统计</span>
        </CCardHeader>

        <CCardBody>
          <div className="mb-2">成功率：{charts.successRate}%</div>
          <CProgress color="success" value={charts.successRate} className="mb-3" />

          <div className="mb-2">失败率：{charts.failedRate}%</div>
          <CProgress color="danger" value={charts.failedRate} />
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
