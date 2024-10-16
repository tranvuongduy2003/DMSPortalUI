import { useAppStore, useAuthStore } from '@/stores'
import { Layout, Spin, theme } from 'antd'
import { Content } from 'antd/es/layout/layout'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Sidebar, LayoutHeader } from '.'
import { AUTH_ROUTE } from '@/constants/routes'

export const HomeLayout: React.FunctionComponent = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const loggedIn = useAuthStore((state) => state.loggedIn)
  const loading = useAppStore((state) => state.isLoading)

  return !loggedIn ? (
    <Navigate to={`/${AUTH_ROUTE}/login`} replace />
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
          <Spin spinning={loading} size='large'>
            <Outlet />
          </Spin>
        </Content>
      </Layout>
    </Layout>
  )
}
