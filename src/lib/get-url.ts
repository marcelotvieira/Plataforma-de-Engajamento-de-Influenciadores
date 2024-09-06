import { getURL } from "next/dist/shared/lib/utils";

const getUrl = (endpoint: string) => `${process.env.BASE_URL}${endpoint}`

export default getUrl