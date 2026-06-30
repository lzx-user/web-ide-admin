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
// mock 文件数据
// 模拟 Web IDE 中不同房间的项目文件
// ===============================
const files = [
  {
    id: 1,
    filename: 'src/App.jsx',
    type: 'JavaScript',
    roomId: 'react-room-001',
    size: '12KB',
    updateTime: '2026-06-30 11:12',
    owner: 'Amanda',
  },
  {
    id: 2,
    filename: 'src/components/Editor.jsx',
    type: 'JavaScript',
    roomId: 'react-room-001',
    size: '18KB',
    updateTime: '2026-06-30 10:58',
    owner: 'Tom',
  },
  {
    id: 3,
    filename: 'src/index.css',
    type: 'CSS',
    roomId: 'demo-room-002',
    size: '6KB',
    updateTime: '2026-06-29 20:35',
    owner: 'Lucy',
  },
  {
    id: 4,
    filename: 'package.json',
    type: 'JSON',
    roomId: 'interview-demo',
    size: '4KB',
    updateTime: '2026-06-30 09:12',
    owner: 'Tom',
  },
]

const Files = () => {
  const [keyword, setKeyword] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [visible, setVisible] = useState(false)
  const [currentFile, setCurrentFile] = useState(null)

  // 根据文件名、房间号、文件类型筛选数据
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

  const handleViewFile = (file) => {
    setCurrentFile(file)
    setVisible(true)
  }

  const handleReset = () => {
    setKeyword('')
    setTypeFilter('all')
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>文件管理</strong>
          <span className="text-body-secondary ms-2">查看 Web IDE 项目文件、类型和更新时间</span>
        </CCardHeader>

        <CCardBody>
          {/* 搜索和筛选区域 */}
          <CRow className="mb-3 g-2">
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

            <CCol md={3} className="d-flex gap-2 align-items-center">
              <CButton color="secondary" variant="outline" onClick={handleReset}>
                重置
              </CButton>

              <span className="text-body-secondary small">
                当前共 {filteredFiles.length} 个文件
              </span>
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
              {filteredFiles.length > 0 ? (
                filteredFiles.map((file) => (
                  <CTableRow key={file.id}>
                    <CTableDataCell>{file.filename}</CTableDataCell>
                    <CTableDataCell>
                      <CBadge color={getTypeColor(file.type)}>{file.type}</CBadge>
                    </CTableDataCell>
                    <CTableDataCell>{file.roomId}</CTableDataCell>
                    <CTableDataCell>{file.size}</CTableDataCell>
                    <CTableDataCell>{file.updateTime}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="primary"
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewFile(file)}
                      >
                        查看
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))
              ) : (
                <CTableRow>
                  <CTableDataCell colSpan={6} className="text-center text-body-secondary py-4">
                    暂无匹配文件，请调整搜索条件
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {/* 文件详情弹窗 */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>文件详情</CModalTitle>
        </CModalHeader>

        <CModalBody>
          {currentFile && (
            <div className="small">
              <p>
                <strong>文件名：</strong>
                {currentFile.filename}
              </p>
              <p>
                <strong>文件类型：</strong>
                <CBadge color={getTypeColor(currentFile.type)}>{currentFile.type}</CBadge>
              </p>
              <p>
                <strong>所属房间：</strong>
                {currentFile.roomId}
              </p>
              <p>
                <strong>文件大小：</strong>
                {currentFile.size}
              </p>
              <p>
                <strong>最近修改人：</strong>
                {currentFile.owner}
              </p>
              <p className="mb-0">
                <strong>最后更新时间：</strong>
                {currentFile.updateTime}
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

export default Files
