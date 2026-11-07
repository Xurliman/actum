import { Outlet, ScrollRestoration } from 'react-router'

import { BottomTabBar } from './bottom-tab-bar'
import { SideNav } from './side-nav'

export function AppLayout() {
  return (
    <div className="flex min-h-dvh">
      <SideNav />

      {/* On phone the bottom padding leaves room for the tab bar (h-16) and the home indicator. */}
      <main className="min-w-0 flex-1 px-4 pt-[calc(env(safe-area-inset-top)+1.5rem)] pb-[calc(env(safe-area-inset-bottom)+5.5rem)] md:px-8 md:pt-8 md:pb-8">
        <div className="mx-auto w-full max-w-5xl">
          <Outlet />
        </div>
      </main>

      <BottomTabBar />
      <ScrollRestoration />
    </div>
  )
}
