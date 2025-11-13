import { clearEmptyObjects } from '@/lib/object.lib'
import { useNavigate, useLocation } from 'react-router'
import QueryString from 'qs'

export default function useRouter() {
  const navigate = useNavigate()
  const location = useLocation()

  const pathname = location.pathname
  const query = (QueryString.parse(location.search.slice(1)) || {}) as Record<
    string,
    any
  >

  const navigateWithQuery = (
    { pathname, query = {} }: { pathname: string; query?: any },
    isReplace = false,
  ) => {
    const queryString = QueryString.stringify(clearEmptyObjects(query))
    const fullPath = queryString ? `${pathname}?${queryString}` : pathname

    navigate(fullPath, {
      replace: isReplace,
      preventScrollReset: true,
    })
  }

  const push = (path: string) => {
    navigate(path)
  }

  const replace = (path: string) => {
    navigate(path, { replace: true })
  }

  const back = () => {
    navigate(-1)
  }

  const forward = () => {
    navigate(1)
  }

  return {
    pathname,
    query,
    navigate: navigateWithQuery,
    push,
    replace,
    back,
    forward,
  }
}
