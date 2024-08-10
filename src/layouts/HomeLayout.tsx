import { useAuthStore } from '@/stores'
import { Layout, theme } from 'antd'
import { Content } from 'antd/es/layout/layout'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Sidebar, LayoutHeader } from '.'

export const HomeLayout: React.FunctionComponent = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const loggedIn = useAuthStore((state) => state.loggedIn)

  return !loggedIn ? (
    <Navigate to='/auth/login' replace />
  ) : (
    <Layout style={{ minHeight: '100vh' }}>
      <LayoutHeader />
      <Layout
        style={{
          background: colorBgContainer
        }}
      >
        <Sidebar />
        <Content style={{ margin: 24 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
