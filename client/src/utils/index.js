export const isMatchBreakpoint = (breakpoint) =>
 typeof window !== 'undefined' &&
 window.matchMedia(`(max-width: ${breakpoint || MOBILE_SCREEN}px)`).matches
