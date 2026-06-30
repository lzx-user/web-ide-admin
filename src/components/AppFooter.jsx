import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      {/* 左侧：项目名称和说明 */}
      <div>
        <span className="fw-semibold">Web IDE 项目管理后台</span>
        <span className="ms-2 text-body-secondary">
          用于管理多人协作 Web IDE 的用户、房间、文件和运行记录
        </span>
      </div>

      {/* 右侧：开发说明 */}
      <div className="ms-auto text-body-secondary">React + Vite + CoreUI</div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
