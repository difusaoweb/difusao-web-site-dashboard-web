import axios, { AxiosError } from 'axios'
import { ActionCreator, Dispatch } from 'redux'

import {
  AttachmentActionTypes,
  ReduxAttachmentsGetAttachmentListReducerPayload,
  REDUX_ATTACHMENTS_GET_ATTACHMENT_LIST,
  ReduxAttachmentsGetAttachmentListServiceParameters,
  ReduxAttachmentsGetAttachmentListFunctionDispatch,
  ReduxAttachmentsGetAttachmentReducerPayload,
  REDUX_ATTACHMENTS_GET_ATTACHMENT,
  ReduxAttachmentsGetAttachmentServiceParameters,
  ReduxAttachmentsGetAttachmentFunctionDispatch,
  ReduxAttachmentsCreateAttachmentReducerPayload,
  REDUX_ATTACHMENTS_CREATE_ATTACHMENT,
  ReduxAttachmentsCreateAttachmentServiceParameters,
  ReduxAttachmentsCreateAttachmentFunctionDispatch,
  ReduxAttachmentsUpdateAttachmentReducerPayload,
  ReduxAttachmentsUpdateAttachmentServiceParameters,
  ReduxAttachmentsUpdateAttachmentFunctionDispatch,
  REDUX_ATTACHMENTS_UPDATE_ATTACHMENT,
  ReduxAttachmentsDeleteAttachmentListReducerPayload,
  REDUX_ATTACHMENTS_DELETE_ATTACHMENT_LIST,
  ReduxAttachmentsDeleteAttachmentListServiceParameters,
  ReduxAttachmentsDeleteAttachmentListFunctionDispatch,
  REDUX_ATTACHMENTS_CLEAR_STATE
} from '../types'
import { attachmentsService } from '../../services'
import { reduxAlertsSetAlertFunction } from './alerts.actions'

const reduxAttachmentsGetAttachmentListAction: ActionCreator<
  AttachmentActionTypes
> = (payload: ReduxAttachmentsGetAttachmentListReducerPayload) => {
  return { type: REDUX_ATTACHMENTS_GET_ATTACHMENT_LIST, payload }
}
export function reduxAttachmentsGetAttachmentListFunction({
  page,
  perPage
}: ReduxAttachmentsGetAttachmentListServiceParameters) {
  return async (
    dispatch: Dispatch<ReduxAttachmentsGetAttachmentListFunctionDispatch>
  ) => {
    try {
      const { data } = await attachmentsService.getAttachmentList({
        page,
        perPage
      })
      const attachments = data?.success?.attachments
      const lastPage = data?.success?.last_page
      const total = data?.success?.total

      dispatch(
        reduxAttachmentsGetAttachmentListAction({
          success: { attachments, lastPage, currentPage: page, total },
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
          dispatch(
            reduxAlertsSetAlertFunction({
              type: 'error',
              message: 'Erro desconhecido!'
            })
          )
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
export function reduxAttachmentsGetAttachmentFunction(
  parameters: ReduxAttachmentsGetAttachmentServiceParameters
) {
  return async (
    dispatch: Dispatch<ReduxAttachmentsGetAttachmentFunctionDispatch>
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
          dispatch(
            reduxAlertsSetAlertFunction({
              type: 'error',
              message: 'Erro desconhecido!'
            })
          )
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
export function reduxAttachmentsCreateAttachmentFunction(
  parameters: ReduxAttachmentsCreateAttachmentServiceParameters
) {
  return async (
    dispatch: Dispatch<ReduxAttachmentsCreateAttachmentFunctionDispatch>
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
          dispatch(
            reduxAlertsSetAlertFunction({
              type: 'error',
              message: 'Erro desconhecido!'
            })
          )
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
export function reduxAttachmentsUpdateAttachmentFunction(
  parameters: ReduxAttachmentsUpdateAttachmentServiceParameters
) {
  return async (
    dispatch: Dispatch<ReduxAttachmentsUpdateAttachmentFunctionDispatch>
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
      dispatch(
        reduxAlertsSetAlertFunction({ type: 'success', message: 'Atualizado!' })
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
          dispatch(
            reduxAlertsSetAlertFunction({
              type: 'error',
              message: 'Erro desconhecido!'
            })
          )
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
export function reduxAttachmentsDeleteAttachmentListFunction({
  attachmentsId
}: ReduxAttachmentsDeleteAttachmentListServiceParameters) {
  return async (
    dispatch: Dispatch<ReduxAttachmentsDeleteAttachmentListFunctionDispatch>
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
      dispatch(
        reduxAlertsSetAlertFunction({ type: 'success', message: alertMessage })
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
          dispatch(
            reduxAlertsSetAlertFunction({
              type: 'error',
              message: 'Erro desconhecido!'
            })
          )
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
