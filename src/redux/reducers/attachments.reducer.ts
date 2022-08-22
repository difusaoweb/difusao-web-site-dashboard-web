import {
  AttachmentState,
  AttachmentActionTypes,
  REDUX_ATTACHMENTS_GET_ATTACHMENT_LIST,
  REDUX_ATTACHMENTS_GET_ATTACHMENT,
  REDUX_ATTACHMENTS_CREATE_ATTACHMENT,
  REDUX_ATTACHMENTS_UPDATE_ATTACHMENT,
  REDUX_ATTACHMENTS_DELETE_ATTACHMENT_LIST,
  REDUX_ATTACHMENTS_CLEAR_STATE
} from '../types'

const initialState: AttachmentState = {
  getAttachmentListAttachments: null,
  getAttachmentListLastPage: null,
  getAttachmentListError: null,
  getAttachmentAttachment: null,
  getAttachmentError: null,
  createAttachmentAttachmentId: null,
  createAttachmentError: null,
  updateAttachmentUpdated: null,
  updateAttachmentError: null,
  deleteAttachmentListDeleted: null,
  deleteAttachmentListError: null
}

export function attachmentsReducer(
  state: AttachmentState = initialState,
  action: AttachmentActionTypes
): AttachmentState {
  switch (action.type) {
    case REDUX_ATTACHMENTS_GET_ATTACHMENT_LIST: {
      let getAttachmentListAttachments = state.getAttachmentListAttachments
      if (action.payload.success) {
        const { attachments } = action.payload.success
        if (getAttachmentListAttachments) {
          getAttachmentListAttachments = [
            ...getAttachmentListAttachments,
            ...attachments
          ]
        } else {
          getAttachmentListAttachments = attachments
        }
      }
      return {
        ...state,
        getAttachmentListAttachments,
        getAttachmentListLastPage: action.payload.success?.lastPage ?? null,
        getAttachmentListError: action.payload.failure,
        deleteAttachmentListDeleted: null,
        deleteAttachmentListError: null
      }
    }
    case REDUX_ATTACHMENTS_GET_ATTACHMENT: {
      return {
        ...state,
        getAttachmentAttachment: action.payload.success?.attachment ?? null,
        getAttachmentError: action.payload.failure
      }
    }
    case REDUX_ATTACHMENTS_CREATE_ATTACHMENT: {
      return {
        ...state,
        createAttachmentAttachmentId:
          action.payload.success?.attachmentId ?? null,
        createAttachmentError: action.payload.failure
      }
    }
    case REDUX_ATTACHMENTS_UPDATE_ATTACHMENT: {
      return {
        ...state,
        updateAttachmentUpdated: action.payload.success?.updated ?? null,
        updateAttachmentError: action.payload.failure
      }
    }
    case REDUX_ATTACHMENTS_DELETE_ATTACHMENT_LIST: {
      if (action.payload.success) {
        let getAttachmentListAttachments = state.getAttachmentListAttachments
        if (!getAttachmentListAttachments) return state

        const { attachmentsId } = action.payload.success
        getAttachmentListAttachments = getAttachmentListAttachments.filter(
          attachment =>
            attachmentsId.filter(id => id === attachment.id).length < 1
        )
        return {
          ...state,
          getAttachmentListAttachments,
          deleteAttachmentListDeleted: action.payload.success.deleted ?? null,
          deleteAttachmentListError: null
        }
      } else {
        return {
          ...state,
          deleteAttachmentListDeleted: null,
          deleteAttachmentListError: action.payload.failure
        }
      }
    }
    case REDUX_ATTACHMENTS_CLEAR_STATE: {
      switch (action.payload) {
        case 'REDUX_ATTACHMENTS_GET_ATTACHMENT_LIST':
          return {
            ...state,
            getAttachmentListAttachments: null,
            getAttachmentListLastPage: null,
            getAttachmentListError: null
          }
        case 'REDUX_ATTACHMENTS_GET_ATTACHMENT':
          return {
            ...state,
            getAttachmentAttachment: null,
            getAttachmentError: null
          }
        case 'REDUX_ATTACHMENTS_CREATE_ATTACHMENT':
          return {
            ...state,
            createAttachmentAttachmentId: null,
            createAttachmentError: null
          }
        case 'REDUX_ATTACHMENTS_UPDATE_ATTACHMENT':
          return {
            ...state,
            updateAttachmentUpdated: null,
            updateAttachmentError: null
          }
        case 'REDUX_ATTACHMENTS_DELETE_ATTACHMENT_LIST':
          return {
            ...state,
            deleteAttachmentListDeleted: null,
            deleteAttachmentListError: null
          }
        default:
          return {
            ...state
          }
      }
    }
    default:
      return state
  }
}
