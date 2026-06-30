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

const files = [
  {
    id: 1,
    filename: 'src/App.jsx',
    type: 'JavaScript',
    roomId: 'react-room-001',
    size: '12KB',
    updateTime: '2026-06-30 11:12',
  },
  {
    id: 2,
    filename: 'src/components/Editor.jsx',
    type: 'JavaScript',
    roomId: 'react-room-001',
    size: '18KB',
    updateTime: '2026-06-30 10:58',
  },
  {
    id: 3,
    filename: 'src/index.css',
    type: 'CSS',
    roomId: 'demo-room-002',
    size: '6KB',
    updateTime: '2026-06-29 20:35',
  },
]

const Files = () => {
  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>文件管理</strong>
        <span className="text-body-secondary ms-2">查看 Web IDE 项目文件</span>
      </CCardHeader>

      <CCardBody>
        <CTable hover responsive align="middle">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>文件名</CTableHeaderCell>
              <CTableHeaderCell>类型</CTableHeaderCell>
              <CTableHeaderCell>所属房间</CTableHeaderCell>
              <CTableHeaderCell>大小</CTableHeaderCell>
              <CTableHeaderCell>最后更新时间</CTableHeaderCell>
              <CTableHeaderCell>操作</CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          <CTableBody>
            {files.map((file) => (
              <CTableRow key={file.id}>
                <CTableDataCell>{file.filename}</CTableDataCell>
                <CTableDataCell>
                  <CBadge color={file.type === 'CSS' ? 'info' : 'primary'}>{file.type}</CBadge>
                </CTableDataCell>
                <CTableDataCell>{file.roomId}</CTableDataCell>
                <CTableDataCell>{file.size}</CTableDataCell>
                <CTableDataCell>{file.updateTime}</CTableDataCell>
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

export default Files