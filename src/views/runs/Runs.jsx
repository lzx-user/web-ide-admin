import React, { useMemo, useState } from 'react'
import {
  CBadge,
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

// mock 运行记录：对应主项目中的代码运行结果
const records = [
  {
    id: 1,
    roomId: 'react-room-001',
    filename: 'index.js',
    language: 'JavaScript',
    status: 'success',
    exitCode: 0,
    runTime: '2026-06-30 11:25',
  },
  {
    id: 2,
    roomId: 'react-room-001',
    filename: 'test.js',
    language: 'JavaScript',
    status: 'failed',
    exitCode: 1,
    runTime: '2026-06-30 10:40',
  },
  {
    id: 3,
    roomId: 'demo-room-002',
    filename: 'main.js',
    language: 'JavaScript',
    status: 'success',
    exitCode: 0,
    runTime: '2026-06-29 21:30',
  },
  {
    id: 4,
    roomId: 'interview-demo',
    filename: 'demo.js',
    language: 'JavaScript',
    status: 'failed',
    exitCode: 1,
    runTime: '2026-06-30 09:12',
  },
]

const Runs = () => {
  const [keyword, setKeyword] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // 根据房间号 / 文件名 / 运行状态筛选
  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const matchKeyword =
        record.roomId.toLowerCase().includes(keyword.toLowerCase()) ||
        record.filename.toLowerCase().includes(keyword.toLowerCase())

      const matchStatus = statusFilter === 'all' || record.status === statusFilter

      return matchKeyword && matchStatus
    })
  }, [keyword, statusFilter])

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>运行记录</strong>
        <span className="text-body-secondary ms-2">查看代码执行状态、退出码和运行时间</span>
      </CCardHeader>

      <CCardBody>
        <CRow className="mb-3">
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

          <CCol md={3} className="d-flex align-items-center text-body-secondary">
            当前共 {filteredRecords.length} 条记录
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
            </CTableRow>
          </CTableHead>

          <CTableBody>
            {filteredRecords.map((record) => (
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
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default Runs
