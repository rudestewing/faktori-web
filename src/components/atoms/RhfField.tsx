import { Col, type ColProps, Row } from 'antd'
import {
  Controller,
  type ControllerProps,
  type FieldValues,
} from 'react-hook-form'
import FormLabel from './FormLabel'
import { renderErrorText } from '@/lib/form.lib'

export interface RhfFieldProps<T extends object> extends ControllerProps<T> {
  label?: string
  labelSpan?: ColProps
  fieldSpan?: ColProps
  errorText?: any
}

export default function RhfField<T extends FieldValues>({
  label,
  labelSpan = { span: 24 },
  fieldSpan = { span: 24 },
  errorText,
  ...restProps
}: RhfFieldProps<T>) {
  const { rules } = restProps

  return (
    <Row>
      {label && (
        <Col {...labelSpan}>
          <FormLabel>
            {label}
            {rules?.required ? '*' : null}
          </FormLabel>
        </Col>
      )}
      <Col {...fieldSpan}>
        <Controller {...restProps} />
        {errorText && renderErrorText(errorText)}
      </Col>
    </Row>
  )
}
