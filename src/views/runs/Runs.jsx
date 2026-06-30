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
// mock 运行记录
// 对应主项目中代码运行、输出结果、退出码等业务概念
// ===============================
const records = [
  {
    id: 1,
    roomId: 'react-room-001',
    filename: 'index.js',
    language: 'JavaScript',
    status: 'success',
    exitCode: 0,
    runTime: '2026-06-30 11:25',
    duration: '0.8s',
  },
  {
    id: 2,
    roomId: 'react-room-001',
    filename: 'test.js',
    language: 'JavaScript',
    status: 'failed',
    exitCode: 1,
    runTime: '2026-06-30 10:40',
    duration: '0.5s',
  },
  {
    id: 3,
    roomId: 'demo-room-002',
    filename: 'main.js',
    language: 'JavaScript',
    status: 'success',
    exitCode: 0,
    runTime: '2026-06-29 21:30',
    duration: '1.1s',
  },
  {
    id: 4,
    roomId: 'interview-demo',
    filename: 'demo.js',
    language: 'JavaScript',
    status: 'failed',
    exitCode: 1,
    runTime: '2026-06-30 09:12',
    duration: '0.6s',
  },
]

const Runs = () => {
  const [keyword, setKeyword] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [visible, setVisible] = useState(false)
  const [currentRecord, setCurrentRecord] = useState(null)

  // 根据房间号、文件名、运行状态筛选数据
  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const matchKeyword =
        record.roomId.toLowerCase().includes(keyword.toLowerCase()) ||
        record.filename.toLowerCase().includes(keyword.toLowerCase())

      const matchStatus = statusFilter === 'all' || record.status === statusFilter

      return matchKeyword && matchStatus
    })
  }, [keyword, statusFilter])

  const handleViewRecord = (record) => {
    setCurrentRecord(record)
    setVisible(true)
  }

  const handleReset = () => {
    setKeyword('')
    setStatusFilter('all')
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>运行记录</strong>
          <span className="text-body-secondary ms-2">查看代码执行状态、退出码和运行时间</span>
        </CCardHeader>

        <CCardBody>
          {/* 搜索和筛选区域 */}
          <CRow className="mb-3 g-2">
            <CCol md={6}>
              <CFormInput
                placeholder="搜索房间号或文件名，例如 react-room-001 / index.js"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </CCol>

            <CCol md={3}>
              <CFormSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">全部状态</option>
                <option value="success">成功</option>
                <option value="failed">失败</option>
              </CFormSelect>
            </CCol>

            <CCol md={3} className="d-flex gap-2 align-items-center">
              <CButton color="secondary" variant="outline" onClick={handleReset}>
                重置
              </CButton>

              <span className="text-body-secondary small">
                当前共 {filteredRecords.length} 条记录
              </span>
            </CCol>
          </CRow>

          <CTable hover responsive align="middle">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>房间号</CTableHeaderCell>
                <CTableHeaderCell>文件名</CTableHeaderCell>
                <CTableHeaderCell>语言</CTableHeaderCell>
                <CTableHeaderCell>运行状态</CTableHeaderCell>
                <CTableHeaderCell>退出码</CTableHeaderCell>
                <CTableHeaderCell>运行时间</CTableHeaderCell>
                <CTableHeaderCell>操作</CTableHeaderCell>
              </CTableRow>
            </CTableHead>

            <CTableBody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <CTableRow key={record.id}>
                    <CTableDataCell>{record.roomId}</CTableDataCell>
                    <CTableDataCell>{record.filename}</CTableDataCell>
                    <CTableDataCell>{record.language}</CTableDataCell>
                    <CTableDataCell>
                      <CBadge color={record.status === 'success' ? 'success' : 'danger'}>
                        {record.status === 'success' ? '成功' : '失败'}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell>{record.exitCode}</CTableDataCell>
                    <CTableDataCell>{record.runTime}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="primary"
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewRecord(record)}
                      >
                        详情
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))
              ) : (
                <CTableRow>
                  <CTableDataCell colSpan={7} className="text-center text-body-secondary py-4">
                    暂无匹配运行记录，请调整搜索条件
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {/* 运行记录详情弹窗 */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>运行详情</CModalTitle>
        </CModalHeader>

        <CModalBody>
          {currentRecord && (
            <div className="small">
              <p>
                <strong>房间号：</strong>
                {currentRecord.roomId}
              </p>
              <p>
                <strong>文件名：</strong>
                {currentRecord.filename}
              </p>
              <p>
                <strong>运行语言：</strong>
                {currentRecord.language}
              </p>
              <p>
                <strong>运行状态：</strong>
                <CBadge color={currentRecord.status === 'success' ? 'success' : 'danger'}>
                  {currentRecord.status === 'success' ? '成功' : '失败'}
                </CBadge>
              </p>
              <p>
                <strong>退出码：</strong>
                {currentRecord.exitCode}
              </p>
              <p>
                <strong>执行耗时：</strong>
                {currentRecord.duration}
              </p>
              <p className="mb-0">
                <strong>运行时间：</strong>
                {currentRecord.runTime}
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

export default Runs
