export { };
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript

declare global {
  type TProduct = {
    id: string,
    code: string,
    name: string,
    fullName: string,
    cost: number,
    wholeSalePrice: number,
    retailPrice: number,
    onHand: number,
    kiotImage: string,
    kiotCategoryId: number,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null
  }

  type TUser = {
    id: string
    name: string
    username: string
    isActive: boolean
    phoneNumber: string | null
    kiotId: string | null
    role: TRole | null
  }
  type TRole = {
    id: string
    code: string
    name: string
  }
  type TInvoice = {
    id: string
    code: string
    soldByKiotId: number
    soldByKiotName: string
    customerKiotId: string
    customerCode: string | null
    orderCode: string
    total: number
    totalPayment: number
    kiotStatus: number
    kiotStatusValue: string
    createdAt: Date
    updatedAt: Date
    invoiceDetails: InvoiceItem[]
  }
  type InvoiceItem = {
    id: string
    productCode: string
    quantity: number
    price: number
    discount: number
    subTotal: number
    note: string
    createdAt: Date
    updatedAt: Date

  }
  type TPageMeta = {
    page: number
    take: number
    itemCount: number
    pageCount: number
    hasPreviousPage: boolean
    hasNextPage: boolean
  }


  export type SortOrder = 'asc' | 'desc';
}
