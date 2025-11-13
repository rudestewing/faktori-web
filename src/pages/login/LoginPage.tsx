import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import RhfField from '@/components/atoms/RhfField'
import { ruleRequired } from '@/lib/form.lib'
import { Card } from 'antd'
import { useForm } from 'react-hook-form'

export default function LoginPage() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const {
    formState: { errors },
  } = form

  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto">
      <Card title="Login">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit(
              (v) => {
                console.log('Submit login', v)
              },
              (e) => {
                console.log('Error login', e)
              },
            )()
          }}
          className="flex flex-col gap-4"
        >
          <RhfField
            {...form}
            name="email"
            label="Email"
            rules={{
              required: ruleRequired('Email'),
            }}
            render={(c) => {
              return <Input {...c.field} />
            }}
            errorText={errors.email?.message}
          />
          <RhfField
            {...form}
            name="password"
            label="Password"
            rules={{
              required: ruleRequired('Password'),
            }}
            render={(c) => {
              return <Input.Password {...c.field} />
            }}
            errorText={errors.password?.message}
          />
          <Button
            block
            type="primary"
            htmlType="submit"
            onClick={() => {
              console.log('click')
            }}
          >
            Login
          </Button>
        </form>
      </Card>
    </div>
  )
}
