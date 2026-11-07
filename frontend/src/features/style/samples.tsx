import { useId, type ComponentProps } from 'react'
import { Ellipsis, Plus, TrendingDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const receiptItems = [
  { name: 'Milk', category: 'Groceries', slot: 1, amount: '€1.29' },
  { name: 'Bread', category: 'Groceries', slot: 1, amount: '€2.49' },
  { name: 'Shampoo', category: 'Personal care', slot: 2, amount: '€3.99' },
  { name: 'Batteries', category: 'Household', slot: 3, amount: '€7.09' },
]

const typeSamples = [
  { label: 'Amount · 36', text: '€1,284.50', className: 'text-4xl font-semibold tracking-tight' },
  { label: 'Heading · 20', text: 'Spending by category', className: 'font-heading text-xl font-semibold tracking-tight' },
  { label: 'Body · 14', text: 'One receipt can hold many items.', className: 'text-sm' },
  { label: 'Caption · 12', text: 'Today, 18:42', className: 'text-xs text-muted-foreground' },
]

export function CardSamples() {
  return (
    <div className="grid items-start gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardDescription>Spent this month</CardDescription>
          <CardTitle className="text-4xl font-semibold tracking-tight">€1,284.50</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="flex items-center gap-1.5 text-sm font-medium text-success">
            <TrendingDown className="size-4" aria-hidden />
            12% less than last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lidl</CardTitle>
          <CardDescription>Today, 18:42 · 4 items</CardDescription>
          <CardAction>
            <Button variant="ghost" size="icon-sm" aria-label="More">
              <Ellipsis />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col divide-y">
            {receiptItems.map((item) => (
              <li key={item.name} className="flex items-center gap-3 py-2.5">
                <span
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: `var(--chart-${item.slot})` }}
                  aria-hidden
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate">{item.name}</span>
                  <span className="block text-xs text-muted-foreground">{item.category}</span>
                </span>
                <span className="tabular-nums">{item.amount}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="justify-between">
          <span className="text-muted-foreground">Total</span>
          <span className="font-semibold tabular-nums">€14.86</span>
        </CardFooter>
      </Card>
    </div>
  )
}

export function ButtonSamples() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Delete</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="lg">
          <Plus data-icon="inline-start" />
          Add purchase
        </Button>
        <Button size="sm">Small</Button>
        <Button variant="outline" size="icon" aria-label="Add">
          <Plus />
        </Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>
  )
}

export function InputSamples() {
  return (
    <Card>
      <CardContent className="grid gap-5 md:grid-cols-2">
        <Field label="Store" placeholder="Lidl" />
        <Field label="Amount" inputMode="decimal" placeholder="0.00" />
        <Field label="Amount" inputMode="decimal" defaultValue="1,2,9" error="Enter an amount like 1.29" />
        <Field label="Currency" defaultValue="EUR" disabled />
      </CardContent>
    </Card>
  )
}

type FieldProps = ComponentProps<typeof Input> & {
  label: string
  error?: string
}

function Field({ label, error, ...inputProps }: FieldProps) {
  const id = useId()
  const errorId = `${id}-error`

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...inputProps}
      />
      {error && (
        <p id={errorId} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

export function TypeSamples() {
  return (
    <ul className="flex flex-col gap-4">
      {typeSamples.map((sample) => (
        <li key={sample.label} className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">{sample.label}</span>
          <span className={sample.className}>{sample.text}</span>
        </li>
      ))}
    </ul>
  )
}
