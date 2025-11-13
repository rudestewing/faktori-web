import useRouter from '@/hooks/useRouter'
import { Alert, Checkbox, Input } from 'antd'

export default function HomePage() {
  const router = useRouter()

  console.log('router', router.pathname)
  return (
    <div>
      <h1>welcome home</h1>
    </div>
  )
}
