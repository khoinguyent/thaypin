"use client"

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { Toast, ToastContainer } from './toast'

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => void
  showSuccess: (title: string, description?: string) => void
  showError: (title: string, description?: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

interface ToastProviderProps {
  children: ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast: Toast = {
      ...toast,
      id,
    }
    
    setToasts((prev) => [...prev, newToast])
  }, [])

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    addToast(toast)
  }, [addToast])

  const showSuccess = useCallback((title: string, description?: string) => {
    showToast({
      type: 'success',
      title,
      description,
      duration: 5000,
    })
  }, [showToast])

  const showError = useCallback((title: string, description?: string) => {
    showToast({
      type: 'error',
      title,
      description,
      duration: 7000, // Error messages stay longer
    })
  }, [showToast])

  const value: ToastContextType = {
    showToast,
    showSuccess,
    showError,
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
