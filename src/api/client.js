import axios from './axiosInstance.js'
import { mockApi } from './mockData.js'

const useMocks = (import.meta.env.VITE_USE_MOCKS ?? 'false') !== 'false'

export const api = {
  async get(path, { params } = {}) {
    if (useMocks) return Promise.resolve({ data: mockApi.get(path, params) })
    return axios.get(path, { params })
  },
  async post(path, body) {
    if (useMocks) return Promise.resolve({ data: mockApi.post(path, body) })
    return axios.post(path, body)
  },
  async put(path, body) {
    if (useMocks) return Promise.resolve({ data: mockApi.put(path, body) })
    return axios.put(path, body)
  },
  async delete(path) {
    if (useMocks) return Promise.resolve({ data: mockApi.delete(path) })
    return axios.delete(path)
  },
}



