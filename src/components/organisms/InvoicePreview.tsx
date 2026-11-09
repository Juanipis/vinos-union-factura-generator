import { LogoUploader } from '../atoms/LogoUploader'
import { InvoiceTable } from './InvoiceTable'
import type { Product } from '../../types/invoice'

type InvoicePreviewProps = {
  clientName: string
  displayDate: string
  logoUrl: string | null
  onLogoUpload: (file: File) => void
  products: Product[]
  categories: string[]
  formatMoney: (value: number) => string
  onRemoveProduct: (id: string) => void
  onRemoveCategoryProducts: (category: string) => void
}

export function InvoicePreview({
  clientName,
  displayDate,
  logoUrl,
  onLogoUpload,
  products,
  categories,
  formatMoney,
  onRemoveProduct,
  onRemoveCategoryProducts,
}: InvoicePreviewProps) {
  const totalAmount = products.reduce(
    (acc, product) => acc + product.qty * product.price,
    0,
  )

  return (
    <section className="print-area flex flex-1 justify-center overflow-x-auto px-6 py-10 lg:ml-[350px]">
      <div className="invoice-page notranslate" translate="no">
        <header className="invoice-header flex items-center justify-between">
          <LogoUploader logoUrl={logoUrl} onUpload={onLogoUpload} />
          <div className="text-right">
            <h1
              className="text-3xl font-bold uppercase text-[var(--primary-color)] notranslate"
              translate="no"
            >
              Vinos Unión
            </h1>
            <p className="text-xs text-slate-500">LIQUIDACIÓN PRODUCTOS</p>
            <p className="text-xs text-slate-500">
              Fecha: <span>{displayDate}</span>
            </p>
          </div>
        </header>

        <div className="bill-to">
          <h3 className="text-xs uppercase text-[var(--primary-color)]">
            Facturado a:
          </h3>
          <p className="text-lg font-bold text-[var(--text-color)]">
            {clientName || '---'}
          </p>
        </div>

        <InvoiceTable
          products={products}
          categories={categories}
          formatMoney={formatMoney}
          onRemoveProduct={onRemoveProduct}
          onRemoveCategoryProducts={onRemoveCategoryProducts}
        />

        <div className="total-section">
          <div className="total-box">
            <div className="total-row grand-total notranslate" translate="no">
              <span className="total-label">TOTAL A PAGAR:</span>
              <span className="total-amount">{formatMoney(totalAmount)}</span>
            </div>
          </div>
        </div>

        <footer className="invoice-footer">
          <p>Gracias por su compra</p>
          <p className="italic">"Una nueva experiencia en cada copa"</p>
        </footer>
      </div>
    </section>
  )
}
