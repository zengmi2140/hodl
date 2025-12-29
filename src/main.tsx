import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App'
import './index.css'
import './i18n'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<div className="loading-screen">Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          {/* 重定向旧的 /multisig 路由到首页 */}
          <Route path="/multisig" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>,
)
