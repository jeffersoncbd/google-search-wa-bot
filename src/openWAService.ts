/* eslint-disable camelcase */
import axios from 'axios'

const baseURL = process.env.OPEN_WA_URL
const api_key = process.env.OPEN_WA_API_KEY as string

if (!baseURL) {
  throw new Error('Defina a variável OPEN_WA_URL no arquivo .env')
}
if (!api_key) {
  throw new Error('Defina a variável OPEN_WA_API_KEY no arquivo .env')
}

export const openWAService = axios.create({ baseURL, headers: { api_key } })
