import { ChartPie, ReceiptText, Settings, type LucideIcon } from 'lucide-react'

export type NavItem = {
  to: string
  label: string
  icon: LucideIcon
  end?: boolean
}

export const navItems: NavItem[] = [
  { to: '/', label: 'Dashboard', icon: ChartPie, end: true },
  { to: '/purchases', label: 'Purchases', icon: ReceiptText },
  { to: '/settings', label: 'Settings', icon: Settings },
]
