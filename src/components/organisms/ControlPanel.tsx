import { Printer, Trash2 } from 'lucide-react'

import { ColorSwatchInput } from '../atoms/ColorSwatchInput'
import { ControlSection } from '../molecules/ControlSection'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { CategoryManager } from './CategoryManager'
import { ProductForm } from './ProductForm'

type ControlPanelProps = {
  primaryColor: string
  secondaryColor: string
  onPrimaryColorChange: (value: string) => void
  onSecondaryColorChange: (value: string) => void
  clientName: string
  onClientNameChange: (value: string) => void
  dateValue: string
  onDateChange: (value: string) => void
  categories: string[]
  onAddCategory: (value: string) => boolean
  onDeleteCategory: (value: string) => void
  selectedCategory: string
  onSelectCategory: (value: string) => void
  onAddProduct: (payload: {
    category: string
    qty: number
    desc: string
    note: string
    price: number
  }) => boolean
  onClearAll: () => void
  onPrint: () => void
}

export function ControlPanel({
  primaryColor,
  secondaryColor,
  onPrimaryColorChange,
  onSecondaryColorChange,
  clientName,
  onClientNameChange,
  dateValue,
  onDateChange,
  categories,
  onAddCategory,
  onDeleteCategory,
  selectedCategory,
  onSelectCategory,
  onAddProduct,
  onClearAll,
  onPrint,
}: ControlPanelProps) {
  return (
    <aside className="print-hidden space-y-4 bg-slate-900 p-5 text-white shadow-lg lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-[350px] lg:overflow-y-auto">
      <div className="text-center">
        <h2 className="text-lg font-semibold">Facturador Pro</h2>
      </div>

      <ControlSection title="Identidad de Marca">
        <div className="grid grid-cols-2 gap-3">
          <ColorSwatchInput
            id="primary-color"
            label="Primario"
            value={primaryColor}
            onChange={onPrimaryColorChange}
          />
          <ColorSwatchInput
            id="secondary-color"
            label="Fondo Acentos"
            value={secondaryColor}
            onChange={onSecondaryColorChange}
          />
        </div>
      </ControlSection>

      <ControlSection title="Cliente">
        <Input
          value={clientName}
          onChange={(event) => onClientNameChange(event.target.value)}
          placeholder="Nombre Cliente"
          className="border-slate-600 bg-slate-900 text-white placeholder:text-slate-400"
        />
        <div className="space-y-2">
          <Label className="text-xs text-slate-300">Fecha</Label>
          <Input
            type="date"
            value={dateValue}
            onChange={(event) => onDateChange(event.target.value)}
            className="border-slate-600 bg-slate-900 text-white"
          />
        </div>
      </ControlSection>

      <ControlSection title="Gestionar Categorias">
        <CategoryManager
          categories={categories}
          onAddCategory={onAddCategory}
          onDeleteCategory={onDeleteCategory}
        />
      </ControlSection>

      <ControlSection title="Anadir Producto">
        <ProductForm
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
          onAddProduct={onAddProduct}
        />
      </ControlSection>

      <ControlSection title="Acciones">
        <Button variant="destructive" className="w-full" onClick={onClearAll}>
          <Trash2 className="h-4 w-4" />
          Borrar Todo
        </Button>
      </ControlSection>

      <Button variant="primary" className="w-full" onClick={onPrint}>
        <Printer className="h-4 w-4" />
        Descargar PDF
      </Button>

      <p className="text-center text-xs text-slate-400">
        Para guardar como PDF, selecciona "Guardar como PDF" en el destino de
        impresion.
      </p>
    </aside>
  )
}
