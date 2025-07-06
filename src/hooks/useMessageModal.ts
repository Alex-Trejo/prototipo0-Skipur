import { useState } from 'react'
import { useModal, type ModalState } from './useModal'

export type MessageModalType = 'info' | 'error' | 'warn'

export interface MessageModalData {
  title: string
  message: string
  type: MessageModalType
}

export type MessageModalState = ModalState & MessageModalData

export function useMessageModal(initialState?: Partial<MessageModalState>) {
  const {
    open,
    openModal: show,
    closeModal,
    toggleModal,
  } = useModal({
    open: initialState?.open ?? false,
  })

  const [data, setData] = useState<MessageModalData>({
    message: initialState?.message ?? '',
    title: initialState?.title ?? '',
    type: initialState?.type ?? 'info',
  })

  const updateData = (payload: Partial<MessageModalData>) => {
    setData((data) => ({ ...data, ...payload }))
  }

  const openModal = (payload: Partial<MessageModalData>) => {
    updateData({ ...payload })
    show()
  }

  return {
    modal: {
      open,
      ...data,
    },
    updateData,
    openModal,
    closeModal,
    toggleModal,
  }
}
