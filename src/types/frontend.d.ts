export { };
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript

declare global {
  interface IProduct {
    stt: number,
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
    // isActive: boolean,
    // createdAt: Date,
    // updatedAt: Date,
    // deletedAt: Date
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
