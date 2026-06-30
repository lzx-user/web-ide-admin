import React from 'react'
import {
  CBadge,
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
]

const Runs = () => {
  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>运行记录</strong>
        <span className="text-body-secondary ms-2">查看代码执行状态和退出码</span>
      </CCardHeader>

      <CCardBody>
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
            {records.map((record) => (
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