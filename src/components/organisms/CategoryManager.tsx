import { useState } from 'react'
import { Plus } from 'lucide-react'

import { CategoryListItem } from '../molecules/CategoryListItem'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

type CategoryManagerProps = {
  categories: string[]
  onAddCategory: (name: string) => boolean
  onDeleteCategory: (name: string) => void
}

export function CategoryManager({
  categories,
  onAddCategory,
  onDeleteCategory,
}: CategoryManagerProps) {
  const [newCategory, setNewCategory] = useState('')

  const handleAdd = () => {
    const trimmed = newCategory.trim()
    if (!trimmed) {
      return
    }
    const added = onAddCategory(trimmed)
    if (added) {
      setNewCategory('')
    }
  }

  return (
    <div className="space-y-3">
      <Label className="text-xs text-slate-200">Lista actual</Label>
      <div className="flex gap-2">
        <Input
          value={newCategory}
          onChange={(event) => setNewCategory(event.target.value)}
          placeholder="Nueva Categoria"
          className="border-slate-600 bg-slate-900 text-white placeholder:text-slate-400"
        />
        <Button
          variant="primary"
          size="icon"
          type="button"
          onClick={handleAdd}
          aria-label="Agregar categoria"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-2">
        {categories.map((category) => (
          <CategoryListItem
            key={category}
            name={category}
            onDelete={() => onDeleteCategory(category)}
          />
        ))}
      </div>
    </div>
  )
}
