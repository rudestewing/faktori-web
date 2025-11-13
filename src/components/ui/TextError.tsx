import { type ReactNode } from 'react'

export default function TextError({ children }: { children: ReactNode }) {
  return <span className="block text-red-500">{children}</span>
}
