import { sendRequest } from "@/utils/api";
import ProductsTable from "../../components/table/products/table-products.main";



export const getProducts = async (take: number, page: number = 1): Promise<IResponse<ProductResponse>> => {
  const res = await sendRequest({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/products`,
    queryParams: {
      skip: 0,
      order: "ASC",
      take,
      page
    }

  })
  return res
}

interface ProductResponse {
  list: any[],
  meta: any
}

export default async function ProductsPage() {
  const result: IResponse<ProductResponse> = await getProducts(50)
  if (!result) return null
  return (
    <>
      <ProductsTable meta={result.data.meta} list={result.data.list} />
    </>
  )
}