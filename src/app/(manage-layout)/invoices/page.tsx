import TableInvoices from "@/app/components/table/invoices/table-invoices.main";
import { sendRequest } from "@/utils/api";



export const getInvoices = async (take: number, page: number = 1): Promise<IResponse<InvoiceResponse>> => {
  const res = await sendRequest({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/invoices`,
    queryParams: {
      skip: 0,
      order: "ASC",
      take,
      page
    }

  })
  return res as IResponse<InvoiceResponse>
}

interface InvoiceResponse {
  list: any[],
  meta: any
}

export default async function InvoicesPage() {
  const result: IResponse<InvoiceResponse> = await getInvoices(50)
  if (!result) return null
  return (
    <>
      <TableInvoices meta={result.data.meta} list={result.data.list} />
    </>
  )
}