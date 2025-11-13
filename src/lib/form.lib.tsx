import TextError from '@/components/ui/TextError'
import { type FieldErrors } from 'react-hook-form'
import { type FieldValues } from 'react-hook-form'

export const renderErrorText = (message?: string) => {
  if (message) {
    return <TextError>{message}</TextError>
  }

  return null
}

export const ruleRequired = (fieldName: string) => {
  return `${fieldName} is required!`
}

export const required = (fieldLabel: string) => {
  return { required: `${fieldLabel} is required!` }
}

export const scrollToFirstErrorRHFSubmit = <T extends FieldValues>(
  errors: FieldErrors<T>,
) => {
  const firstError = Object.keys(errors)[0]
  const element = document.querySelector(`[name="${firstError}"]`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    ;(element as HTMLInputElement).focus()
  }
}
