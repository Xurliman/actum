type PageHeaderProps = {
  title: string
}

export function PageHeader({ title }: PageHeaderProps) {
  return (
    <header className="mb-6">
      <h1 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">{title}</h1>
    </header>
  )
}
