import { Fragment } from 'react'
import { Trash2, XCircle } from 'lucide-react'

import { Button } from '../ui/button'
import type { Product } from '../../types/invoice'

type InvoiceTableProps = {
  products: Product[]
  categories: string[]
  formatMoney: (value: number) => string
  onRemoveProduct: (id: string) => void
  onRemoveCategoryProducts: (category: string) => void
}

export function InvoiceTable({
  products,
  categories,
  formatMoney,
  onRemoveProduct,
  onRemoveCategoryProducts,
}: InvoiceTableProps) {
  const categoryOrder = new Map(
    categories.map((category, index) => [category, index]),
  )

  const sortedProducts = [...products].sort((a, b) => {
    const indexA = categoryOrder.get(a.category) ?? Number.MAX_SAFE_INTEGER
    const indexB = categoryOrder.get(b.category) ?? Number.MAX_SAFE_INTEGER

    if (indexA === indexB) {
      if (indexA === Number.MAX_SAFE_INTEGER) {
        const categoryOrderFallback = a.category.localeCompare(b.category)
        if (categoryOrderFallback !== 0) {
          return categoryOrderFallback
        }
      }
      return a.createdAt - b.createdAt
    }
    return indexA - indexB
  })

  let currentCategory = ''

  return (
    <table className="invoice-table">
      <thead>
        <tr>
          <th className="col-qty">Cant.</th>
          <th className="col-desc">Descripcion</th>
          <th className="col-unit">Precio Unit.</th>
          <th className="col-total">Total</th>
        </tr>
      </thead>
      <tbody>
        {sortedProducts.map((product) => {
          const lineTotal = product.qty * product.price
          const showCategory = product.category !== currentCategory
          if (showCategory) {
            currentCategory = product.category
          }

          return (
            <Fragment key={product.id}>
              {showCategory ? (
                <tr className="category-row">
                  <td colSpan={4}>
                    {product.category}
                    <Button
                      variant="destructive"
                      size="sm"
                      className="print-hidden ml-3 h-6 px-2 text-xs"
                      onClick={() =>
                        onRemoveCategoryProducts(product.category)
                      }
                      type="button"
                    >
                      <Trash2 className="h-3 w-3" />
                      Borrar productos
                    </Button>
                  </td>
                </tr>
              ) : null}
              <tr>
                <td className="col-qty">{product.qty}</td>
                <td className="col-desc">
                  {product.desc}
                  {product.note ? (
                    <span className="item-note">* {product.note}</span>
                  ) : null}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="print-hidden ml-2 h-7 w-7 text-red-500 hover:bg-red-50"
                    onClick={() => onRemoveProduct(product.id)}
                    aria-label="Eliminar producto"
                    type="button"
                  >
                    <XCircle className="h-4 w-4" />
                  </Button>
                </td>
                <td className="col-unit">{formatMoney(product.price)}</td>
                <td className="col-total">{formatMoney(lineTotal)}</td>
              </tr>
            </Fragment>
          )
        })}
      </tbody>
    </table>
  )
}
