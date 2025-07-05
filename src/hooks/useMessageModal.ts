import { useReducer } from 'react'
import {
  createInitialState,
  reducer,
  type MessageModalState,
} from '../reducers/messageModalReducer'

export function useMessageModal(initialState?: Partial<MessageModalState>) {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    createInitialState
  )

  const updateModal = (payload: Partial<MessageModalState>) => {
    dispatch({ type: 'UPDATE_MODAL', payload })
  }

  const openModal = (payload: Partial<Omit<MessageModalState, 'open'>>) => {
    updateModal({ ...payload, open: true })
  }

  const closeModal = () => {
    dispatch({ type: 'UPDATE_MODAL', payload: { open: false } })
  }

  return {
    modal: state,
    updateModal,
    openModal,
    closeModal,
  }
}
