import { NavLink } from 'react-router'

import { cn } from '@/lib/utils'

import { navItems } from './nav-items'

export function BottomTabBar() {
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
    >
      <ul className="grid grid-cols-3">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'group flex h-16 flex-col items-center justify-center gap-1 text-xs font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset',
                  isActive ? 'text-foreground' : 'text-muted-foreground',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={cn(
                      'flex h-7 w-14 items-center justify-center rounded-full transition-colors',
                      isActive ? 'bg-accent' : 'group-active:bg-accent/60',
                    )}
                  >
                    <item.icon className="size-5" strokeWidth={isActive ? 2.25 : 1.75} aria-hidden />
                  </span>
                  {item.label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
