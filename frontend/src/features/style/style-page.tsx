import type { ReactNode } from 'react'

import { PageHeader } from '@/components/page-header'

import { ChartColors, ThemeColors } from './color-swatches'
import { ButtonSamples, CardSamples, InputSamples, TypeSamples } from './samples'

export function StylePage() {
  return (
    <>
      <PageHeader title="Style" />
      <div className="flex flex-col gap-10">
        <StyleSection title="Cards">
          <CardSamples />
        </StyleSection>
        <StyleSection title="Chart colors">
          <ChartColors />
        </StyleSection>
        <StyleSection title="Buttons">
          <ButtonSamples />
        </StyleSection>
        <StyleSection title="Inputs">
          <InputSamples />
        </StyleSection>
        <StyleSection title="Type">
          <TypeSamples />
        </StyleSection>
        <StyleSection title="Colors">
          <ThemeColors />
        </StyleSection>
      </div>
    </>
  )
}

function StyleSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
      {children}
    </section>
  )
}
