import { useEffect } from 'react'
import { useRouter } from 'next/router'

/*
 * This redirects all 404s to the test API route.
 */
export default function Redirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/api/test')
  })

  return null
}
