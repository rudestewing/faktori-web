import { type NotificationArgsProps } from 'antd'
import { AxiosError } from 'axios'
import NotificationDescription from '@/components/ui/NotificationDescription'
import { callGlobalNotify } from '@/components/providers/NotificationProvider'

export const MESSAGE_SUCCESS = 'Process Success!'
export const MESSAGE_FAILED = 'Process Failed'

export const notify = {
  success: (args: NotificationArgsProps) => {
    return callGlobalNotify({ ...args, type: 'success' })
  },
  error: (args: NotificationArgsProps) => {
    return callGlobalNotify({ ...args, type: 'error' })
  },
  info: (args: NotificationArgsProps) => {
    return callGlobalNotify({ ...args, type: 'info' })
  },
  warning: (args: NotificationArgsProps) => {
    return callGlobalNotify({ ...args, type: 'warning' })
  },
  open: (args: NotificationArgsProps) => {
    return callGlobalNotify(args)
  },
}

export const notifyErrorApi = (error: any) => {
  if (error instanceof AxiosError) {
    const errorResponseData = error?.response?.data || {}

    const { data, message = '', error: errorData = '' } = errorResponseData

    let messages: string[] = []

    if (data) {
      if (Array.isArray(data)) {
        messages = [message, ...data]
      }
      if (typeof data === 'string') {
        messages = [message, data]
      }
    }

    if (errorData) {
      if (typeof errorData === 'string') {
        messages.push(errorData)
      }
    }

    notify.error({
      message: error?.message,
      description:
        messages.length > 0 ? (
          <NotificationDescription data={messages.filter((i) => !!i)} />
        ) : (
          message || MESSAGE_FAILED
        ),
    })
  } else {
    notify.error({
      message: error?.message,
      description: error?.response?.data?.message || MESSAGE_FAILED,
    })
  }
}

export const notifySuccessApi = (responseData?: any) => {
  notify.success({
    message: responseData?.message || MESSAGE_SUCCESS,
  })
}
