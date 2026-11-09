import { X } from 'lucide-react'

import { Button } from '../ui/button'

type CategoryListItemProps = {
  name: string
  onDelete: () => void
}

export function CategoryListItem({ name, onDelete }: CategoryListItemProps) {
  return (
    <div className="flex items-center justify-between rounded-md bg-white/5 px-2 py-1 text-xs text-slate-100">
      <span>{name}</span>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 text-red-300 hover:bg-white/10 hover:text-red-200"
        onClick={onDelete}
        type="button"
        aria-label={`Borrar ${name}`}
      >
        <X className="h-3.5 w-3.5" />
      </Button>
    </div>
  )
}
