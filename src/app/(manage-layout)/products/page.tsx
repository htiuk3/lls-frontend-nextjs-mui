import { sendRequest } from "@/utils/api";
import ProductsTable from "../../components/table/table.products";



const getProducts = async (): Promise<IResponse<ProductResponse>> => {
  const res = await sendRequest({
    url: `${process.env.BASE_URL}/products`,
    queryParams: {
      skip: 0,
      order: "ASC",
      take: 25,
      page: 1
    }

  })
  return res as IResponse<ProductResponse>
}

interface ProductResponse {
  list: any[],
  meta: any
}

export default async function ProductsPage() {
  const result: IResponse<ProductResponse> = await getProducts()
  if (!result) return null
  return (
    <>
      <ProductsTable meta={result.data.meta} list={result.data.list} />
    </>
  )
}