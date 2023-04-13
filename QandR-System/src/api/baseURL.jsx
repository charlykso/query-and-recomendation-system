import axios from 'axios'

const base_URL = axios.create({
  baseURL: 'https://localhost:7255/api',
})

export default base_URL