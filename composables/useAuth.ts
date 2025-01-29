export const useAuth = () => {
  const user = useState('user', () => null)
  const token = useState('token', () => null)

  // Generate a random token
  const generateToken = () => {
    return 'tk_' + Math.random().toString(36).substring(2) + Date.now().toString(36)
  }

  const isLoggedIn = computed(() => {
    if (process.client) {
      const storedToken = localStorage.getItem('auth_token')
      return !!storedToken && storedToken === token.value
    }
    return false
  })

  const setUser = (userData: any) => {
    if (process.client) {
      // Generate and store new token
      const newToken = generateToken()
      localStorage.setItem('auth_token', newToken)
      token.value = newToken

      // Store user data
      const userWithTimestamp = {
        ...userData,
        loginTime: new Date().toISOString()
      }
      localStorage.setItem('user_data', JSON.stringify(userWithTimestamp))
      user.value = userWithTimestamp
    }
  }

  const clearUser = () => {
    if (process.client) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
      token.value = null
      user.value = null
    }
  }

  const validateSession = () => {
    if (process.client) {
      const storedToken = localStorage.getItem('auth_token')
      console.log('Validating session, token:', storedToken)
      const storedUser = localStorage.getItem('user_data')
      console.log('Stored user data:', storedUser)

      if (!storedToken || !storedUser) {
        console.log('No token or user data found')
        clearUser()
        return false
      }

      try {
        const userData = JSON.parse(storedUser)
        console.log('Parsed user data:', userData)
        const loginTime = new Date(userData.loginTime).getTime()
        const currentTime = new Date().getTime()
        const hoursSinceLogin = (currentTime - loginTime) / (1000 * 60 * 60)

        // Invalidate session if it's older than 24 hours
        if (hoursSinceLogin > 24) {
          console.log('Session expired')
          clearUser()
          return false
        }

        token.value = storedToken
        user.value = userData
        console.log('Session validated successfully')
        return true
      } catch (error) {
        console.error('Error validating session:', error)
        clearUser()
        return false
      }
    }
    return false
  }

  return {
    user,
    isLoggedIn,
    setUser,
    clearUser,
    validateSession
  }
}
