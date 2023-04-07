import { api } from "../utils/api";

export function search(query: string) {
  return api.get(`/search?query=${query}`);
}
