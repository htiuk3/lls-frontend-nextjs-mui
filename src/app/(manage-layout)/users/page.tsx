import TableUsers from "@/app/components/table/users/table-users.main";
import { sendRequest } from "@/utils/api";


export const getUsers = async (take: number = 50, page: number = 1): Promise<IResponse<UserResponse>> => {
  const res = await sendRequest({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/users`,
    queryParams: {
      skip: 0,
      order: "ASC",
      take,
      page
    }

  })
  return res as IResponse<UserResponse>
}

interface UserResponse {
  list: TUser[],
  meta: TPageMeta
}


export default async function ProductsPage() {
  const result: IResponse<UserResponse> = await getUsers()
  if (!result) return null
  return (
    <>
      <TableUsers meta={result.data.meta} list={result.data.list} />
    </>
  )
}