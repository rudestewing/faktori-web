'use client'

import React, { createContext, useContext, useEffect, useRef } from 'react'
import { App, notification, type NotificationArgsProps } from 'antd'

type NotifyFunction = (config: NotificationArgsProps) => void

const NotificationContext = createContext<{ notify: NotifyFunction } | null>(
  null,
)

export const useGlobalNotification = () => {
  const ctx = useContext(NotificationContext)
  if (!ctx)
    throw new Error(
      'useGlobalNotification must be used within NotificationProvider',
    )
  return ctx.notify
}

// 👇 Bagian penting: shared ref untuk global akses
let globalNotify: NotifyFunction | null = null

export const getGlobalNotify = () => globalNotify

export const callGlobalNotify = (options: NotificationArgsProps) => {
  const globalNotify = getGlobalNotify()
  if (!globalNotify) {
    console.warn('Notification not initialized yet')
    return
  }

  globalNotify({
    ...options,
  })
}

const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [api, contextHolder] = notification.useNotification()
  const apiRef = useRef(api)
  apiRef.current = api

  const notify: NotifyFunction = (config) => {
    apiRef.current.open(config)
  }

  // Set global notify function agar bisa dipanggil dari luar komponen
  useEffect(() => {
    globalNotify = notify
  }, [])

  return (
    <NotificationContext.Provider value={{ notify }}>
      <App className="h-full">
        {contextHolder}
        {children}
      </App>
    </NotificationContext.Provider>
  )
}

export default NotificationProvider
