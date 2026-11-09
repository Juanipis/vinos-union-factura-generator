import { useEffect, useMemo, useState } from 'react'

import { ControlPanel } from './components/organisms/ControlPanel'
import { InvoicePreview } from './components/organisms/InvoicePreview'
import type { Product } from './types/invoice'

const DEFAULT_CATEGORIES = [
  'Vinos Mostrador',
  'Botella Recargable',
  'Garrafa Vino',
  'Cremas',
]
const STORAGE_KEY = 'vinos-union-invoice'

const moneyFormatter = new Intl.NumberFormat('es-CO', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

const formatMoney = (value: number) => `$ ${moneyFormatter.format(value)}`

const getTodayInput = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = `${today.getMonth() + 1}`.padStart(2, '0')
  const day = `${today.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

const formatDisplayDate = (value: string) => {
  if (!value) return ''
  const [year, month, day] = value.split('-').map(Number)
  if (!year || !month || !day) return ''
  const date = new Date(year, month - 1, day)
  return new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

const createId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`

function App() {
  const [primaryColor, setPrimaryColor] = useState('#58181f')
  const [secondaryColor, setSecondaryColor] = useState('#f8f5f2')
  const [clientName, setClientName] = useState("MIRADOR DOG'S PARADISE")
  const [dateValue, setDateValue] = useState(getTodayInput)
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [logoUrl, setLogoUrl] = useState<string | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return

    try {
      const parsed = JSON.parse(stored) as {
        primaryColor?: string
        secondaryColor?: string
        clientName?: string
        dateValue?: string
        categories?: string[]
        selectedCategory?: string
        products?: Product[]
        logoUrl?: string | null
      }

      if (parsed.primaryColor) setPrimaryColor(parsed.primaryColor)
      if (parsed.secondaryColor) setSecondaryColor(parsed.secondaryColor)
      if (parsed.clientName) setClientName(parsed.clientName)
      if (parsed.dateValue) setDateValue(parsed.dateValue)
      if (parsed.categories && parsed.categories.length > 0) {
        setCategories(parsed.categories)
      }
      if (parsed.selectedCategory) setSelectedCategory(parsed.selectedCategory)
      if (parsed.products) setProducts(parsed.products)
      if (parsed.logoUrl !== undefined) setLogoUrl(parsed.logoUrl)
    } catch (error) {
      console.error('No se pudo leer el estado guardado', error)
    }
  }, [])

  useEffect(() => {
    const payload = {
      primaryColor,
      secondaryColor,
      clientName,
      dateValue,
      categories,
      selectedCategory,
      products,
      logoUrl,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  }, [
    primaryColor,
    secondaryColor,
    clientName,
    dateValue,
    categories,
    selectedCategory,
    products,
    logoUrl,
  ])

  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', primaryColor)
    document.documentElement.style.setProperty('--secondary-color', secondaryColor)
  }, [primaryColor, secondaryColor])

  useEffect(() => {
    if (selectedCategory && !categories.includes(selectedCategory)) {
      setSelectedCategory('')
    }
  }, [categories, selectedCategory])

  const displayDate = useMemo(
    () => formatDisplayDate(dateValue),
    [dateValue],
  )

  const handleAddCategory = (name: string) => {
    const normalized = name.trim()
    if (!normalized) return false

    const alreadyExists = categories.some(
      (category) => category.toLowerCase() === normalized.toLowerCase(),
    )
    if (alreadyExists) {
      window.alert('Esta categoria ya existe.')
      return false
    }

    setCategories((prev) => [...prev, normalized])
    return true
  }

  const handleDeleteCategory = (name: string) => {
    if (
      window.confirm(
        `Eliminar la categoria "${name}" de la lista de opciones?`,
      )
    ) {
      setCategories((prev) => prev.filter((category) => category !== name))
    }
  }

  const handleAddProduct = (payload: {
    category: string
    qty: number
    desc: string
    note: string
    price: number
  }) => {
    setProducts((prev) => [
      ...prev,
      { id: createId(), createdAt: Date.now(), ...payload },
    ])
    return true
  }

  const handleRemoveProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id))
  }

  const handleRemoveCategoryProducts = (category: string) => {
    if (
      window.confirm(
        `Borrar todos los productos de la factura bajo la categoria "${category}"?`,
      )
    ) {
      setProducts((prev) => prev.filter((product) => product.category !== category))
    }
  }

  const handleClearAll = () => {
    if (window.confirm('Borrar toda la factura?')) {
      setProducts([])
    }
  }

  const handleLogoUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setLogoUrl(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="min-h-screen bg-slate-200">
      <ControlPanel
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        onPrimaryColorChange={setPrimaryColor}
        onSecondaryColorChange={setSecondaryColor}
        clientName={clientName}
        onClientNameChange={setClientName}
        dateValue={dateValue}
        onDateChange={setDateValue}
        categories={categories}
        onAddCategory={handleAddCategory}
        onDeleteCategory={handleDeleteCategory}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onAddProduct={handleAddProduct}
        onClearAll={handleClearAll}
        onPrint={() => window.print()}
      />
      <InvoicePreview
        clientName={clientName}
        displayDate={displayDate}
        logoUrl={logoUrl}
        onLogoUpload={handleLogoUpload}
        products={products}
        categories={categories}
        formatMoney={formatMoney}
        onRemoveProduct={handleRemoveProduct}
        onRemoveCategoryProducts={handleRemoveCategoryProducts}
      />
    </div>
  )
}

export default App
