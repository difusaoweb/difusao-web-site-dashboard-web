import { ErrorStatusOrNull } from './common.types'

export interface AttachmentData {
  id: number
  title: string
  source: string
  created_at: string
}

export interface ReduxAttachmentsGetAttachmentListServiceParameters {
  page: number
}
export interface ReduxAttachmentsGetAttachmentListReducerPayload {
  success: {
    attachments: AttachmentData[]
    lastPage: number
  } | null
  failure: ErrorStatusOrNull
}

export interface ReduxAttachmentsGetAttachmentServiceParameters {
  attachmentId: number
}
export interface ReduxAttachmentsGetAttachmentReducerPayload {
  success: {
    attachment: AttachmentData
  } | null
  failure: ErrorStatusOrNull
}

export interface ReduxAttachmentsCreateAttachmentServiceParameters {
  title: string
  description: string
  image: number
}
export interface ReduxAttachmentsCreateAttachmentReducerPayload {
  success: {
    attachmentId: number
  } | null
  failure: ErrorStatusOrNull
}

export interface ReduxAttachmentsUpdateAttachmentServiceParameters {
  attachmentId: number
  attachmentTitle: string
}
export interface ReduxAttachmentsUpdateAttachmentReducerPayload {
  success: {
    updated: boolean
  } | null
  failure: ErrorStatusOrNull
}

export interface ReduxAttachmentsDeleteAttachmentListServiceParameters {
  attachmentsId: number[]
}
export interface ReduxAttachmentsDeleteAttachmentListReducerPayload {
  success: {
    deleted: boolean
    attachmentsId: number[]
  } | null
  failure: ErrorStatusOrNull
}

export interface ReduxAttachmentsClearStateServiceParameters {
  state: string[]
}

export const REDUX_ATTACHMENTS_GET_ATTACHMENT_LIST =
  'REDUX_ATTACHMENTS_GET_ATTACHMENT_LIST'
interface ReduxAttachmentsGetAttachmentListReducer {
  type: typeof REDUX_ATTACHMENTS_GET_ATTACHMENT_LIST
  payload: ReduxAttachmentsGetAttachmentListReducerPayload
}

export const REDUX_ATTACHMENTS_GET_ATTACHMENT =
  'REDUX_ATTACHMENTS_GET_ATTACHMENT'
interface ReduxAttachmentsGetAttachmentReducer {
  type: typeof REDUX_ATTACHMENTS_GET_ATTACHMENT
  payload: ReduxAttachmentsGetAttachmentReducerPayload
}

export const REDUX_ATTACHMENTS_CREATE_ATTACHMENT =
  'REDUX_ATTACHMENTS_CREATE_ATTACHMENT'
interface ReduxAttachmentsCreateAttachmentReducer {
  type: typeof REDUX_ATTACHMENTS_CREATE_ATTACHMENT
  payload: ReduxAttachmentsCreateAttachmentReducerPayload
}

export const REDUX_ATTACHMENTS_UPDATE_ATTACHMENT =
  'REDUX_ATTACHMENTS_UPDATE_ATTACHMENT'
interface ReduxAttachmentsUpdateAttachmentReducer {
  type: typeof REDUX_ATTACHMENTS_UPDATE_ATTACHMENT
  payload: ReduxAttachmentsUpdateAttachmentReducerPayload
}

export const REDUX_ATTACHMENTS_DELETE_ATTACHMENT_LIST =
  'REDUX_ATTACHMENTS_DELETE_ATTACHMENT_LIST'
interface ReduxAttachmentsDeleteAttachmentListReducer {
  type: typeof REDUX_ATTACHMENTS_DELETE_ATTACHMENT_LIST
  payload: ReduxAttachmentsDeleteAttachmentListReducerPayload
}

export const REDUX_ATTACHMENTS_CLEAR_STATE = 'REDUX_ATTACHMENTS_CLEAR_STATE'
interface ReduxAttachmentsClearStateReducer {
  type: typeof REDUX_ATTACHMENTS_CLEAR_STATE
  payload: string
}

export interface AttachmentState {
  getAttachmentListAttachments: AttachmentData[] | null
  getAttachmentListLastPage: number | null
  getAttachmentListError: ErrorStatusOrNull

  getAttachmentAttachment: AttachmentData | null
  getAttachmentError: ErrorStatusOrNull

  createAttachmentAttachmentId: number | null
  createAttachmentError: ErrorStatusOrNull

  updateAttachmentUpdated: boolean | null
  updateAttachmentError: ErrorStatusOrNull

  deleteAttachmentListDeleted: boolean | null
  deleteAttachmentListError: ErrorStatusOrNull
}

export type AttachmentActionTypes =
  | ReduxAttachmentsGetAttachmentListReducer
  | ReduxAttachmentsGetAttachmentReducer
  | ReduxAttachmentsCreateAttachmentReducer
  | ReduxAttachmentsUpdateAttachmentReducer
  | ReduxAttachmentsDeleteAttachmentListReducer
  | ReduxAttachmentsClearStateReducer
