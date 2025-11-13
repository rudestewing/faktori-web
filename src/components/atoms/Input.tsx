import { Input as BaseInput } from 'antd'
import type { InputProps } from 'antd'

type Props = InputProps & {}

const Input = ({ ...props }: Props) => {
  return <BaseInput {...props} />
}
const Password = ({ ...props }: Props) => {
  return <BaseInput.Password {...props} />
}

Input.Password = Password

export default Input
