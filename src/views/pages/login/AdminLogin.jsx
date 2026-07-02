import React, { useState } from 'react'
import { CAlert, CButton, CCard, CCardBody, CCol, CFormInput, CRow, CSpinner } from '@coreui/react'
import { adminLogin } from '../../../api/admin'

const AdminLogin = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setErrorMsg('')

    try {
      // 调用后端管理员登录接口
      // 后端地址实际是：http://localhost:3000/api/admin/login
      const res = await adminLogin({
        username,
        password,
      })

      if (res.success) {
        // 保存管理员 token
        // 后面请求 /api/admin/overview、/api/admin/users 等接口时，
        // request.js 会自动把这个 token 放到 Authorization 请求头里。
        localStorage.setItem('admin_token', res.token)

        // 通知外层布局：登录成功，可以进入后台页面
        onLoginSuccess?.()
        return
      }

      setErrorMsg(res.message || '登录失败')
    } catch (err) {
      setErrorMsg(err.message || '管理员登录失败，请检查后端是否启动')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center bg-body-tertiary">
      <CRow className="justify-content-center w-100">
        <CCol md={5} lg={4}>
          <CCard className="shadow-sm">
            <CCardBody className="p-4">
              <h3 className="mb-2">Web IDE 管理后台</h3>

              <p className="text-body-secondary mb-4">
                请使用管理员账号登录后查看用户、房间、文件和运行记录。
              </p>

              {errorMsg && (
                <CAlert color="danger" className="py-2">
                  {errorMsg}
                </CAlert>
              )}

              <form onSubmit={handleSubmit} autoComplete="off">
                <CFormInput
                  className="mb-3"
                  label="管理员账号"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  autoComplete="off"
                />

                <CFormInput
                  className="mb-4"
                  label="管理员密码"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="admin123456"
                  autoComplete="new-password"
                />

                <CButton color="primary" type="submit" className="w-100" disabled={loading}>
                  {loading ? (
                    <>
                      <CSpinner size="sm" className="me-2" />
                      登录中...
                    </>
                  ) : (
                    '登录管理后台'
                  )}
                </CButton>
              </form>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default AdminLogin
