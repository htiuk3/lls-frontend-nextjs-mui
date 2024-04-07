import ExTable from "@/app/components/table/ex.table";
import UsersTable from "@/app/components/table/table.users";
import { sendRequest } from "@/utils/api";



const getUsers = async (): Promise<IResponse<UserResponse>> => {
  const res = await sendRequest({
    url: `${process.env.BASE_URL}/users`,
    queryParams: {
      skip: 0,
      order: "ASC",
      take: 100,
      page: 1
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
      {/* <UsersTable meta={result.data.meta} list={result.data.list} /> */}
      <ExTable />
    </>
  )
}