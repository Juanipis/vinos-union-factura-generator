import type { ReactNode } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

type ControlSectionProps = {
  title: string
  children: ReactNode
}

export function ControlSection({ title, children }: ControlSectionProps) {
  return (
    <Card className="border-slate-700 bg-slate-800 text-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-slate-200">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">{children}</CardContent>
    </Card>
  )
}
