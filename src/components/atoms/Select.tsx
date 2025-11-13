import { Select as SelectBase } from 'antd'
import type { SelectProps } from 'antd'

type Props = SelectProps & {}

export default function Select({ ...props }: Props) {
  return <SelectBase {...props} />
}
