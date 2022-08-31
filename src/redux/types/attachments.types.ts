import { NumberOrNull, BooleanOrNull, ErrorStatusOrNull } from './common.types'

export interface UploadedFileType {
  file: File
  id: number
  name: string
  readableSize: string
  preview: string
  progress: number
  uploaded: boolean
  error: boolean
  url: string | null
}

export interface AttachmentData {
  id: number
  title: string
  source: string
  createdAt: string
}

export interface ReduxAttachmentsGetAttachmentListServiceParameters {
  page: number
  perPage: number
}
export type ReduxAttachmentsGetAttachmentListFunctionDispatch = ReturnType<
  typeof AttachmentActionTypes | typeof AlertActionTypes
>
export interface ReduxAttachmentsGetAttachmentListReducerPayload {
  success: {
    attachments: AttachmentData[]
    currentPage: number
    lastPage: number
    total: number
  } | null
  failure: ErrorStatusOrNull
}

export interface ReduxAttachmentsGetAttachmentServiceParameters {
  attachmentId: number
}
export type ReduxAttachmentsGetAttachmentFunctionDispatch = ReturnType<
  typeof AttachmentActionTypes | typeof AlertActionTypes
>
export interface ReduxAttachmentsGetAttachmentReducerPayload {
  success: {
    attachment: AttachmentData
  } | null
  failure: ErrorStatusOrNull
}

export interface ReduxAttachmentsCreateAttachmentServiceParameters {
  file: UploadedFileType
  setUploadedFiles(value: React.SetStateAction<UploadedFileType[] | null>): void
}
export type ReduxAttachmentsCreateAttachmentFunctionDispatch = ReturnType<
  typeof AttachmentActionTypes | typeof AlertActionTypes
>
export interface ReduxAttachmentsCreateAttachmentReducerPayload {
  success: {
    attachment: AttachmentData
  } | null
  failure: ErrorStatusOrNull
}

export interface ReduxAttachmentsUpdateAttachmentServiceParameters {
  attachmentId: number
  attachmentTitle: string
}
export type ReduxAttachmentsUpdateAttachmentFunctionDispatch = ReturnType<
  typeof AttachmentActionTypes | typeof AlertActionTypes
>
export interface ReduxAttachmentsUpdateAttachmentReducerPayload {
  success: {
    updated: boolean
    attachmentId: number
    attachmentTitle: string
  } | null
  failure: ErrorStatusOrNull
}

export interface ReduxAttachmentsDeleteAttachmentListFunctionParameters {
  attachmentsId: number[]
  setAttachmentsHaveBeenDeleted(value: React.SetStateAction<boolean>): void
}
export interface ReduxAttachmentsDeleteAttachmentListServiceParameters {
  attachmentsId: number[]
}
export type ReduxAttachmentsDeleteAttachmentListFunctionDispatch = ReturnType<
  typeof AttachmentActionTypes | typeof AlertActionTypes
>
export interface ReduxAttachmentsDeleteAttachmentListReducerPayload {
  success: {
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
  getAttachmentListLastPage: NumberOrNull
  getAttachmentListTotal: NumberOrNull
  getAttachmentListError: ErrorStatusOrNull

  getAttachmentAttachment: AttachmentData | null
  getAttachmentError: ErrorStatusOrNull

  createAttachmentError: ErrorStatusOrNull

  updateAttachmentUpdated: BooleanOrNull
  updateAttachmentError: ErrorStatusOrNull

  deleteAttachmentListError: ErrorStatusOrNull
}

export type AttachmentActionTypes =
  | ReduxAttachmentsGetAttachmentListReducer
  | ReduxAttachmentsGetAttachmentReducer
  | ReduxAttachmentsCreateAttachmentReducer
  | ReduxAttachmentsUpdateAttachmentReducer
  | ReduxAttachmentsDeleteAttachmentListReducer
  | ReduxAttachmentsClearStateReducer
