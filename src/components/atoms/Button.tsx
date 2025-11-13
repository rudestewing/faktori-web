import { Button as BaseButton, type ButtonProps } from 'antd'

type Props = ButtonProps & {}

export default function Button({ ...props }: Props) {
  return <BaseButton {...props} />
}
