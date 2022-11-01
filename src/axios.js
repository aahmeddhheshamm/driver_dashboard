import axios from 'axios'
import { core } from '@/config/pluginInit'
export function singleSignOn () {
  const apiClient = axios.create({
    baseURL: process.env.VUE_APP_SSO_LINK,
    headers: {
      // Authorization: `Bearer ${JSON.parse(Cookies.get('userData')) ? JSON.parse(Cookies.get('userData')).meta.token : null}`,
      Authorization: `Bearer ${localStorage.getItem('userToken') ? JSON.parse(localStorage.getItem('userToken')) : null}`,
      Accept: 'application/json',
      ContentType: 'application/json',
      'Accept-Language': 'ar',
      'Content-Language': 'ar'
    }
  })
  apiClient.interceptors.response.use((response) => {
    return response
  }, (error) => {
    if (error.response.data.errors) {
      // eslint-disable-next-line no-unused-vars
      for (const [key, value] of Object.entries(error.response.data.errors)) {
        core.showSnackbar('error', value)
      }
    } else if (error.response.data) {
      core.showSnackbar('error', error.response.data.message)
    }
    return Promise.reject(error)
  })
  return apiClient
}
export function marketPlace () {
  const apiClient = axios.create({
    baseURL: process.env.VUE_APP_MARKETPLACE_LINK,
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userToken')) ? JSON.parse(localStorage.getItem('userToken')) : null}`,
      Accept: 'application/json',
      ContentType: 'application/json',
      'Accept-Language': 'ar',
      'Content-Language': 'ar'
    }
  })
  apiClient.interceptors.response.use((response) => {
    return response
  }, (error) => {
    if (error.response.data) {
      // console.log('error.response => ', error.response.data.message)
      core.showSnackbar('error', error.response.data.message)
      // eslint-disable-next-line no-unused-vars
      for (const [key, value] of Object.entries(error.response.data.errors)) {
        core.showSnackbar('error', value)
      }
    }
    return Promise.reject(error)
  })
  return apiClient
}
