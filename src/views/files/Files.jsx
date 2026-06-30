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

// mock 文件数据：模拟 Web IDE 中不同房间的项目文件
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
  {
    id: 4,
    filename: 'package.json',
    type: 'JSON',
    roomId: 'interview-demo',
    size: '4KB',
    updateTime: '2026-06-30 09:12',
  },
]

const Files = () => {
  const [keyword, setKeyword] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')

  // 根据文件名 / 房间号 / 文件类型筛选
  const filteredFiles = useMemo(() => {
    return files.filter((file) => {
      const matchKeyword =
        file.filename.toLowerCase().includes(keyword.toLowerCase()) ||
        file.roomId.toLowerCase().includes(keyword.toLowerCase())

      const matchType = typeFilter === 'all' || file.type === typeFilter

      return matchKeyword && matchType
    })
  }, [keyword, typeFilter])

  // 根据文件类型显示不同颜色标签
  const getTypeColor = (type) => {
    if (type === 'JavaScript') return 'primary'
    if (type === 'CSS') return 'info'
    if (type === 'JSON') return 'success'
    return 'secondary'
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>文件管理</strong>
        <span className="text-body-secondary ms-2">查看 Web IDE 项目文件、类型和更新时间</span>
      </CCardHeader>

      <CCardBody>
        <CRow className="mb-3">
          <CCol md={6}>
            <CFormInput
              placeholder="搜索文件名或房间号，例如 App.jsx / react-room-001"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </CCol>

          <CCol md={3}>
            <CFormSelect value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="all">全部类型</option>
              <option value="JavaScript">JavaScript</option>
              <option value="CSS">CSS</option>
              <option value="JSON">JSON</option>
            </CFormSelect>
          </CCol>

          <CCol md={3} className="d-flex align-items-center text-body-secondary">
            当前共 {filteredFiles.length} 个文件
          </CCol>
        </CRow>

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
            {filteredFiles.map((file) => (
              <CTableRow key={file.id}>
                <CTableDataCell>{file.filename}</CTableDataCell>
                <CTableDataCell>
                  <CBadge color={getTypeColor(file.type)}>{file.type}</CBadge>
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
