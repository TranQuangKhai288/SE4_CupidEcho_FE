import baseURL from "./Customize-axios";
interface Response {
  status: string;
  message?: string;
  data: any;
}

export const getListConv = async (
  page: number,
  limit: number,
  search: string
) => {
  const res: Response = await baseURL.get(
    `/conv?page=${page}&limit=${limit}&search=${search}`
  );
  return res;
};

export const getConvDetails = async (
  id: string,
  page: number,
  limit: number
) => {
  const res: Response = await baseURL.get(
    `/conv/${id}?page=${page}&limit=${limit}`
  );
  return res;
};
