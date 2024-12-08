'use client'
import { Toaster } from "@/components/ui/sonner"
import React from 'react'

const Provider = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            {children}
            <Toaster />
        </div>
    )
}

export default Provider
