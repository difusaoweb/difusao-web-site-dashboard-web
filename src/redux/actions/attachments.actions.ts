import axios, { AxiosError } from 'axios'
import { ActionCreator, Dispatch } from 'redux'

import {
  AttachmentActionTypes,
  ReduxAttachmentsGetAttachmentListReducerPayload,
  REDUX_ATTACHMENTS_GET_ATTACHMENT_LIST,
  ReduxAttachmentsGetAttachmentListServiceParameters,
  ReduxAttachmentsGetAttachmentReducerPayload,
  REDUX_ATTACHMENTS_GET_ATTACHMENT,
  ReduxAttachmentsGetAttachmentServiceParameters,
  ReduxAttachmentsCreateAttachmentReducerPayload,
  REDUX_ATTACHMENTS_CREATE_ATTACHMENT,
  ReduxAttachmentsCreateAttachmentServiceParameters,
  ReduxAttachmentsUpdateAttachmentReducerPayload,
  ReduxAttachmentsUpdateAttachmentServiceParameters,
  REDUX_ATTACHMENTS_UPDATE_ATTACHMENT,
  ReduxAttachmentsDeleteAttachmentListReducerPayload,
  REDUX_ATTACHMENTS_DELETE_ATTACHMENT_LIST,
  ReduxAttachmentsDeleteAttachmentListServiceParameters,
  ReduxAttachmentsClearStateReducerPayload,
  REDUX_ATTACHMENTS_CLEAR_STATE,
  ReduxAttachmentsClearStateServiceParameters
} from '../types'
import { attachmentsService } from '../../services'
import { setAlert } from './alerts.actions'

const reduxAttachmentsGetAttachmentListAction: ActionCreator<
  AttachmentActionTypes
> = (payload: ReduxAttachmentsGetAttachmentListReducerPayload) => {
  return { type: REDUX_ATTACHMENTS_GET_ATTACHMENT_LIST, payload }
}
type reduxAttachmentsGetAttachmentListFunctionType = ReturnType<
  typeof AttachmentActionTypes | typeof AlertActionTypes
>
export function reduxAttachmentsGetAttachmentListFunction(
  parameters: ReduxAttachmentsGetAttachmentListServiceParameters
) {
  return async (
    dispatch: Dispatch<reduxAttachmentsGetAttachmentListFunctionType>
  ) => {
    try {
      const { data } = await attachmentsService.getAttachmentList(parameters)
      const attachments = data?.success?.attachments
      const lastPage = data?.success?.last_page

      dispatch(
        reduxAttachmentsGetAttachmentListAction({
          success: { attachments, lastPage },
          failure: null
        })
      )
    } catch (err) {
      console.log(err)
      let status: number | null = null

      if (axios.isAxiosError(err)) {
        err as AxiosError
        status = err.response?.status ?? null
      }

      switch (status) {
        case 404:
          break
        default:
          dispatch(setAlert({ type: 'error', message: 'Erro desconhecido!' }))
          break
      }

      dispatch(
        reduxAttachmentsGetAttachmentListAction({
          success: null,
          failure: { status }
        })
      )
    }
  }
}

const reduxAttachmentsGetAttachmentAction: ActionCreator<
  AttachmentActionTypes
> = (payload: ReduxAttachmentsGetAttachmentReducerPayload) => {
  return { type: REDUX_ATTACHMENTS_GET_ATTACHMENT, payload }
}
type reduxAttachmentsGetAttachmentFunctionType = ReturnType<
  typeof AttachmentActionTypes | typeof AlertActionTypes
>
export function reduxAttachmentsGetAttachmentFunction(
  parameters: ReduxAttachmentsGetAttachmentServiceParameters
) {
  return async (
    dispatch: Dispatch<reduxAttachmentsGetAttachmentFunctionType>
  ) => {
    try {
      const { data } = await attachmentsService.getAttachment(parameters)
      const attachment = data?.success?.attachment

      dispatch(
        reduxAttachmentsGetAttachmentAction({
          success: { attachment },
          failure: null
        })
      )
    } catch (err) {
      console.log(err)
      let status: number | null = null

      if (axios.isAxiosError(err)) {
        err as AxiosError
        status = err.response?.status ?? null
      }

      switch (status) {
        case 404:
          break
        default:
          dispatch(setAlert({ type: 'error', message: 'Erro desconhecido!' }))
          break
      }

      dispatch(
        reduxAttachmentsGetAttachmentAction({
          success: null,
          failure: { status }
        })
      )
    }
  }
}

const reduxAttachmentsCreateAttachmentAction: ActionCreator<
  AttachmentActionTypes
