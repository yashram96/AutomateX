export default defineNuxtRouteMiddleware((to) => {
  const user = useState('user')
  
  // If user is not logged in and trying to access a protected route
  if (!user.value && to.path !== '/' && !to.path.startsWith('/auth/')) {
    return navigateTo('/auth/login')
  }
})