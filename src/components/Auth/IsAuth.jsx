'use client'
import { isAuthenticated } from '@/utils/Auth/isAuthenticated'
import { useEffect } from 'react'
import { redirect } from 'next/navigation'

export default function isAuth(Component) {
  return function IsAuth(props) {
    const auth = isAuthenticated

    useEffect(() => {
      if (!auth) {
        return redirect('/')
      }
    }, [])

    if (!auth) {
      return null
    }

    if (typeof window !== undefined) {
      return <Component {...props} />
    }
  }
}