> = (payload: ReduxAttachmentsCreateAttachmentReducerPayload) => {
  return { type: REDUX_ATTACHMENTS_CREATE_ATTACHMENT, payload }
}
type reduxAttachmentsCreateAttachmentFunctionType = ReturnType<
  typeof AttachmentActionTypes | typeof AlertActionTypes
>
export function reduxAttachmentsCreateAttachmentFunction(
  parameters: ReduxAttachmentsCreateAttachmentServiceParameters
) {
  return async (
    dispatch: Dispatch<reduxAttachmentsCreateAttachmentFunctionType>
  ) => {
    try {
      const { data } = await attachmentsService.createAttachment(parameters)
      const attachmentId = data?.success?.attachment_id

      dispatch(
        reduxAttachmentsCreateAttachmentAction({
          success: { attachmentId },
          failure: null
        })
      )
    } catch (err) {
      console.log(err)
      let status: number | null = null

      if (axios.isAxiosError(err)) {
        err as AxiosError
        status = err.response?.status ?? null
      }

      switch (status) {
        default:
          dispatch(setAlert({ type: 'error', message: 'Erro desconhecido!' }))
          break
      }

      dispatch(
        reduxAttachmentsCreateAttachmentAction({
          success: null,
          failure: { status }
        })
      )
    }
  }
}

const reduxAttachmentsUpdateAttachmentAction: ActionCreator<
  AttachmentActionTypes
> = (payload: ReduxAttachmentsUpdateAttachmentReducerPayload) => {
  return { type: REDUX_ATTACHMENTS_UPDATE_ATTACHMENT, payload }
}
type reduxAttachmentsUpdateAttachmentFunctionType = ReturnType<
  typeof AttachmentActionTypes | typeof AlertActionTypes
>
export function reduxAttachmentsUpdateAttachmentFunction(
  parameters: ReduxAttachmentsUpdateAttachmentServiceParameters
) {
  return async (
    dispatch: Dispatch<reduxAttachmentsUpdateAttachmentFunctionType>
  ) => {
    try {
      const { data } = await attachmentsService.updateAttachment(parameters)
      const attachmentId = data?.success?.attachment_id

      dispatch(
        reduxAttachmentsUpdateAttachmentAction({
          success: { attachmentId },
          failure: null
        })
      )
      dispatch(setAlert({ type: 'success', message: 'Atualizado!' }))
    } catch (err) {
      console.log(err)
      let status: number | null = null

      if (axios.isAxiosError(err)) {
        err as AxiosError
        status = err.response?.status ?? null
      }

      switch (status) {
        default:
          dispatch(setAlert({ type: 'error', message: 'Erro desconhecido!' }))
          break
      }

      dispatch(
        reduxAttachmentsUpdateAttachmentAction({
          success: null,
          failure: { status }
        })
      )
    }
  }
}

const reduxAttachmentsDeleteAttachmentListAction: ActionCreator<
  AttachmentActionTypes
> = (payload: ReduxAttachmentsDeleteAttachmentListReducerPayload) => {
  return { type: REDUX_ATTACHMENTS_DELETE_ATTACHMENT_LIST, payload }
}
type reduxAttachmentsDeleteAttachmentListFunctionType = ReturnType<
  typeof AttachmentActionTypes | typeof AlertActionTypes
>
export function reduxAttachmentsDeleteAttachmentListFunction({
  attachmentsId
}: ReduxAttachmentsDeleteAttachmentListServiceParameters) {
  return async (
    dispatch: Dispatch<reduxAttachmentsDeleteAttachmentListFunctionType>
  ) => {
    try {
      const { data } = await attachmentsService.deleteAttachmentList({
        attachmentsId
      })
      const deleted = data?.success?.deleted

      dispatch(
        reduxAttachmentsDeleteAttachmentListAction({
          success: { deleted, attachmentsId },
          failure: null
        })
      )
      const alertMessage =
        attachmentsId.length > 1 ? 'Mídias removidas!' : 'Mídia removida!'
      dispatch(setAlert({ type: 'success', message: alertMessage }))
    } catch (err) {
      console.log(err)
      let status: number | null = null

      if (axios.isAxiosError(err)) {
        err as AxiosError
        status = err.response?.status ?? null
      }

      switch (status) {
        default:
          dispatch(setAlert({ type: 'error', message: 'Erro desconhecido!' }))
          break
      }

      dispatch(
        reduxAttachmentsDeleteAttachmentListAction({
          success: null,
          failure: { status }
        })
      )
    }
  }
}

export function reduxAttachmentsClearStateFunction(reducer: string) {
  return async (dispatch: Dispatch<AttachmentActionTypes>) => {
    dispatch({ type: REDUX_ATTACHMENTS_CLEAR_STATE, payload: reducer })
  }
}
