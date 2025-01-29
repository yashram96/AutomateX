export default defineNuxtRouteMiddleware((to) => {
  const { validateSession } = useAuth()
  
  // Public routes that don't require auth
  const publicRoutes = ['/', '/auth/login', '/auth/signup']
  
  // Skip auth check for public routes
  if (publicRoutes.includes(to.path)) {
    return
  }

  // For protected routes, validate the session
  if (process.client) {
    const isValid = validateSession()
    if (!isValid) {
      return navigateTo('/auth/login')
    }
  }
})
