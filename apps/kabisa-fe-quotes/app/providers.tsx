'use client';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import React from "react";

interface ProviderProps {
  children: React.ReactNode
}

export default function Providers({children}: ProviderProps) {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
