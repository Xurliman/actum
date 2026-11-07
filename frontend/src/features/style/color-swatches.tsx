import { TrendingDown, TrendingUp } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

const themeColorNames = [
  'background',
  'card',
  'primary',
  'secondary',
  'muted',
  'accent',
  'border',
  'destructive',
  'success',
]

const chartSlots = [
  { slot: 1, share: 26 },
  { slot: 2, share: 19 },
  { slot: 3, share: 15 },
  { slot: 4, share: 12 },
  { slot: 5, share: 10 },
  { slot: 6, share: 8 },
  { slot: 7, share: 6 },
  { slot: 8, share: 4 },
]

export function ThemeColors() {
  return (
    <ul className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-9">
      {themeColorNames.map((name) => (
        <li key={name} className="flex flex-col gap-1.5">
          <span
            className="h-12 rounded-lg ring-1 ring-foreground/10"
            style={{ backgroundColor: `var(--${name})` }}
          />
          <span className="text-xs text-muted-foreground">{name}</span>
        </li>
      ))}
    </ul>
  )
}

export function ChartColors() {
  return (
    <Card>
      <CardContent className="flex flex-col gap-5">
        <div className="flex h-4 gap-0.5" aria-hidden>
          {chartSlots.map(({ slot, share }) => (
            <span
              key={slot}
              className="first:rounded-l-full last:rounded-r-full"
              style={{ flexGrow: share, backgroundColor: `var(--chart-${slot})` }}
            />
          ))}
        </div>

        <ul className="grid grid-cols-4 gap-x-3 gap-y-4 md:grid-cols-8">
          {chartSlots.map(({ slot }) => (
            <li key={slot} className="flex flex-col gap-1.5">
              <span className="h-10 rounded-md" style={{ backgroundColor: `var(--chart-${slot})` }} />
              <span className="text-xs text-muted-foreground">chart-{slot}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
          <span className="flex items-center gap-1.5 text-success">
            <TrendingDown className="size-4" aria-hidden />
            12% less than last month
          </span>
          <span className="flex items-center gap-1.5 text-destructive">
            <TrendingUp className="size-4" aria-hidden />
            8% more than last month
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
