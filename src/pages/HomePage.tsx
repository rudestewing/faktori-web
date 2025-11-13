import useRouter from '@/hooks/useRouter'
import { Alert, Checkbox, Input } from 'antd'

export default function HomePage() {
  const router = useRouter()

  console.log('router', router.pathname)
  return (
    <div>
      <h1>welcome home</h1>
      <Checkbox>hello</Checkbox>
      <Input />
      <Alert message="hello"></Alert>
      {Array.from({ length: 400 }).map((_, i) => (
        <p key={i}>
          This is some content to make the page scrollable. Line {i + 1}
        </p>
      ))}
    </div>
  )
}
