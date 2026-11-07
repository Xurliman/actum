import { createBrowserRouter, Navigate } from 'react-router'

import { AppLayout } from '@/components/layout/app-layout'
import { DashboardPage } from '@/features/dashboard/dashboard-page'
import { PurchasesPage } from '@/features/purchases/purchases-page'
import { SettingsPage } from '@/features/settings/settings-page'
import { StylePage } from '@/features/style/style-page'

export const router = createBrowserRouter([
  {
    Component: AppLayout,
    children: [
      { index: true, Component: DashboardPage },
      { path: 'purchases', Component: PurchasesPage },
      { path: 'settings', Component: SettingsPage },
      { path: 'style', Component: StylePage },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])
