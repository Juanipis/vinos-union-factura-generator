import { useRef, useState } from 'react'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

type ProductFormProps = {
  categories: string[]
  selectedCategory: string
  onSelectCategory: (value: string) => void
  onAddProduct: (payload: {
    category: string
    qty: number
    desc: string
    note: string
    price: number
  }) => boolean
}

export function ProductForm({
  categories,
  selectedCategory,
  onSelectCategory,
  onAddProduct,
}: ProductFormProps) {
  const [qty, setQty] = useState('1')
  const [desc, setDesc] = useState('')
  const [note, setNote] = useState('')
  const [price, setPrice] = useState('')
  const descRef = useRef<HTMLInputElement | null>(null)

  const handleSubmit = () => {
    if (!selectedCategory) {
      window.alert(
        'Primero debes seleccionar una categoria. Si la lista esta vacia, crea una nueva.',
      )
      return
    }

    if (!desc.trim()) {
      window.alert('Por favor, ingresa una descripcion para el producto.')
      descRef.current?.focus()
      return
    }

    const didAdd = onAddProduct({
      category: selectedCategory,
      qty: Number.parseInt(qty, 10) || 1,
      desc: desc.trim(),
      note: note.trim(),
      price: Number.parseFloat(price) || 0,
    })

    if (didAdd) {
      setQty('1')
      setDesc('')
      setNote('')
      setPrice('')
      descRef.current?.focus()
    }
  }

  return (
    <div className="space-y-3">
      <Label className="text-xs text-slate-200">Seleccionar Categoria</Label>
      <Select value={selectedCategory} onValueChange={onSelectCategory}>
        <SelectTrigger className="border-slate-600 bg-slate-900 text-white">
          <SelectValue placeholder="-- Elige una categoria --" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        type="number"
        min={1}
        value={qty}
        onChange={(event) => setQty(event.target.value)}
        placeholder="Cant."
        className="border-slate-600 bg-slate-900 text-white placeholder:text-slate-400"
      />
      <Input
        ref={descRef}
        value={desc}
        onChange={(event) => setDesc(event.target.value)}
        placeholder="Descripcion Producto"
        className="border-slate-600 bg-slate-900 text-white placeholder:text-slate-400"
      />
      <Input
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="Nota (Opcional)"
        className="border-slate-600 bg-slate-900 text-white placeholder:text-slate-400"
      />
      <Input
        type="number"
        step={500}
        value={price}
        onChange={(event) => setPrice(event.target.value)}
        placeholder="Precio Unitario"
        className="border-slate-600 bg-slate-900 text-white placeholder:text-slate-400"
      />
      <Button variant="success" className="w-full" type="button" onClick={handleSubmit}>
        Anadir a la lista
      </Button>
    </div>
  )
}
