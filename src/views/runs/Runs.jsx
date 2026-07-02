import React, { useEffect, useMemo, useRef, useState } from 'react'
import { getAdminRuns } from '../../api/admin'
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

const Runs = () => {
  const [keyword, setKeyword] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [visible, setVisible] = useState(false)
  const [currentRecord, setCurrentRecord] = useState(null)
  const [records, setRecords] = useState([])

  // 缓存上一次接口返回的数据，用来判断是否真的发生变化
  const recordsCacheRef = useRef('')

  const loadRuns = async () => {
    try {
      const res = await getAdminRuns({
        page: 1,
        pageSize: 100,
        status: 'all',
      })

      if (!res.success) return

      const nextRecords = res.data?.list || []
      const nextCache = JSON.stringify(nextRecords)

      // 数据没有变化，就不 setState，避免无意义重新渲染
      if (recordsCacheRef.current === nextCache) {
        return
      }

      recordsCacheRef.current = nextCache
      setRecords(nextRecords)
    } catch (err) {
      console.log('加载运行记录失败:', err)
    }
  }

  useEffect(() => {
    loadRuns()

    const timer = setInterval(() => {
      loadRuns()
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const lowerKeyword = keyword.toLowerCase()

      const matchKeyword =
        String(record.roomId || '')
          .toLowerCase()
          .includes(lowerKeyword) ||
        String(record.filename || '')
          .toLowerCase()
          .includes(lowerKeyword)

      const matchStatus = statusFilter === 'all' || record.status === statusFilter

      return matchKeyword && matchStatus
    })
  }, [records, keyword, statusFilter])

  const handleViewRecord = (record) => {
    setCurrentRecord(record)
    setVisible(true)
  }

  const handleReset = () => {
    setKeyword('')
    setStatusFilter('all')
  }

  const getStatusBadge = (status) => {
    if (status === 'success') {
      return <CBadge color="success">成功</CBadge>
    }

    if (status === 'failed') {
      return <CBadge color="danger">失败</CBadge>
    }

    return <CBadge color="secondary">未知</CBadge>
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>运行记录</strong>
          <span className="text-body-secondary ms-2">
            查看代码执行状态、退出码、运行耗时和运行时间
          </span>
          <span className="text-body-secondary small ms-2">
            数据每 3 秒检测一次，仅在有变化时更新页面
          </span>
        </CCardHeader>

        <CCardBody>
          <CRow className="mb-3 g-2">
            <CCol md={6}>
              <CFormInput
                placeholder="搜索房间号或文件名，例如 test-room-001 / index.js"
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
              <CButton color="primary" variant="outline" onClick={loadRuns}>
                刷新
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
                <CTableHeaderCell>耗时</CTableHeaderCell>
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
                    <CTableDataCell>{getStatusBadge(record.status)}</CTableDataCell>
                    <CTableDataCell>{record.exitCode}</CTableDataCell>
                    <CTableDataCell>{record.duration || '-'}</CTableDataCell>
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
                  <CTableDataCell colSpan={8} className="text-center text-body-secondary py-4">
                    暂无匹配运行记录，请调整搜索条件
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>运行记录详情</CModalTitle>
        </CModalHeader>

        <CModalBody>
          {currentRecord ? (
            <div className="small">
              <div className="mb-3">
                <div className="text-body-secondary">房间号</div>
                <div className="fw-semibold">{currentRecord.roomId}</div>
              </div>

              <div className="mb-3">
                <div className="text-body-secondary">执行用户</div>
                <div className="fw-semibold">{currentRecord.username || '-'}</div>
              </div>

              <div className="mb-3">
                <div className="text-body-secondary">文件名</div>
                <div className="fw-semibold">{currentRecord.filename}</div>
              </div>

              <div className="mb-3">
                <div className="text-body-secondary">语言</div>
                <div className="fw-semibold">{currentRecord.language || 'JavaScript'}</div>
              </div>

              <div className="mb-3">
                <div className="text-body-secondary">运行状态</div>
                <div>{getStatusBadge(currentRecord.status)}</div>
              </div>

              <div className="mb-3">
                <div className="text-body-secondary">退出码</div>
                <div className="fw-semibold">{currentRecord.exitCode}</div>
              </div>

              <div className="mb-3">
                <div className="text-body-secondary">运行耗时</div>
                <div className="fw-semibold">{currentRecord.duration || '-'}</div>
              </div>

              <div className="mb-0">
                <div className="text-body-secondary">运行时间</div>
                <div className="fw-semibold">{currentRecord.runTime}</div>
              </div>
            </div>
          ) : (
            <div className="text-body-secondary">暂无详情数据</div>
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
