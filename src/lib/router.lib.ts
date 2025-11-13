import useRouter from '@/hooks/useRouter'
import { safeBase64Decode, safeBase64Encode } from '@/lib/encoder.lib'

export const redirectWithOriginUrl = (to: string, query = {}) => {
  const { pathname, search, hash } = window.location
  const asPath = `${pathname}${search}${hash}`

  const newQuery = new URLSearchParams({
    ...query,
    originUrl: safeBase64Encode(asPath),
  }).toString()

  if (window !== undefined) {
    window.location.href = `${to}?${newQuery}`
  }
}

export const redirectToOriginUrl = (
  router: ReturnType<typeof useRouter>,
  fallback = '/',
) => {
  if (!router.query?.originUrl) {
    window.location.href = fallback
  }

  const pathname = safeBase64Decode(router?.query?.originUrl as string)

  router.navigate({
    pathname: pathname === '/login' ? '' : pathname,
  })
}
