'use client'

import { clearEmptyObjects } from '@/lib/object.lib'
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import {
  usePathname,
  useRouter as useRouterNavigation,
  useSearchParams,
} from 'next/navigation'

import QueryString from 'qs'

export default function useRouter() {
  const router = useRouterNavigation()
  const pathname = usePathname()

  const searchParams = useSearchParams()
  const query = (QueryString.parse(searchParams.toString()) || {}) as Record<
    string,
    any
  >

  const navigate = (
    { pathname, query = {} }: { pathname: string; query?: any },
    isReplace = false,
    navigateOptions?: NavigateOptions,
  ) => {
    const fullPath = [
      pathname,
      QueryString.stringify(clearEmptyObjects(query)),
    ].join('?')
    if (isReplace) {
      router.replace(fullPath, { ...navigateOptions, scroll: false })
    } else {
      router.push(fullPath, { ...navigateOptions, scroll: false })
    }
  }

  return {
    ...router,
    pathname,
    query,
    navigate,
  }
}
