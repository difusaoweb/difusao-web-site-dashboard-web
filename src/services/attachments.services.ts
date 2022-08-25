import { AxiosResponse } from 'axios'

import { api } from './api'
import {
  ReduxAttachmentsGetAttachmentListServiceParameters,
  ReduxAttachmentsGetAttachmentServiceParameters,
  ReduxAttachmentsCreateAttachmentServiceParameters,
  ReduxAttachmentsUpdateAttachmentServiceParameters,
  ReduxAttachmentsDeleteAttachmentListServiceParameters
} from '../redux'

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
  title,
  description,
  image
}: ReduxAttachmentsCreateAttachmentServiceParameters): Promise<AxiosResponse> {
  return await api.get('/attachments/create', {
    params: {
      title,
      description,
      image
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
