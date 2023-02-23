import { useEffect, useState } from 'react'
import { isMatchBreakpoint } from '../utils'

export function usePlatform(breakpoint = null) {
 const getPlatform = () =>
  isMatchBreakpoint(breakpoint) ? 'mobile' : 'desktop'

  const [platform, setPlatform] = useState('desktop')
  
 useEffect(() => {
  setPlatform(getPlatform())
  const listener = () => setPlatform(getPlatform())
  window.addEventListener('resize', listener)

  return () => {
   removeEventListener('resize', listener)
  }
 }, [])

 return platform
}
