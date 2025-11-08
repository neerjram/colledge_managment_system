import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('cms_token') || '')
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('cms_user')
    return raw ? JSON.parse(raw) : null
  })

  useEffect(() => {
    if (token) localStorage.setItem('cms_token', token)
    else localStorage.removeItem('cms_token')
  }, [token])

  useEffect(() => {
    if (user) localStorage.setItem('cms_user', JSON.stringify(user))
    else localStorage.removeItem('cms_user')
  }, [user])

  const login = (payload) => {
    setToken(payload.token)
    setUser(payload.user || { username: payload.username || 'admin' })
  }

  const logout = () => {
    setToken('')
    setUser(null)
  }

  const value = { token, user, isAuthenticated: !!token, login, logout }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


