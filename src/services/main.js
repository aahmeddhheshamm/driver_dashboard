import { marketPlace } from '@/axios'

export default {
  listDataTabl (url, filter) {
    return marketPlace().get(url, {
      params: filter
    })
  },
  commonUploadFiles (payload, config) {
    return marketPlace().post('media-files/upload', payload, config)
  },
  removeImage (id, type) {
    return marketPlace().get(`remove-image/${id}/${type}`)
  },
  removeRow (url, rowId) {
    console.log(url, rowId)
    return marketPlace().delete(`${url}/${rowId}`)
  },
  changeStatus (payload) {
    return marketPlace().post('change-status', payload)
  }
}
