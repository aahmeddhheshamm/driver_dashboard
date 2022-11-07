import { transportation } from '@/axios'

export default {
  listDataTabl (url, filter) {
    return transportation().get(url, {
      params: filter
    })
  },
  commonUploadFiles (payload, config) {
    return transportation().post('media-files/upload', payload, config)
  },
  removeImage (id, type) {
    return transportation().get(`remove-image/${id}/${type}`)
  },
  removeRow (url, rowId) {
    console.log(url, rowId)
    return transportation().delete(`${url}/${rowId}`)
  },
  changeStatus (payload) {
    return transportation().post('change-status', payload)
  }
}
