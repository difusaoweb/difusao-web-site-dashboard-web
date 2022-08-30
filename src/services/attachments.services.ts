import { AxiosResponse } from 'axios'

import { api } from './api'
import {
  ReduxAttachmentsGetAttachmentListServiceParameters,
  ReduxAttachmentsGetAttachmentServiceParameters,
  ReduxAttachmentsCreateAttachmentServiceParameters,
  ReduxAttachmentsUpdateAttachmentServiceParameters,
  ReduxAttachmentsDeleteAttachmentListServiceParameters
} from '../redux'
import { UploadedFileType } from '../redux/types'

async function getAttachmentList({
  page,
  perPage
}: ReduxAttachmentsGetAttachmentListServiceParameters): Promise<AxiosResponse> {
  return await api.get('/attachments/list', {
    params: { page, per_page: perPage }
  })
}

async function getAttachment({
  attachmentId
}: ReduxAttachmentsGetAttachmentServiceParameters): Promise<AxiosResponse> {
  return await api.get('/attachments/show', {
    params: { attachment_id: attachmentId }
  })
}

async function createAttachment({
  file,
  setUploadedFiles
}: ReduxAttachmentsCreateAttachmentServiceParameters): Promise<AxiosResponse> {
  const data = new FormData()
  data.append('file', file.file, file.name)
  return await api.post('/attachments/create', data, {
    onUploadProgress: e => {
      const progress = parseInt(`${Math.round((e.loaded * 100) / e.total)}`)

      setUploadedFiles((uploadedFiles: UploadedFileType[] | null) => {
        if (uploadedFiles) {
          return uploadedFiles.map(uploadedFile => {
            return uploadedFile.id === file.id
              ? { ...uploadedFile, progress }
              : uploadedFile
          })
        }
        return null
      })
    }
  })
}

async function updateAttachment({
  attachmentId,
  attachmentTitle
}: ReduxAttachmentsUpdateAttachmentServiceParameters): Promise<AxiosResponse> {
  return await api.get('/attachments/update', {
    params: {
      attachment_id: attachmentId,
      attachment_title: attachmentTitle
    }
  })
}

async function deleteAttachmentList({
  attachmentsId
}: ReduxAttachmentsDeleteAttachmentListServiceParameters): Promise<AxiosResponse> {
  return await api.get('/attachments/delete', {
    params: { attachments_id: attachmentsId }
  })
}

export const attachmentsService = {
  getAttachmentList,
  getAttachment,
  createAttachment,
  updateAttachment,
  deleteAttachmentList
}
