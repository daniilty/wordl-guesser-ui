import axios, { AxiosResponse } from "axios"
import { API_URL } from "./url"

export type FindBody = {
  ignored: string,
  guessed: string,
  pattern: string,
  limit: number
}

export const find = async (body: FindBody): Promise<string[]> => {
  const data = await axios.post<FindBody, AxiosResponse<string[]>>(API_URL + "/find", body)
  return data.data;
}
